import { useReactFlow } from '@xyflow/react';
import { drawerFormStyles, drawerStyles } from '../../styles/drawer';
import { NODE_CATEGORIES } from '../../config/nodeCategories';
import type { HumorStyleData, HumorStyleType } from '../../types/node-types';

const HUMOR_STYLES: { value: HumorStyleType; label: string; emoji: string }[] = [
  { value: 'receh', label: 'Receh', emoji: '😆' },
  { value: 'satir', label: 'Satir', emoji: '🎭' },
  { value: 'relatable', label: 'Relatable', emoji: '😅' },
  { value: 'dark', label: 'Dark', emoji: '🖤' },
  { value: 'absurd', label: 'Absurd', emoji: '🤪' },
];

const LANGUAGES = [
  { value: 'id', label: 'Indonesian' },
  { value: 'en', label: 'English' },
] as const;

type Props = {
  nodeId: string;
  data: HumorStyleData;
};

export function HumorStylePanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const category = NODE_CATEGORIES.modifier;
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      {/* Style Selector */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Humor Style</label>
        <div style={drawerFormStyles.buttonGroup}>
          {HUMOR_STYLES.map(({ value, label, emoji }) => (
            <button
              key={value}
              onClick={() => updateConfig({ style: value })}
              style={drawerFormStyles.optionButton(config.style === value, category.color)}
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Intensity Slider */}
      <div style={drawerStyles.section}>
        <div style={drawerFormStyles.sliderContainer}>
          <div style={drawerFormStyles.sliderHeader}>
            <label style={drawerFormStyles.label}>Intensity</label>
            <span style={drawerFormStyles.sliderValue}>{config.intensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={config.intensity}
            onChange={(e) => updateConfig({ intensity: Number(e.target.value) })}
            style={drawerFormStyles.slider}
          />
          <div style={drawerFormStyles.sliderLabels}>
            <span>Subtle</span>
            <span>Extreme</span>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Language</label>
        <select
          value={config.language}
          onChange={(e) => updateConfig({ language: e.target.value as 'id' | 'en' })}
          style={drawerFormStyles.select}
        >
          {LANGUAGES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div style={drawerFormStyles.divider} />

      {/* Active Style Preview */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Active Style</label>
        <div style={drawerFormStyles.outputPreview}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '16px',
            }}
          >
            <span style={{ fontSize: '24px' }}>
              {HUMOR_STYLES.find((s) => s.value === config.style)?.emoji}
            </span>
            <div>
              <div style={{ color: category.color, fontWeight: 600 }}>
                {HUMOR_STYLES.find((s) => s.value === config.style)?.label}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '13px' }}>
                @ {config.intensity}% intensity
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
