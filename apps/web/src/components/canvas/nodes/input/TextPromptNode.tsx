import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { TextPromptData } from '../../types/node-types';

export function TextPromptNode({ data, selected }: NodeProps<TextPromptData>) {
  const { config } = data;
  const charCount = config.text.length;
  const preview = config.text
    ? config.text.length > 40
      ? `${config.text.slice(0, 40)}…`
      : config.text
    : config.placeholder;

  return (
    <CompactNode
      nodeType="textPrompt"
      icon="📝"
      title={data.label}
      subtitle={charCount > 0 ? `${charCount}/${config.maxLength} chars` : undefined}
      selected={selected}
    >
      <div
        className={`text-[11px] leading-relaxed max-h-8 overflow-hidden ${
          charCount > 0 ? 'text-white/70' : 'text-white/30 italic'
        }`}
      >
        {preview}
      </div>
    </CompactNode>
  );
}
