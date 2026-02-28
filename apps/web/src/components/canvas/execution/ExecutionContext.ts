import { createContext, useContext } from 'react';
import type { NodeExecutionState } from './types';
import { createDefaultExecutionState } from './types';

export interface ExecutionContextValue {
  getNodeState: (nodeId: string) => NodeExecutionState;
}

const defaultValue: ExecutionContextValue = {
  getNodeState: () => createDefaultExecutionState(),
};

export const ExecutionContext = createContext<ExecutionContextValue>(defaultValue);

export function useExecutionContext() {
  return useContext(ExecutionContext);
}
