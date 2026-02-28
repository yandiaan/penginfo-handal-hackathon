import { useState } from 'react';
import { Panel } from '@xyflow/react';
import { NODE_CATEGORIES, NODE_TYPES_BY_CATEGORY } from './config/nodeCategories';
import type { CustomNodeType } from './types/node-types';
import type { MouseMode } from './types';

type Props = {
  mode: MouseMode;
  onModeChange: (mode: MouseMode) => void;
  onAddNode: (type: CustomNodeType) => void;
  onRunPipeline?: () => void;
  pipelineRunning?: boolean;
};

const categoryOrder: (keyof typeof NODE_CATEGORIES)[] = [
  'input',
  'transform',
  'generate',
  'compose',
  'output',
];

export function FlowToolbar({
  mode,
  onModeChange,
  onAddNode,
  onRunPipeline,
  pipelineRunning = false,
}: Props) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <Panel position="top-center">
      <div className="flex items-center gap-2 px-3.5 py-2 bg-[rgba(15,15,15,0.85)] backdrop-blur-md rounded-[10px] border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
        {/* Mode toggle */}
        <span className="text-[11px] font-semibold tracking-wide uppercase text-white/40 mr-1 font-[system-ui,sans-serif]">
          Mode
        </span>
        <button
          onClick={() => onModeChange('pan')}
          title="Pan mode"
          className="px-3 py-1.5 text-xs font-medium font-[system-ui,sans-serif] bg-transparent border rounded-md cursor-pointer transition-colors duration-150"
          style={{
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
          className="px-3 py-1.5 text-xs font-medium font-[system-ui,sans-serif] bg-transparent border rounded-md cursor-pointer transition-colors duration-150"
          style={{
            borderColor: mode === 'select' ? '#f59e0b' : 'rgba(255,255,255,0.2)',
            color: mode === 'select' ? '#f59e0b' : 'rgba(255,255,255,0.5)',
            background: mode === 'select' ? 'rgba(245,158,11,0.12)' : 'transparent',
          }}
        >
          ⬚ Select
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/15 mx-1" />

        {/* Add nodes by category */}
        <span className="text-[11px] font-semibold tracking-wide uppercase text-white/40 mr-1 font-[system-ui,sans-serif]">
          Add node
        </span>
        {categoryOrder.map((categoryId) => {
          const category = NODE_CATEGORIES[categoryId];
          const nodes = NODE_TYPES_BY_CATEGORY[categoryId] || [];
          const isExpanded = expandedCategory === categoryId;

          return (
            <div key={categoryId} className="relative">
              <button
                onClick={() => toggleCategory(categoryId)}
                className="px-3 py-1.5 text-xs font-medium font-[system-ui,sans-serif] bg-transparent border rounded-md cursor-pointer transition-colors duration-150"
                style={{
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-lg p-2 min-w-[180px] z-[100] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  style={{
                    backgroundColor: 'rgba(30, 30, 46, 0.98)',
                    border: `1px solid ${category.borderColor}`,
                  }}
                >
                  {nodes.map((node) => (
                    <button
                      key={node.type}
                      onClick={() => {
                        onAddNode(node.type);
                        setExpandedCategory(null);
                      }}
                      className="flex items-center gap-2 w-full py-2.5 px-3 bg-transparent border-none rounded-md text-white/80 text-[13px] cursor-pointer text-left transition-colors duration-150 hover:bg-white/10"
                    >
                      <span className="text-base">{node.icon}</span>
                      <div>
                        <div className="font-medium" style={{ color: category.color }}>
                          {node.label}
                        </div>
                        <div className="text-[11px] text-white/40 mt-0.5">{node.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div className="w-px h-5 bg-white/15 mx-1" />

        {/* Run Pipeline button */}
        {onRunPipeline && (
          <button
            onClick={onRunPipeline}
            disabled={pipelineRunning}
            className="px-3 py-1.5 text-xs font-medium font-[system-ui,sans-serif] bg-transparent border rounded-md transition-colors duration-150"
            style={{
              borderColor: pipelineRunning ? 'rgba(255,255,255,0.2)' : '#4ade80',
              color: pipelineRunning ? 'rgba(255,255,255,0.4)' : '#4ade80',
              background: pipelineRunning ? 'rgba(255,255,255,0.05)' : 'rgba(74,222,128,0.12)',
              cursor: pipelineRunning ? 'not-allowed' : 'pointer',
            }}
          >
            {pipelineRunning ? '⏳ Running...' : '▶ Run Pipeline'}
          </button>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {expandedCategory && (
        <div className="fixed inset-0 z-50" onClick={() => setExpandedCategory(null)} />
      )}
    </Panel>
  );
}
