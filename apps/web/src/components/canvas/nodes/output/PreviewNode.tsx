import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { PreviewData } from '../../types/node-types';

export function PreviewNode({ data, selected }: NodeProps<PreviewData>) {
  const { config } = data;

  return (
    <CompactNode
      nodeType="preview"
      icon="👁️"
      title={data.label}
      subtitle={`${config.preset} · ${config.width}×${config.height}`}
      selected={selected}
    >
      <div
        className="w-full h-[50px] rounded border border-white/10 flex items-center justify-center text-white/30 text-[10px]"
        style={{ backgroundColor: config.backgroundColor }}
      >
        {config.fit}
      </div>
    </CompactNode>
  );
}
