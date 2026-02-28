import { Handle, Position, useNodeId } from '@xyflow/react';
import type { ReactNode } from 'react';
import { getCategoryForNodeType } from '../config/nodeCategories';
import { PORT_COLORS } from '../config/port-colors';
import { NODE_PORT_SCHEMAS } from '../types/node-types';
import type { CustomNodeType } from '../types/node-types';
import type { PortDefinition } from '../types/port-types';
import { useExecutionContext } from '../execution/ExecutionContext';
import type { NodeExecutionStatus } from '../execution/types';

export interface CompactNodeProps {
  nodeType: CustomNodeType;
  icon: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  selected?: boolean;
}

const STATUS_COLORS: Record<NodeExecutionStatus, { border: string; glow: string; bg: string }> = {
  idle: { border: 'transparent', glow: 'transparent', bg: 'transparent' },
  ready: { border: '#4ade80', glow: '#4ade8040', bg: '#4ade8015' },
  running: { border: '#60a5fa', glow: '#60a5fa50', bg: '#60a5fa15' },
  done: { border: '#4ade80', glow: '#4ade8040', bg: '#4ade8015' },
  error: { border: '#f87171', glow: '#f8717150', bg: '#f8717115' },
  stale: { border: '#fb923c', glow: '#fb923c40', bg: '#fb923c15' },
};

const STATUS_ICONS: Record<NodeExecutionStatus, string | null> = {
  idle: null,
  ready: '◉',
  running: null, // uses animated spinner
  done: '✓',
  error: '✕',
  stale: '↻',
};

export function CompactNode({
  nodeType,
  icon,
  title,
  subtitle,
  children,
  selected = false,
}: CompactNodeProps) {
  const category = getCategoryForNodeType(nodeType);
  const schema = NODE_PORT_SCHEMAS[nodeType];
  const nodeId = useNodeId();
  const { getNodeState } = useExecutionContext();
  const execState = nodeId ? getNodeState(nodeId) : null;
  const status: NodeExecutionStatus = execState?.status ?? 'idle';
  const colors = STATUS_COLORS[status];
  const hasStatus = status !== 'idle';
  const isRunning = status === 'running';
  const isError = status === 'error';
  const isDone = status === 'done';

  return (
    <div
      className={`min-w-[180px] max-w-[220px] bg-[#1e1e2e] rounded-xl overflow-visible font-[Inter,system-ui,sans-serif] cursor-pointer transition-[border-color,box-shadow] duration-200 relative${isRunning ? ' animate-pulse' : ''}`}
      style={{
        border: `2px solid ${selected ? category.color : hasStatus ? colors.border : category.borderColor}`,
        boxShadow: hasStatus
          ? `0 0 0 3px ${colors.glow}, 0 4px 20px rgba(0, 0, 0, 0.3)`
          : selected
            ? `0 0 0 2px ${category.color}40, 0 4px 20px rgba(0, 0, 0, 0.3)`
            : `0 4px 20px rgba(0, 0, 0, 0.3)`,
      }}
    >
      {/* Status badge — n8n-style indicator */}
      {hasStatus && (
        <div
          className="absolute -top-2 -right-2 z-10 flex items-center justify-center rounded-full text-[10px] font-bold leading-none"
          style={{
            width: 20,
            height: 20,
            backgroundColor: colors.border,
            color: '#1e1e2e',
            boxShadow: `0 0 6px ${colors.glow}`,
          }}
          title={isError && execState?.error ? execState.error : status}
        >
          {isRunning ? (
            <svg
              className="animate-spin"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
            </svg>
          ) : (
            STATUS_ICONS[status]
          )}
        </div>
      )}

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

      {/* Status footer — shows running/done/error state */}
      {hasStatus && (
        <div
          className="px-4 py-2 flex items-center gap-2 text-[10px]"
          style={{
            borderTop: `1px solid ${category.borderColor}`,
            backgroundColor: colors.bg,
          }}
        >
          {isRunning && (
            <>
              <div className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: colors.border }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: colors.border }}
                />
              </div>
              <span style={{ color: colors.border }}>Running…</span>
              {execState && execState.progress > 0 && execState.progress < 100 && (
                <span className="text-white/40 ml-auto">{execState.progress}%</span>
              )}
            </>
          )}
          {isDone && (
            <>
              <span style={{ color: colors.border }}>✓ Done</span>
              {execState?.lastRunAt && (
                <span className="text-white/30 ml-auto">
                  {formatTimestamp(execState.lastRunAt)}
                </span>
              )}
            </>
          )}
          {isError && (
            <span
              className="truncate"
              style={{ color: colors.border }}
              title={execState?.error || 'Unknown error'}
            >
              ✕ {execState?.error || 'Failed'}
            </span>
          )}
          {status === 'stale' && (
            <span style={{ color: colors.border }}>↻ Needs re-run</span>
          )}
          {status === 'ready' && (
            <span style={{ color: colors.border }}>◉ Ready</span>
          )}
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

function formatTimestamp(ts: number): string {
  const diff = Math.round((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}
