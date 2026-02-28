import { Handle, Position } from '@xyflow/react';
import type { ReactNode } from 'react';
import { getCategoryForNodeType } from '../config/nodeCategories';
import { PORT_COLORS } from '../config/port-colors';
import { NODE_PORT_SCHEMAS } from '../types/node-types';
import type { CustomNodeType } from '../types/node-types';
import type { PortDefinition } from '../types/port-types';

export interface CompactNodeProps {
  nodeType: CustomNodeType;
  icon: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  selected?: boolean;
  statusGlow?: 'idle' | 'ready' | 'running' | 'done' | 'error';
}

const STATUS_GLOW_COLORS: Record<string, string> = {
  idle: 'transparent',
  ready: '#4ade80',
  running: '#60a5fa',
  done: '#4ade80',
  error: '#f87171',
};

export function CompactNode({
  nodeType,
  icon,
  title,
  subtitle,
  children,
  selected = false,
  statusGlow = 'idle',
}: CompactNodeProps) {
  const category = getCategoryForNodeType(nodeType);
  const schema = NODE_PORT_SCHEMAS[nodeType];

  const glowColor = STATUS_GLOW_COLORS[statusGlow] ?? 'transparent';
  const hasGlow = statusGlow !== 'idle';

  return (
    <div
      className="min-w-[180px] max-w-[220px] bg-[#1e1e2e] rounded-xl overflow-visible font-[Inter,system-ui,sans-serif] cursor-pointer transition-[border-color,box-shadow] duration-200 relative"
      style={{
        border: `2px solid ${selected ? category.color : category.borderColor}`,
        boxShadow: hasGlow
          ? `0 0 0 3px ${glowColor}60, 0 4px 20px rgba(0, 0, 0, 0.3)`
          : selected
            ? `0 0 0 2px ${category.color}40, 0 4px 20px rgba(0, 0, 0, 0.3)`
            : `0 4px 20px rgba(0, 0, 0, 0.3)`,
      }}
    >
      {/* Input handles (typed) */}
      {schema.inputs.map((port: PortDefinition, index: number) => (
        <Handle
          key={`input-${port.id}`}
          id={port.id}
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-[#1e1e2e]"
          style={{
            border: `2px solid ${PORT_COLORS[port.type]}`,
            top: `${getHandlePosition(index, schema.inputs.length)}%`,
          }}
          title={`${port.label} (${port.type})${port.required ? '' : ' — optional'}`}
        />
      ))}

      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3.5"
        style={{ backgroundColor: category.bgColor }}
      >
        <span className="text-xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <div
            className="text-sm font-semibold tracking-[0.2px] whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: category.color }}
          >
            {title}
          </div>
          {subtitle && (
            <div className="text-white/40 text-[11px] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Optional compact content preview */}
      {children && (
        <div
          className="px-4 pt-2.5 pb-3.5"
          style={{ borderTop: `1px solid ${category.borderColor}` }}
        >
          {children}
        </div>
      )}

      {/* Output handles (typed) */}
      {schema.outputs.map((port: PortDefinition, index: number) => (
        <Handle
          key={`output-${port.id}`}
          id={port.id}
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-[#1e1e2e]"
          style={{
            border: `2px solid ${PORT_COLORS[port.type]}`,
            top: `${getHandlePosition(index, schema.outputs.length)}%`,
          }}
          title={`${port.label} (${port.type})`}
        />
      ))}
    </div>
  );
}

// Distribute handles evenly along the node height
function getHandlePosition(index: number, total: number): number {
  if (total === 1) return 50;
  const padding = 25; // 25% from top/bottom
  return padding + (index / (total - 1)) * (100 - 2 * padding);
}
