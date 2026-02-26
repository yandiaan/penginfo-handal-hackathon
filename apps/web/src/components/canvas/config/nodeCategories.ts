import type { NodeCategory, CustomNodeType } from '../types/node-types';

export interface NodeCategoryConfig {
  id: NodeCategory;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface NodeTypeConfig {
  type: CustomNodeType;
  category: NodeCategory;
  label: string;
  icon: string;
  description: string;
}

// Category definitions with colors
export const NODE_CATEGORIES: Record<NodeCategory, NodeCategoryConfig> = {
  input: {
    id: 'input',
    label: 'Input',
    icon: '📥',
    color: '#4ade80',
    bgColor: 'rgba(74, 222, 128, 0.1)',
    borderColor: 'rgba(74, 222, 128, 0.5)',
  },
  generator: {
    id: 'generator',
    label: 'Generator',
    icon: '🤖',
    color: '#a78bfa',
    bgColor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.5)',
  },
  modifier: {
    id: 'modifier',
    label: 'Modifier',
    icon: '🎨',
    color: '#60a5fa',
    bgColor: 'rgba(96, 165, 250, 0.1)',
    borderColor: 'rgba(96, 165, 250, 0.5)',
  },
  character: {
    id: 'character',
    label: 'Character',
    icon: '👤',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.5)',
  },
  variant: {
    id: 'variant',
    label: 'Variant',
    icon: '🔀',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    borderColor: 'rgba(236, 72, 153, 0.5)',
  },
  output: {
    id: 'output',
    label: 'Output',
    icon: '📤',
    color: '#f87171',
    bgColor: 'rgba(248, 113, 113, 0.1)',
    borderColor: 'rgba(248, 113, 113, 0.5)',
  },
};

// All available node types
export const NODE_TYPE_CONFIGS: NodeTypeConfig[] = [
  // Input nodes
  {
    type: 'trendSeed',
    category: 'input',
    label: 'Trend Seed',
    icon: '🔥',
    description: 'Enter trending topics and themes',
  },
  {
    type: 'textInput',
    category: 'input',
    label: 'Text Input',
    icon: '📝',
    description: 'Free text input',
  },
  // Generator nodes
  {
    type: 'aiTextGenerator',
    category: 'generator',
    label: 'AI Text Generator',
    icon: '✨',
    description: 'Generate text with AI (punchlines, captions)',
  },
  // Modifier nodes
  {
    type: 'humorStyle',
    category: 'modifier',
    label: 'Humor Style',
    icon: '😂',
    description: 'Apply humor style (receh, satir, relatable)',
  },
  // Variant nodes
  {
    type: 'variantBatch',
    category: 'variant',
    label: 'Variant Batch',
    icon: '🎲',
    description: 'Generate multiple variations',
  },
  // Output nodes
  {
    type: 'canvasRender',
    category: 'output',
    label: 'Canvas Render',
    icon: '🖼️',
    description: 'Preview and compose final output',
  },
  {
    type: 'export',
    category: 'output',
    label: 'Export',
    icon: '💾',
    description: 'Export and share your creation',
  },
];

// Group node types by category
export const NODE_TYPES_BY_CATEGORY = NODE_TYPE_CONFIGS.reduce(
  (acc, config) => {
    if (!acc[config.category]) {
      acc[config.category] = [];
    }
    acc[config.category].push(config);
    return acc;
  },
  {} as Record<NodeCategory, NodeTypeConfig[]>,
);

// Get category config for a node type
export function getCategoryForNodeType(nodeType: CustomNodeType): NodeCategoryConfig {
  const config = NODE_TYPE_CONFIGS.find((c) => c.type === nodeType);
  if (!config) {
    return NODE_CATEGORIES.input; // fallback
  }
  return NODE_CATEGORIES[config.category];
}
