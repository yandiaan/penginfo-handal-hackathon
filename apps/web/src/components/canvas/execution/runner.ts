import type { Node, Edge } from '@xyflow/react';
import type { ExecutionStore } from './store';
import type { CustomNodeType } from '../types/node-types';
import { RUNNABLE_NODE_TYPES } from '../types/node-types';
import { topologySort } from './topology';
import { collectNodeInputs } from './inputCollector';
import type { PipelineRunResult, NodeRunResponse } from './types';

const API_BASE = '/api/node';

/**
 * Execute the full pipeline in topological order.
 */
export async function runPipeline(
  nodes: Node[],
  edges: Edge[],
  store: ExecutionStore,
): Promise<PipelineRunResult> {
  const runId = `run-${Date.now()}`;
  const startTime = Date.now();
  store.setPipelineRunning(true, runId);

  try {
    const order = topologySort(nodes, edges);

    for (const nodeId of order) {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) continue;

      const nodeType = node.type as CustomNodeType;

      if (RUNNABLE_NODE_TYPES.includes(nodeType)) {
        // Server-executed node
        store.setNodeState(nodeId, { status: 'running', progress: 0, error: null });

        try {
          const inputs = collectNodeInputs(nodeId, edges, store);
          const response = await executeNodeOnServer(nodeType, node.data, inputs);
          store.setNodeState(nodeId, {
            status: 'done',
            output: response.output,
            progress: 100,
            lastRunAt: Date.now(),
          });
        } catch (err) {
          store.setNodeState(nodeId, {
            status: 'error',
            error: err instanceof Error ? err.message : 'Unknown error',
            progress: 0,
          });
          // Stop pipeline on error
          break;
        }
      } else {
        // Client-side node — pass through or compute locally
        const inputs = collectNodeInputs(nodeId, edges, store);
        const firstInput = Object.values(inputs)[0] ?? null;
        store.setNodeState(nodeId, {
          status: 'done',
          output: firstInput,
          progress: 100,
          lastRunAt: Date.now(),
        });
      }
    }

    store.setPipelineRunning(false);
    return {
      runId,
      success: true,
      nodeResults: store.nodeStates,
      duration: Date.now() - startTime,
    };
  } catch (err) {
    store.setPipelineRunning(false);
    return {
      runId,
      success: false,
      nodeResults: store.nodeStates,
      duration: Date.now() - startTime,
      error: err instanceof Error ? err.message : 'Pipeline failed',
    };
  }
}

/**
 * Execute a single node on the server.
 */
export async function runNode(
  nodeId: string,
  nodes: Node[],
  edges: Edge[],
  store: ExecutionStore,
): Promise<void> {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) throw new Error(`Node ${nodeId} not found`);

  const nodeType = node.type as CustomNodeType;
  if (!RUNNABLE_NODE_TYPES.includes(nodeType)) {
    throw new Error(`Node type ${nodeType} is not runnable`);
  }

  store.setNodeState(nodeId, { status: 'running', progress: 0, error: null });

  try {
    const inputs = collectNodeInputs(nodeId, edges, store);
    const response = await executeNodeOnServer(nodeType, node.data, inputs);
    store.setNodeState(nodeId, {
      status: 'done',
      output: response.output,
      progress: 100,
      lastRunAt: Date.now(),
    });

    // Mark downstream as stale
    store.markDownstreamStale(nodeId, edges);
  } catch (err) {
    store.setNodeState(nodeId, {
      status: 'error',
      error: err instanceof Error ? err.message : 'Unknown error',
      progress: 0,
    });
  }
}

/**
 * Call the server API for a runnable node.
 */
async function executeNodeOnServer(
  nodeType: CustomNodeType,
  nodeData: Record<string, unknown>,
  inputs: Record<string, unknown>,
): Promise<NodeRunResponse> {
  const endpointMap: Partial<Record<CustomNodeType, string>> = {
    promptEnhancer: 'prompt-enhancer',
    imageGenerator: 'image-generator',
    videoGenerator: 'video-generator',
  };

  const endpoint = endpointMap[nodeType];
  if (!endpoint) throw new Error(`No API endpoint for ${nodeType}`);

  const response = await fetch(`${API_BASE}/${endpoint}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ config: nodeData.config, inputs }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Server error: ${error}`);
  }

  return response.json();
}
