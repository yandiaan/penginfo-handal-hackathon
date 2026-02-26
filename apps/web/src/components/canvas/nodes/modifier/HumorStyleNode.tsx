import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { HumorStyleData, HumorStyleType } from '../../types/node-types';

const HUMOR_EMOJIS: Record<HumorStyleType, string> = {
  receh: '😆',
  satir: '🎭',
  relatable: '😅',
  dark: '🖤',
  absurd: '🤪',
};

export function HumorStyleNode({ data, selected }: NodeProps<HumorStyleData>) {
  const config = data.config;
  const styleEmoji = HUMOR_EMOJIS[config.style];
  const subtitle = `${config.style.charAt(0).toUpperCase() + config.style.slice(1)} @ ${config.intensity}%`;

  return (
    <CompactNode
      nodeType="humorStyle"
      icon="😂"
      title="Humor Style"
      subtitle={subtitle}
      inputs={1}
      outputs={1}
      selected={selected}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '18px' }}>{styleEmoji}</span>
        <div
          style={{
            flex: 1,
            height: '6px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${config.intensity}%`,
              height: '100%',
              backgroundColor: '#60a5fa',
              borderRadius: '3px',
            }}
          />
        </div>
      </div>
    </CompactNode>
  );
}
