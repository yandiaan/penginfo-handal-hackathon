import { useReactFlow } from '@xyflow/react';
import { drawerFormStyles, drawerStyles } from '../../styles/drawer';
import { NODE_CATEGORIES } from '../../config/nodeCategories';
import type { VariantBatchData } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: VariantBatchData;
};

export function VariantBatchPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const category = NODE_CATEGORIES.variant;
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      {/* Variant Count */}
      <div style={drawerStyles.section}>
        <div style={drawerFormStyles.sliderContainer}>
          <div style={drawerFormStyles.sliderHeader}>
            <label style={drawerFormStyles.label}>Number of Variants</label>
            <span style={drawerFormStyles.sliderValue}>{config.count}</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={config.count}
            onChange={(e) => updateConfig({ count: Number(e.target.value) })}
            style={drawerFormStyles.slider}
          />
          <div style={drawerFormStyles.sliderLabels}>
            <span>1</span>
            <span>20</span>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Quick Select</label>
        <div style={drawerFormStyles.buttonGroup}>
          {[3, 5, 10, 15, 20].map((num) => (
            <button
              key={num}
              onClick={() => updateConfig({ count: num })}
              style={drawerFormStyles.optionButton(config.count === num, category.color)}
            >
              x{num}
            </button>
          ))}
        </div>
      </div>

      <div style={drawerFormStyles.divider} />

      {/* Randomize Toggle */}
      <div style={drawerFormStyles.toggleRow}>
        <span style={drawerFormStyles.toggleLabel}>Randomize order</span>
        <div
          style={drawerFormStyles.toggle(config.randomize, category.color)}
          onClick={() => updateConfig({ randomize: !config.randomize })}
        >
          <div style={drawerFormStyles.toggleKnob(config.randomize)} />
        </div>
      </div>

      {/* Seed Input */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Random Seed (optional)</label>
        <input
          type="number"
          value={config.seed ?? ''}
          onChange={(e) => updateConfig({ seed: e.target.value ? Number(e.target.value) : null })}
          placeholder="Leave empty for random"
          style={drawerFormStyles.input}
        />
        <div
          style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.3)',
            marginTop: '8px',
          }}
        >
          Set seed for reproducible results
        </div>
      </div>

      {/* Output Preview */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Output Preview</label>
        <div style={drawerFormStyles.outputPreview}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {Array.from({ length: Math.min(config.count, 12) }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: category.bgColor,
                  border: `1px solid ${category.borderColor}`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: category.color,
                  fontWeight: 500,
                }}
              >
                {i + 1}
              </div>
            ))}
            {config.count > 12 && (
              <div
                style={{
                  padding: '0 12px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                +{config.count - 12} more
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
