import type { Node, Edge } from '@xyflow/react';
import { defaultConfigs } from '../types/node-types';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trendSeed',
    data: {
      label: 'Trend Seed',
      isExpanded: true,
      config: {
        ...defaultConfigs.trendSeed,
        topic: 'THR',
        keywords: ['THR', 'Lebaran', 'Bonus'],
      },
    },
    position: { x: 50, y: 100 },
  },
  {
    id: '2',
    type: 'humorStyle',
    data: {
      label: 'Humor Style',
      isExpanded: true,
      config: {
        ...defaultConfigs.humorStyle,
        style: 'receh',
        intensity: 70,
      },
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '3',
    type: 'aiTextGenerator',
    data: {
      label: 'AI Text Generator',
      isExpanded: true,
      config: {
        ...defaultConfigs.aiTextGenerator,
        prompt: 'Generate a funny punchline about {topic} in Indonesian',
        outputCount: 5,
      },
    },
    position: { x: 750, y: 100 },
  },
  {
    id: '4',
    type: 'variantBatch',
    data: {
      label: 'Variant Batch',
      isExpanded: false,
      config: {
        ...defaultConfigs.variantBatch,
        count: 10,
      },
    },
    position: { x: 1100, y: 100 },
  },
  {
    id: '5',
    type: 'export',
    data: {
      label: 'Export',
      isExpanded: false,
      config: defaultConfigs.export,
    },
    position: { x: 1100, y: 400 },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5' },
];
