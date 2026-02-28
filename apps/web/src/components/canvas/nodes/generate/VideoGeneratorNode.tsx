import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { VideoGeneratorData } from '../../types/node-types';

export function VideoGeneratorNode({ data, selected }: NodeProps<VideoGeneratorData>) {
  const { config } = data;

  return (
    <CompactNode
      nodeType="videoGenerator"
      icon="🎬"
      title={data.label}
      subtitle={`${config.mode} · ${config.duration} · ${config.resolution}`}
      selected={selected}
    >
      <div className="flex items-center gap-1.5 text-[11px] text-white/50">
        <span className="text-white/30">🎬 Wan · {config.fps}fps</span>
      </div>
    </CompactNode>
  );
}
