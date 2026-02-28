import type { NodeOutput } from '../types/port-types';

// Execution status for a single node
export type NodeExecutionStatus = 'idle' | 'ready' | 'running' | 'done' | 'error' | 'stale';

export interface NodeExecutionState {
  status: NodeExecutionStatus;
  output: NodeOutput | null;
  error: string | null;
  progress: number; // 0-100
  lastRunAt: number | null;
}

// Full execution store state
export interface ExecutionStoreState {
  nodeStates: Record<string, NodeExecutionState>;
  pipelineRunning: boolean;
  currentRunId: string | null;
}

// Pipeline run result
export interface PipelineRunResult {
  runId: string;
  success: boolean;
  nodeResults: Record<string, NodeExecutionState>;
  duration: number;
  error?: string;
}

// API response from server node execution
export interface NodeRunResponse {
  output: NodeOutput;
  duration_ms: number;
}

// Default state for a node
export function createDefaultExecutionState(): NodeExecutionState {
  return {
    status: 'idle',
    output: null,
    error: null,
    progress: 0,
    lastRunAt: null,
  };
}
