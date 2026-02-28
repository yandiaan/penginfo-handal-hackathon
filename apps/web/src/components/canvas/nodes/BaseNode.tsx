import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { ReactNode } from 'react';
import { getCategoryForNodeType, type NodeCategoryConfig } from '../config/nodeCategories';
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

  const toggleExpanded = () => {
    updateNodeData(id, { isExpanded: !data.isExpanded });
  };

  return (
    <div
      className="min-w-[280px] max-w-[320px] bg-[#1e1e2e] rounded-xl overflow-hidden font-[Inter,system-ui,sans-serif]"
      style={{
        border: `2px solid ${category.borderColor}`,
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px ${category.bgColor}`,
      }}
    >
      {/* Input handles */}
      {inputs > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-[#1e1e2e]"
          style={{ border: `2px solid ${category.color}` }}
        />
      )}

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
        style={{
          backgroundColor: category.bgColor,
          borderBottom: `1px solid ${category.borderColor}`,
        }}
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span
            className="text-sm font-semibold tracking-[0.3px]"
            style={{ color: category.color }}
          >
            {title}
          </span>
        </div>
        <span
          className="text-white/50 text-xs transition-transform duration-200"
          style={{ transform: data.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▼
        </span>
      </div>

      {/* Content */}
      {data.isExpanded ? (
        <div className="p-4 flex flex-col gap-3">{children}</div>
      ) : (
        <div className="py-2 px-4 text-white/40 text-xs italic">Click to expand configuration</div>
      )}

      {/* Output handles */}
      {outputs > 0 && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-[#1e1e2e]"
          style={{ border: `2px solid ${category.color}` }}
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
