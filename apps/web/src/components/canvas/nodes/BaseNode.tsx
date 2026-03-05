import { Handle, Position, useReactFlow } from '@xyflow/react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { renderNodeTypeIcon } from '../icons/nodeTypeIcon';
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

function renderFallbackIcon(fallbackIcon?: string): ReactNode {
  return <span className="text-[18px] leading-none">{fallbackIcon}</span>;
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
      className="min-w-[280px] max-w-[320px] rounded-xl overflow-hidden font-[Inter,system-ui,sans-serif] motion-lift motion-press"
      style={{
        background: 'var(--color-surface-node)',
        border: `2px solid ${category.borderColor}`,
        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.35), 0 0 18px ${category.bgColor}`,
      }}
    >
      {/* Input handles */}
      {inputs > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-[var(--color-surface-node)]"
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
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/5 border border-white/10">
            {renderNodeTypeIcon(nodeType) ?? renderFallbackIcon(icon)}
          </span>
          <span
            className="text-sm font-semibold tracking-[0.3px]"
            style={{ color: category.color }}
          >
            {title}
          </span>
        </div>
        <ChevronDown
          size={18}
          className="text-white/50 transition-transform duration-200"
          style={{ transform: data.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
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
          className="!w-3 !h-3 !bg-[var(--color-surface-node)]"
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
