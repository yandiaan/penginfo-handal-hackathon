import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { StyleConfigData } from '../../types/node-types';

export function StyleConfigNode({ data, selected }: NodeProps<StyleConfigData>) {
  const { config } = data;

  return (
    <CompactNode
      nodeType="styleConfig"
      icon="🎭"
      title={data.label}
      subtitle={`${config.artStyle} · ${config.mood}`}
      selected={selected}
    >
      <div className="flex gap-1 flex-wrap">
        {config.colorPalette.slice(0, 5).map((color, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded border border-white/10"
            style={{ backgroundColor: color }}
          />
        ))}
        {config.culturalTheme && (
          <span className="text-[10px] text-[#f59e0b] px-1 py-px rounded-sm bg-[rgba(245,158,11,0.15)]">
            {config.culturalTheme}
          </span>
        )}
      </div>
    </CompactNode>
  );
}
