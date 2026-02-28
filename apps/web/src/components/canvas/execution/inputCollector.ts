import type { Edge } from '@xyflow/react';
import type { ExecutionStore } from './store';
import type { NodeOutput } from '../types/port-types';

/**
 * Collect inputs for a node by reading output data from all upstream connected nodes.
 * Maps source node outputs to target node input port IDs.
 */
export function collectNodeInputs(
  nodeId: string,
  edges: Edge[],
  store: ExecutionStore,
): Record<string, NodeOutput> {
  const inputs: Record<string, NodeOutput> = {};

  // Find all edges that connect TO this node
  const incomingEdges = edges.filter((e) => e.target === nodeId);

  for (const edge of incomingEdges) {
    const sourceOutput = store.getNodeOutput(edge.source);
    if (sourceOutput && edge.targetHandle) {
      inputs[edge.targetHandle] = sourceOutput;
    }
  }

  return inputs;
}
