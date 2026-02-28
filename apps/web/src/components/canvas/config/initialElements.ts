import type { Node, Edge } from '@xyflow/react';
import { defaultConfigs } from '../types/node-types';

// Blank canvas — minimal starting point
export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'textPrompt',
    data: {
      label: 'Text Prompt',
      config: {
        ...defaultConfigs.textPrompt,
      },
    },
    position: { x: 50, y: 200 },
  },
  {
    id: '2',
    type: 'promptEnhancer',
    data: {
      label: 'Prompt Enhancer',
      config: {
        ...defaultConfigs.promptEnhancer,
      },
    },
    position: { x: 350, y: 200 },
  },
  {
    id: '3',
    type: 'imageGenerator',
    data: {
      label: 'Image Generator',
      config: {
        ...defaultConfigs.imageGenerator,
      },
    },
    position: { x: 650, y: 200 },
  },
  {
    id: '4',
    type: 'preview',
    data: {
      label: 'Preview',
      config: {
        ...defaultConfigs.preview,
      },
    },
    position: { x: 950, y: 200 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: 'text',
    targetHandle: 'text',
    animated: true,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: 'prompt',
    targetHandle: 'prompt',
    animated: true,
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    sourceHandle: 'image',
    targetHandle: 'media',
    animated: true,
  },
];
