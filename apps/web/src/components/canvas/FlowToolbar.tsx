import { Panel } from '@xyflow/react';
import { NODE_TYPES, type NodeKind } from './config/nodeTypes';
import { btnStyle, dividerStyle, labelStyle, toolbarStyle } from './styles/toolbar';
import type { MouseMode } from './types';

type Props = {
  mode: MouseMode;
  onModeChange: (mode: MouseMode) => void;
  onAddNode: (type: NodeKind, label: string) => void;
};

export function FlowToolbar({ mode, onModeChange, onAddNode }: Props) {
  return (
    <Panel position="top-center">
      <div style={toolbarStyle}>
        {/* Mode toggle */}
        <span style={labelStyle}>Mode</span>
        <button
          onClick={() => onModeChange('pan')}
          title="Pan mode"
          style={{
            ...btnStyle,
            borderColor: mode === 'pan' ? '#a78bfa' : 'rgba(255,255,255,0.2)',
            color: mode === 'pan' ? '#a78bfa' : 'rgba(255,255,255,0.5)',
            background: mode === 'pan' ? 'rgba(167,139,250,0.12)' : 'transparent',
          }}
        >
          ✋ Pan
        </button>
        <button
          onClick={() => onModeChange('select')}
          title="Select mode — drag to multi-select"
          style={{
            ...btnStyle,
            borderColor: mode === 'select' ? '#f59e0b' : 'rgba(255,255,255,0.2)',
            color: mode === 'select' ? '#f59e0b' : 'rgba(255,255,255,0.5)',
            background: mode === 'select' ? 'rgba(245,158,11,0.12)' : 'transparent',
          }}
        >
          ⬚ Select
        </button>

        {/* Divider */}
        <div style={dividerStyle} />

        {/* Add node */}
        <span style={labelStyle}>Add node</span>
        {NODE_TYPES.map(({ type, label, color }) => (
          <button
            key={label}
            onClick={() => onAddNode(type, label.replace(/^.+? /, ''))}
            style={{ ...btnStyle, borderColor: color, color }}
          >
            {label}
          </button>
        ))}
      </div>
    </Panel>
  );
}
