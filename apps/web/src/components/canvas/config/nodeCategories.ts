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
  transform: {
    id: 'transform',
    label: 'Transform',
    icon: '🔄',
    color: '#a78bfa',
    bgColor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.5)',
  },
  generate: {
    id: 'generate',
    label: 'Generate',
    icon: '🤖',
    color: '#60a5fa',
    bgColor: 'rgba(96, 165, 250, 0.1)',
    borderColor: 'rgba(96, 165, 250, 0.5)',
  },
  compose: {
    id: 'compose',
    label: 'Compose',
    icon: '🎨',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.5)',
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
    type: 'textPrompt',
    category: 'input',
    label: 'Text Prompt',
    icon: '📝',
    description: 'Enter text or prompts for content generation',
  },
  {
    type: 'imageUpload',
    category: 'input',
    label: 'Image Upload',
    icon: '🖼️',
    description: 'Upload a reference image',
  },
  {
    type: 'templatePreset',
    category: 'input',
    label: 'Template Preset',
    icon: '📋',
    description: 'Start from a pre-built template',
  },
  // Transform nodes
  {
    type: 'promptEnhancer',
    category: 'transform',
    label: 'Prompt Enhancer',
    icon: '✨',
    description: 'Enhance prompts with AI (Qwen)',
  },
  {
    type: 'styleConfig',
    category: 'transform',
    label: 'Style Config',
    icon: '🎭',
    description: 'Configure art style, mood, and cultural theme',
  },
  // Generate nodes
  {
    type: 'imageGenerator',
    category: 'generate',
    label: 'Image Generator',
    icon: '🖌️',
    description: 'Generate images with AI (Wan)',
  },
  {
    type: 'videoGenerator',
    category: 'generate',
    label: 'Video Generator',
    icon: '🎬',
    description: 'Generate short videos with AI (Wan)',
  },
  // Compose nodes
  {
    type: 'textOverlay',
    category: 'compose',
    label: 'Text Overlay',
    icon: '🔤',
    description: 'Add styled text on top of images',
  },
  // Output nodes
  {
    type: 'preview',
    category: 'output',
    label: 'Preview',
    icon: '👁️',
    description: 'Preview output in social media dimensions',
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
