// Node components exports and registry
import type { ComponentType } from 'react';
import type { NodeProps } from '@xyflow/react';

// Import all node components
import { TextPromptNode } from './input/TextPromptNode';
import { ImageUploadNode } from './input/ImageUploadNode';
import { TemplatePresetNode } from './input/TemplatePresetNode';
import { PromptEnhancerNode } from './transform/PromptEnhancerNode';
import { StyleConfigNode } from './transform/StyleConfigNode';
import { ImageGeneratorNode } from './generate/ImageGeneratorNode';
import { VideoGeneratorNode } from './generate/VideoGeneratorNode';
import { TextOverlayNode } from './compose/TextOverlayNode';
import { PreviewNode } from './output/PreviewNode';
import { ExportNode } from './output/ExportNodeNew';

import type { CustomNodeType } from '../types/node-types';

// Re-export components
export { TextPromptNode } from './input/TextPromptNode';
export { ImageUploadNode } from './input/ImageUploadNode';
export { TemplatePresetNode } from './input/TemplatePresetNode';
export { PromptEnhancerNode } from './transform/PromptEnhancerNode';
export { StyleConfigNode } from './transform/StyleConfigNode';
export { ImageGeneratorNode } from './generate/ImageGeneratorNode';
export { VideoGeneratorNode } from './generate/VideoGeneratorNode';
export { TextOverlayNode } from './compose/TextOverlayNode';
export { PreviewNode } from './output/PreviewNode';
export { ExportNode } from './output/ExportNodeNew';
export { CompactNode } from './CompactNode';

// Node types registry for ReactFlow

export const nodeTypes: Record<CustomNodeType, ComponentType<NodeProps<any>>> = {
  textPrompt: TextPromptNode,
  imageUpload: ImageUploadNode,
  templatePreset: TemplatePresetNode,
  promptEnhancer: PromptEnhancerNode,
  styleConfig: StyleConfigNode,
  imageGenerator: ImageGeneratorNode,
  videoGenerator: VideoGeneratorNode,
  textOverlay: TextOverlayNode,
  preview: PreviewNode,
  export: ExportNode,
};

// Type guard for custom node types
export function isCustomNodeType(type: string): type is CustomNodeType {
  return type in nodeTypes;
}
