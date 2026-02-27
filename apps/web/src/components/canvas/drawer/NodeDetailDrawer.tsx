import { useReactFlow, type Node } from '@xyflow/react';
import { drawerStyles } from '../styles/drawer';
import { NODE_TYPE_CONFIGS, NODE_CATEGORIES } from '../config/nodeCategories';
import type { CustomNodeType, CustomNodeData } from '../types/node-types';

// Panel imports
import { TrendSeedPanel } from './panels/TrendSeedPanel';
import { TextInputPanel } from './panels/TextInputPanel';
import { AITextGeneratorPanel } from './panels/AITextGeneratorPanel';
import { HumorStylePanel } from './panels/HumorStylePanel';
import { VariantBatchPanel } from './panels/VariantBatchPanel';
import { CanvasRenderPanel } from './panels/CanvasRenderPanel';
import { ExportPanel } from './panels/ExportPanel';

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
      case 'trendSeed':
        return <TrendSeedPanel nodeId={selectedNode.id} data={selectedNode.data} />;
      case 'textInput':
        return <TextInputPanel nodeId={selectedNode.id} data={selectedNode.data} />;
      case 'aiTextGenerator':
        return <AITextGeneratorPanel nodeId={selectedNode.id} data={selectedNode.data} />;
      case 'humorStyle':
        return <HumorStylePanel nodeId={selectedNode.id} data={selectedNode.data} />;
      case 'variantBatch':
        return <VariantBatchPanel nodeId={selectedNode.id} data={selectedNode.data} />;
      case 'canvasRender':
        return <CanvasRenderPanel nodeId={selectedNode.id} data={selectedNode.data} />;
      case 'export':
        return <ExportPanel nodeId={selectedNode.id} data={selectedNode.data} />;
      default:
        return <div style={{ color: 'rgba(255,255,255,0.5)' }}>Unknown node type</div>;
    }
  };

  return (
    <div style={drawerStyles.overlay}>
      {/* Header */}
      <div
        style={{
          ...drawerStyles.header,
          borderBottom: `1px solid ${category?.borderColor || 'rgba(255,255,255,0.1)'}`,
        }}
      >
        <div style={drawerStyles.headerLeft}>
          <span style={drawerStyles.headerIcon}>{nodeConfig?.icon}</span>
          <div>
            <div style={{ ...drawerStyles.headerTitle, color: category?.color }}>
              {nodeConfig?.label || 'Node'}
            </div>
            <div style={drawerStyles.headerSubtitle}>{nodeConfig?.description}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={drawerStyles.closeButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div style={drawerStyles.content}>{renderPanel()}</div>

      {/* Footer */}
      <div style={drawerStyles.footer}>
        <button
          onClick={handleDelete}
          style={drawerStyles.deleteButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(248, 113, 113, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(248, 113, 113, 0.1)';
          }}
        >
          🗑️ Delete Node
        </button>
      </div>
    </div>
  );
}
