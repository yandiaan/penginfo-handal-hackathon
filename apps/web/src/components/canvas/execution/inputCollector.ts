import type { Edge } from '@xyflow/react';
import type { NodeOutput } from '../types/port-types';

/**
 * Collect inputs for a node by reading output data from all upstream connected nodes.
 * Uses an outputMap (populated during pipeline execution) to avoid stale React state.
 */
export function collectNodeInputs(
  nodeId: string,
  edges: Edge[],
  outputMap: Map<string, NodeOutput>,
): Record<string, NodeOutput> {
  const inputs: Record<string, NodeOutput> = {};

  // Find all edges that connect TO this node
  const incomingEdges = edges.filter((e) => e.target === nodeId);

  for (const edge of incomingEdges) {
    const sourceOutput = outputMap.get(edge.source);
    if (sourceOutput && edge.targetHandle) {
      inputs[edge.targetHandle] = sourceOutput;
    }
  }

  return inputs;
}
