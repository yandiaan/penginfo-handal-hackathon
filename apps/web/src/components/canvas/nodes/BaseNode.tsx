import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { ReactNode } from 'react';
import { getCategoryForNodeType, type NodeCategoryConfig } from '../config/nodeCategories';
import { createNodeStyles } from '../styles/nodes';
import type { BaseNodeData, CustomNodeType } from '../types/node-types';

export interface BaseNodeProps<T extends BaseNodeData> {
  id: string;
  data: T;
  nodeType: CustomNodeType;
  icon: string;
  title: string;
  children: ReactNode;
  inputs?: number;
  outputs?: number;
}

export function BaseNode<T extends BaseNodeData>({
  id,
  data,
  nodeType,
  icon,
  title,
  children,
  inputs = 1,
  outputs = 1,
}: BaseNodeProps<T>) {
  const { updateNodeData } = useReactFlow();
  const category = getCategoryForNodeType(nodeType);
  const styles = createNodeStyles(category);

  const toggleExpanded = () => {
    updateNodeData(id, { isExpanded: !data.isExpanded });
  };

  return (
    <div style={styles.container}>
      {/* Input handles */}
      {inputs > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#1e1e2e',
            border: `2px solid ${category.color}`,
          }}
        />
      )}

      {/* Header */}
      <div style={styles.header} onClick={toggleExpanded}>
        <div style={styles.headerLeft}>
          <span style={styles.headerIcon}>{icon}</span>
          <span style={styles.headerTitle}>{title}</span>
        </div>
        <span
          style={{
            ...styles.expandIcon,
            transform: data.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </span>
      </div>

      {/* Content */}
      {data.isExpanded ? (
        <div style={styles.content}>{children}</div>
      ) : (
        <div style={styles.collapsedContent}>Click to expand configuration</div>
      )}

      {/* Output handles */}
      {outputs > 0 && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#1e1e2e',
            border: `2px solid ${category.color}`,
          }}
        />
      )}
    </div>
  );
}

// Helper hook for updating node config
export function useNodeConfig<T extends BaseNodeData>(
  id: string,
  data: T,
): {
  config: T['config'];
  updateConfig: (updates: Partial<T['config']>) => void;
  category: NodeCategoryConfig;
} {
  const { updateNodeData } = useReactFlow();

  const updateConfig = (updates: Partial<T['config']>) => {
    updateNodeData(id, {
      config: { ...data.config, ...updates },
    });
  };

  const nodeType = (data as BaseNodeData & { nodeType?: CustomNodeType }).nodeType || 'textInput';
  const category = getCategoryForNodeType(nodeType);

  return {
    config: data.config,
    updateConfig,
    category,
  };
}
