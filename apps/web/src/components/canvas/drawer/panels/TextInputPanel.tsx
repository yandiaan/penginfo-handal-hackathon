import { useReactFlow } from '@xyflow/react';
import { drawerFormStyles, drawerStyles } from '../../styles/drawer';
import type { TextInputData } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: TextInputData;
};

export function TextInputPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  const charCount = config.text.length;
  const isOverLimit = charCount > config.maxLength;

  return (
    <>
      {/* Text Area */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Text Content</label>
        <textarea
          value={config.text}
          onChange={(e) => updateConfig({ text: e.target.value })}
          placeholder="Enter your text..."
          style={{
            ...drawerFormStyles.textarea,
            borderColor: isOverLimit ? '#f87171' : 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '8px',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              color: isOverLimit ? '#f87171' : 'rgba(255, 255, 255, 0.4)',
            }}
          >
            {charCount} / {config.maxLength}
          </span>
        </div>
      </div>

      {/* Max Length Slider */}
      <div style={drawerStyles.section}>
        <div style={drawerFormStyles.sliderContainer}>
          <div style={drawerFormStyles.sliderHeader}>
            <label style={drawerFormStyles.label}>Max Length</label>
            <span style={drawerFormStyles.sliderValue}>{config.maxLength}</span>
          </div>
          <input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={config.maxLength}
            onChange={(e) => updateConfig({ maxLength: Number(e.target.value) })}
            style={drawerFormStyles.slider}
          />
        </div>
      </div>
    </>
  );
}
