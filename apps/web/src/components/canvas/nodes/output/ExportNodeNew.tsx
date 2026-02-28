import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { ExportData } from '../../types/node-types';

export function ExportNode({ data, selected }: NodeProps<ExportData>) {
  const { config } = data;

  return (
    <CompactNode
      nodeType="export"
      icon="💾"
      title={data.label}
      subtitle={`${config.format.toUpperCase()} · ${config.quality}%`}
      selected={selected}
    >
      <div className="flex gap-1.5 text-[11px]">
        <span className="px-2 py-0.5 rounded bg-[rgba(248,113,113,0.15)] text-[#f87171] text-[10px]">
          {config.shareTarget}
        </span>
      </div>
    </CompactNode>
  );
}
