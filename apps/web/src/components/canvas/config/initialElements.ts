import type { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 50 },
  },
  {
    id: '2',
    data: { label: 'Process A' },
    position: { x: 100, y: 200 },
  },
  {
    id: '3',
    data: { label: 'Process B' },
    position: { x: 400, y: 200 },
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'End' },
    position: { x: 250, y: 350 },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
];
