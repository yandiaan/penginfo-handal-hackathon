import type { Node, NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { TextPromptData } from '../../types/node-types';
import { AlignLeft } from 'lucide-react';

export function TextPromptNode({ data, selected }: NodeProps<Node<TextPromptData>>) {
  const { config } = data;
  const charCount = config.text.length;
  const pct = Math.min(100, (charCount / config.maxLength) * 100);
  const barColor = pct > 90 ? '#f87171' : pct > 70 ? '#fb923c' : '#4ade80';
  const preview = config.text
    ? config.text.length > 80
      ? config.text.slice(0, 80) + '...'
      : config.text
    : null;

  return (
    <CompactNode nodeType="textPrompt" icon="" title={data.label} selected={selected} minWidth={220}>
      {/* Text preview box */}
      <div
        className="relative w-full min-h-[64px] rounded-lg p-2.5 mb-2"
        style={{ background: '#0e0e16', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {preview ? (
          <p className="text-[11px] text-white/65 leading-relaxed line-clamp-3">{preview}</p>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 py-3">
            <AlignLeft size={16} className="text-white/15" />
            <span className="text-[10px] text-white/25 italic">{config.placeholder}</span>
          </div>
        )}
      </div>
      {/* Character fill bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: pct + '%', backgroundColor: barColor }}
          />
        </div>
        <span className="text-[9px] text-white/30 tabular-nums shrink-0">
          {charCount}/{config.maxLength}
        </span>
      </div>
    </CompactNode>
  );
}
