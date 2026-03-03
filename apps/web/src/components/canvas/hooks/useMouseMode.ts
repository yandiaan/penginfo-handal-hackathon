import { useState } from 'react';
import type { MouseMode } from '../types';

export function useMouseMode(initial: MouseMode = 'select') {
  const [mode, setMode] = useState<MouseMode>(initial);
  return { mode, setMode } as const;
}
