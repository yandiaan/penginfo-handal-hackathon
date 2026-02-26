import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { AITextGeneratorData } from '../../types/node-types';

export function AITextGeneratorNode({ data, selected }: NodeProps<AITextGeneratorData>) {
  const config = data.config;
  const outputCount = config.generatedOutputs.length;
  const subtitle = outputCount > 0 ? `${outputCount} outputs` : `${config.outputCount} to generate`;

  return (
    <CompactNode
      nodeType="aiTextGenerator"
      icon="✨"
      title="AI Text Generator"
      subtitle={subtitle}
      inputs={1}
      outputs={1}
      selected={selected}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Temp</span>
          <span style={{ color: '#a78bfa' }}>{config.temperature.toFixed(1)}</span>
        </div>
        {outputCount > 0 && (
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '10px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            "{config.generatedOutputs[0].slice(0, 25)}..."
          </div>
        )}
      </div>
    </CompactNode>
  );
}
