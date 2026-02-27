import { useState } from 'react';
import { Panel } from '@xyflow/react';
import {
  NODE_CATEGORIES,
  NODE_TYPES_BY_CATEGORY,
  type NodeCategoryConfig,
} from './config/nodeCategories';
import type { CustomNodeType } from './types/node-types';
import { btnStyle, dividerStyle, labelStyle, toolbarStyle } from './styles/toolbar';
import type { MouseMode } from './types';

type Props = {
  mode: MouseMode;
  onModeChange: (mode: MouseMode) => void;
  onAddNode: (type: CustomNodeType) => void;
};

const categoryOrder: (keyof typeof NODE_CATEGORIES)[] = [
  'input',
  'generator',
  'modifier',
  'variant',
  'output',
];

export function FlowToolbar({ mode, onModeChange, onAddNode }: Props) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

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

        {/* Add nodes by category */}
        <span style={labelStyle}>Add node</span>
        {categoryOrder.map((categoryId) => {
          const category = NODE_CATEGORIES[categoryId];
          const nodes = NODE_TYPES_BY_CATEGORY[categoryId] || [];
          const isExpanded = expandedCategory === categoryId;

          return (
            <div key={categoryId} style={{ position: 'relative' }}>
              <button
                onClick={() => toggleCategory(categoryId)}
                style={{
                  ...btnStyle,
                  borderColor: isExpanded ? category.color : 'rgba(255,255,255,0.2)',
                  color: isExpanded ? category.color : 'rgba(255,255,255,0.5)',
                  background: isExpanded ? category.bgColor : 'transparent',
                }}
              >
                {category.icon} {category.label} ▾
              </button>

              {/* Dropdown */}
              {isExpanded && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '8px',
                    backgroundColor: 'rgba(30, 30, 46, 0.98)',
                    border: `1px solid ${category.borderColor}`,
                    borderRadius: '8px',
                    padding: '8px',
                    minWidth: '180px',
                    zIndex: 100,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {nodes.map((node) => (
                    <button
                      key={node.type}
                      onClick={() => {
                        onAddNode(node.type);
                        setExpandedCategory(null);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '10px 12px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background-color 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = category.bgColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{node.icon}</span>
                      <div>
                        <div style={{ fontWeight: 500, color: category.color }}>
                          {node.label}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: 'rgba(255, 255, 255, 0.4)',
                            marginTop: '2px',
                          }}
                        >
                          {node.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Click outside to close dropdown */}
      {expandedCategory && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
          }}
          onClick={() => setExpandedCategory(null)}
        />
      )}
    </Panel>
  );
}
