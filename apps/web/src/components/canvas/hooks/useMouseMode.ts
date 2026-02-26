import { useState } from 'react';
import type { MouseMode } from '../types';

export function useMouseMode(initial: MouseMode = 'pan') {
  const [mode, setMode] = useState<MouseMode>(initial);
  return { mode, setMode } as const;
}
