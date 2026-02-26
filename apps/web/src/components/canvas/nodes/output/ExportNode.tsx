import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { ExportData } from '../../types/node-types';

export function ExportNode({ data, selected }: NodeProps<ExportData>) {
  const config = data.config;
  const subtitle = `.${config.format.toUpperCase()} @ ${config.quality}%`;

  return (
    <CompactNode
      nodeType="export"
      icon="💾"
      title="Export"
      subtitle={subtitle}
      inputs={1}
      outputs={0}
      selected={selected}
    >
      {config.shareLink ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#4ade80',
            fontSize: '10px',
          }}
        >
          <span>✓</span>
          <span>Link ready</span>
        </div>
      ) : (
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>
          Ready to export
        </div>
      )}
    </CompactNode>
  );
}
