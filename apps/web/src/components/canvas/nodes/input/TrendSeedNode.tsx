import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { TrendSeedData } from '../../types/node-types';

export function TrendSeedNode({ data, selected }: NodeProps<TrendSeedData>) {
  const config = data.config;
  const subtitle = config.topic || 'No topic set';

  return (
    <CompactNode
      nodeType="trendSeed"
      icon="🔥"
      title="Trend Seed"
      subtitle={subtitle}
      inputs={0}
      outputs={1}
      selected={selected}
    >
      {config.keywords.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {config.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              style={{
                padding: '3px 8px',
                backgroundColor: 'rgba(74, 222, 128, 0.15)',
                borderRadius: '12px',
                color: '#4ade80',
                fontSize: '10px',
              }}
            >
              {keyword}
            </span>
          ))}
          {config.keywords.length > 3 && (
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', padding: '3px 4px' }}>
              +{config.keywords.length - 3}
            </span>
          )}
        </div>
      )}
    </CompactNode>
  );
}
