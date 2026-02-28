import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { PromptEnhancerData } from '../../types/node-types';

export function PromptEnhancerNode({ data, selected }: NodeProps<PromptEnhancerData>) {
  const { config } = data;

  return (
    <CompactNode
      nodeType="promptEnhancer"
      icon="✨"
      title={data.label}
      subtitle={`${config.creativity} · ${config.tone} · ${config.language.toUpperCase()}`}
      selected={selected}
    >
      <div className="flex items-center gap-1.5 text-[11px] text-white/50">
        <span className="px-1.5 py-0.5 rounded bg-[rgba(167,139,250,0.2)] text-[#a78bfa] text-[10px]">
          {config.contentType}
        </span>
        <span className="text-white/30">▶ Qwen</span>
      </div>
    </CompactNode>
  );
}
