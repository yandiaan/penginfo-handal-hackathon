import { useReactFlow } from '@xyflow/react';
import { drawerFormStyles, drawerStyles } from '../../styles/drawer';
import { NODE_CATEGORIES } from '../../config/nodeCategories';
import type { CanvasRenderData, LayoutType, DimensionPreset } from '../../types/node-types';

const LAYOUTS: { value: LayoutType; label: string; icon: string }[] = [
  { value: 'top-bottom', label: 'Top/Bottom', icon: '⬆️' },
  { value: 'side-by-side', label: 'Side by Side', icon: '↔️' },
  { value: 'overlay', label: 'Overlay', icon: '🔲' },
];

const PRESETS: { value: DimensionPreset; label: string; width: number; height: number }[] = [
  { value: 'instagram-square', label: 'IG Square', width: 1080, height: 1080 },
  { value: 'instagram-story', label: 'IG Story', width: 1080, height: 1920 },
  { value: 'tiktok', label: 'TikTok', width: 1080, height: 1920 },
  { value: 'twitter', label: 'Twitter', width: 1200, height: 675 },
  { value: 'custom', label: 'Custom', width: 0, height: 0 },
];

type Props = {
  nodeId: string;
  data: CanvasRenderData;
};

export function CanvasRenderPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const category = NODE_CATEGORIES.output;
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  const handlePresetChange = (preset: DimensionPreset) => {
    const presetConfig = PRESETS.find((p) => p.value === preset);
    if (presetConfig && preset !== 'custom') {
      updateConfig({
        preset,
        width: presetConfig.width,
        height: presetConfig.height,
      });
    } else {
      updateConfig({ preset });
    }
  };

  // Calculate preview aspect ratio
  const aspectRatio = config.width / config.height;
  const previewWidth = 280;
  const previewHeight = previewWidth / aspectRatio;

  return (
    <>
      {/* Layout Selector */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Layout</label>
        <div style={drawerFormStyles.buttonGroup}>
          {LAYOUTS.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => updateConfig({ layout: value })}
              style={drawerFormStyles.optionButton(config.layout === value, category.color)}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Dimension Preset */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Dimension Preset</label>
        <div style={drawerFormStyles.buttonGroup}>
          {PRESETS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handlePresetChange(value)}
              style={drawerFormStyles.optionButton(config.preset === value, category.color)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Dimensions */}
      {config.preset === 'custom' && (
        <div style={drawerStyles.section}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={drawerFormStyles.label}>Width</label>
              <input
                type="number"
                value={config.width}
                onChange={(e) => updateConfig({ width: Number(e.target.value) })}
                style={drawerFormStyles.input}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={drawerFormStyles.label}>Height</label>
              <input
                type="number"
                value={config.height}
                onChange={(e) => updateConfig({ height: Number(e.target.value) })}
                style={drawerFormStyles.input}
              />
            </div>
          </div>
        </div>
      )}

      {/* Background Color */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Background Color</label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="color"
            value={config.backgroundColor}
            onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
            style={{
              width: '48px',
              height: '40px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          />
          <input
            type="text"
            value={config.backgroundColor}
            onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
            style={{ ...drawerFormStyles.input, flex: 1 }}
          />
        </div>
      </div>

      {/* Preview */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Preview</label>
        <div style={drawerFormStyles.outputPreview}>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
            <div
              style={{
                width: `${Math.min(previewWidth, 280)}px`,
                height: `${Math.min(previewHeight, 200)}px`,
                maxHeight: '200px',
                backgroundColor: config.backgroundColor,
                border: `2px solid ${category.borderColor}`,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: config.layout === 'side-by-side' ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(0,0,0,0.5)',
                  padding: '8px',
                  textAlign: 'center',
                }}
              >
                {config.width} x {config.height}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
