import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { TextOverlayData } from '../../types/node-types';

export function TextOverlayNode({ data, selected }: NodeProps<TextOverlayData>) {
  const { config } = data;
  const preview = config.text
    ? config.text.length > 30
      ? `${config.text.slice(0, 30)}…`
      : config.text
    : 'From input port';

  return (
    <CompactNode
      nodeType="textOverlay"
      icon="🔤"
      title={data.label}
      subtitle={`${config.position} · ${config.font}`}
      selected={selected}
    >
      <div className={`text-[11px] ${config.text ? 'text-white/60' : 'text-white/30 italic'}`}>
        {preview}
      </div>
    </CompactNode>
  );
}
