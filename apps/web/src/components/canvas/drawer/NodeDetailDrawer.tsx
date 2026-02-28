import { useReactFlow, type Node } from '@xyflow/react';
import { NODE_TYPE_CONFIGS, NODE_CATEGORIES } from '../config/nodeCategories';
import type { CustomNodeType, CustomNodeData } from '../types/node-types';

// Panel imports
import { TextPromptPanel } from './panels/TextPromptPanel';
import { ImageUploadPanel } from './panels/ImageUploadPanel';
import { TemplatePresetPanel } from './panels/TemplatePresetPanel';
import { PromptEnhancerPanel } from './panels/PromptEnhancerPanel';
import { StyleConfigPanel } from './panels/StyleConfigPanel';
import { ImageGeneratorPanel } from './panels/ImageGeneratorPanel';
import { VideoGeneratorPanel } from './panels/VideoGeneratorPanel';
import { TextOverlayPanel } from './panels/TextOverlayPanel';
import { PreviewPanel } from './panels/PreviewPanel';
import { ExportPanelNew } from './panels/ExportPanelNew';

type Props = {
  selectedNode: Node<CustomNodeData> | null;
  onClose: () => void;
};

export function NodeDetailDrawer({ selectedNode, onClose }: Props) {
  const { deleteElements } = useReactFlow();

  if (!selectedNode) return null;

  const nodeType = selectedNode.type as CustomNodeType;
  const nodeConfig = NODE_TYPE_CONFIGS.find((c) => c.type === nodeType);
  const category = nodeConfig ? NODE_CATEGORIES[nodeConfig.category] : null;

  const handleDelete = () => {
    deleteElements({ nodes: [{ id: selectedNode.id }] });
    onClose();
  };

  const renderPanel = () => {
    switch (nodeType) {
      case 'textPrompt':
        return <TextPromptPanel nodeId={selectedNode.id} data={selectedNode.data as any} />;
      case 'imageUpload':
        return <ImageUploadPanel nodeId={selectedNode.id} data={selectedNode.data as any} />;
      case 'templatePreset':
        return <TemplatePresetPanel nodeId={selectedNode.id} data={selectedNode.data as any} />;
      case 'promptEnhancer':
        return <PromptEnhancerPanel nodeId={selectedNode.id} data={selectedNode.data as any} />;
      case 'styleConfig':
        return <StyleConfigPanel nodeId={selectedNode.id} data={selectedNode.data as any} />;
      case 'imageGenerator':
        return <ImageGeneratorPanel nodeId={selectedNode.id} data={selectedNode.data as any} />;
      case 'videoGenerator':
        return <VideoGeneratorPanel nodeId={selectedNode.id} data={selectedNode.data as any} />;
      case 'textOverlay':
        return <TextOverlayPanel nodeId={selectedNode.id} data={selectedNode.data as any} />;
      case 'preview':
        return <PreviewPanel nodeId={selectedNode.id} data={selectedNode.data as any} />;
      case 'export':
        return <ExportPanelNew nodeId={selectedNode.id} data={selectedNode.data as any} />;
      default:
        return <div className="text-white/50">Unknown node type</div>;
    }
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 w-[380px] bg-[rgba(20,20,30,0.98)] border-l border-white/10 shadow-[-8px_0_32px_rgba(0,0,0,0.5)] z-[1000] flex flex-col font-[Inter,system-ui,sans-serif] transition-transform duration-300">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-5"
        style={{ borderBottom: `1px solid ${category?.borderColor || 'rgba(255,255,255,0.1)'}` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{nodeConfig?.icon}</span>
          <div>
            <div className="text-lg font-semibold" style={{ color: category?.color }}>
              {nodeConfig?.label || 'Node'}
            </div>
            <div className="text-xs text-white/50 mt-0.5">{nodeConfig?.description}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white/60 text-lg cursor-pointer transition-all duration-200 hover:bg-white/10"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">{renderPanel()}</div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10 flex gap-3">
        <button
          onClick={handleDelete}
          className="flex-1 py-3 px-4 bg-red-400/10 border border-red-400/30 rounded-lg text-red-400 text-[13px] font-medium cursor-pointer transition-all duration-200 hover:bg-red-400/20"
        >
          🗑️ Delete Node
        </button>
      </div>
    </div>
  );
}
