import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { CanvasRenderData } from '../../types/node-types';

const PRESET_LABELS: Record<string, string> = {
  'instagram-square': 'IG Square',
  'instagram-story': 'IG Story',
  tiktok: 'TikTok',
  twitter: 'Twitter',
  custom: 'Custom',
};

export function CanvasRenderNode({ data, selected }: NodeProps<CanvasRenderData>) {
  const config = data.config;
  const presetLabel = PRESET_LABELS[config.preset] || config.preset;
  const subtitle = `${presetLabel} • ${config.width}x${config.height}`;

  return (
    <CompactNode
      nodeType="canvasRender"
      icon="🖼️"
      title="Canvas Render"
      subtitle={subtitle}
      inputs={1}
      outputs={1}
      selected={selected}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            backgroundColor: config.backgroundColor,
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '4px',
          }}
        />
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>
          <div>{config.layout}</div>
          <div style={{ color: 'rgba(255,255,255,0.3)' }}>{config.backgroundColor}</div>
        </div>
      </div>
    </CompactNode>
  );
}
