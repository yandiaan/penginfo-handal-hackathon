import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { VariantBatchData } from '../../types/node-types';

export function VariantBatchNode({ data, selected }: NodeProps<VariantBatchData>) {
  const config = data.config;
  const subtitle = `x${config.count} variants`;

  return (
    <CompactNode
      nodeType="variantBatch"
      icon="🎲"
      title="Variant Batch"
      subtitle={subtitle}
      inputs={1}
      outputs={1}
      selected={selected}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
        {Array.from({ length: Math.min(config.count, 8) }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '18px',
              height: '18px',
              backgroundColor: 'rgba(236, 72, 153, 0.15)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              color: '#ec4899',
            }}
          >
            {i + 1}
          </div>
        ))}
        {config.count > 8 && (
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', padding: '0 4px' }}>
            +{config.count - 8}
          </span>
        )}
      </div>
    </CompactNode>
  );
}
