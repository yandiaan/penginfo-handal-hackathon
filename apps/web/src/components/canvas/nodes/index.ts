// Node components exports and registry
import type { ComponentType } from 'react';
import type { NodeProps } from '@xyflow/react';

// Import all node components
import { TrendSeedNode } from './input/TrendSeedNode';
import { TextInputNode } from './input/TextInputNode';
import { AITextGeneratorNode } from './generator/AITextGeneratorNode';
import { HumorStyleNode } from './modifier/HumorStyleNode';
import { VariantBatchNode } from './variant/VariantBatchNode';
import { CanvasRenderNode } from './output/CanvasRenderNode';
import { ExportNode } from './output/ExportNode';

import type { CustomNodeType } from '../types/node-types';

// Re-export components
export { TrendSeedNode } from './input/TrendSeedNode';
export { TextInputNode } from './input/TextInputNode';
export { AITextGeneratorNode } from './generator/AITextGeneratorNode';
export { HumorStyleNode } from './modifier/HumorStyleNode';
export { VariantBatchNode } from './variant/VariantBatchNode';
export { CanvasRenderNode } from './output/CanvasRenderNode';
export { ExportNode } from './output/ExportNode';
export { CompactNode } from './CompactNode';

// Node types registry for ReactFlow

export const nodeTypes: Record<CustomNodeType, ComponentType<NodeProps<any>>> = {
  trendSeed: TrendSeedNode,
  textInput: TextInputNode,
  aiTextGenerator: AITextGeneratorNode,
  humorStyle: HumorStyleNode,
  variantBatch: VariantBatchNode,
  canvasRender: CanvasRenderNode,
  export: ExportNode,
};

// Type guard for custom node types
export function isCustomNodeType(type: string): type is CustomNodeType {
  return type in nodeTypes;
}
