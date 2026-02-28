import { useState, useCallback } from 'react';
import type { ExecutionStoreState, NodeExecutionState } from './types';
import { createDefaultExecutionState } from './types';
import type { NodeOutput } from '../types/port-types';

const initialState: ExecutionStoreState = {
  nodeStates: {},
  pipelineRunning: false,
  currentRunId: null,
};

/**
 * React hook for execution state management.
 * Manages per-node execution states, pipeline running status, and outputs.
 */
export function useExecutionStore() {
  const [state, setState] = useState<ExecutionStoreState>(initialState);

  const getNodeState = useCallback(
    (nodeId: string): NodeExecutionState => {
      return state.nodeStates[nodeId] || createDefaultExecutionState();
    },
    [state.nodeStates],
  );

  const setNodeState = useCallback((nodeId: string, update: Partial<NodeExecutionState>) => {
    setState((prev) => ({
      ...prev,
      nodeStates: {
        ...prev.nodeStates,
        [nodeId]: {
          ...(prev.nodeStates[nodeId] || createDefaultExecutionState()),
          ...update,
        },
      },
    }));
  }, []);

  const getNodeOutput = useCallback(
    (nodeId: string): NodeOutput | null => {
      return state.nodeStates[nodeId]?.output || null;
    },
    [state.nodeStates],
  );

  const setPipelineRunning = useCallback((running: boolean, runId?: string) => {
    setState((prev) => ({
      ...prev,
      pipelineRunning: running,
      currentRunId: runId || null,
    }));
  }, []);

  const resetPipeline = useCallback(() => {
    setState(initialState);
  }, []);

  // Mark all downstream nodes as stale when an upstream node is re-run
  const markDownstreamStale = useCallback(
    (nodeId: string, edges: { source: string; target: string }[]) => {
      const visited = new Set<string>();
      const queue = [nodeId];

      while (queue.length > 0) {
        const current = queue.shift()!;
        for (const edge of edges) {
          if (edge.source === current && !visited.has(edge.target)) {
            visited.add(edge.target);
            queue.push(edge.target);
          }
        }
      }

      setState((prev) => {
        const newStates = { ...prev.nodeStates };
        for (const id of visited) {
          if (newStates[id] && newStates[id].status === 'done') {
            newStates[id] = { ...newStates[id], status: 'stale' };
          }
        }
        return { ...prev, nodeStates: newStates };
      });
    },
    [],
  );

  return {
    ...state,
    getNodeState,
    setNodeState,
    getNodeOutput,
    setPipelineRunning,
    resetPipeline,
    markDownstreamStale,
  };
}

export type ExecutionStore = ReturnType<typeof useExecutionStore>;
