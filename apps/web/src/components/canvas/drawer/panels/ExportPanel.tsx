import { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { drawerFormStyles, drawerStyles } from '../../styles/drawer';
import { NODE_CATEGORIES } from '../../config/nodeCategories';
import type { ExportData, ExportFormat } from '../../types/node-types';

const FORMATS: { value: ExportFormat; label: string; icon: string }[] = [
  { value: 'png', label: 'PNG', icon: '🖼️' },
  { value: 'jpg', label: 'JPG', icon: '📷' },
  { value: 'gif', label: 'GIF', icon: '🎞️' },
  { value: 'mp4', label: 'MP4', icon: '🎬' },
];

type Props = {
  nodeId: string;
  data: ExportData;
};

export function ExportPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const category = NODE_CATEGORIES.output;
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockLink = `https://share.example.com/${Math.random().toString(36).slice(2, 10)}`;
    updateConfig({ shareLink: mockLink });
    setIsExporting(false);
  };

  const handleCopyLink = async () => {
    if (config.shareLink) {
      await navigator.clipboard.writeText(config.shareLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Format Selector */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Export Format</label>
        <div style={drawerFormStyles.buttonGroup}>
          {FORMATS.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => updateConfig({ format: value })}
              style={drawerFormStyles.optionButton(config.format === value, category.color)}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Slider */}
      <div style={drawerStyles.section}>
        <div style={drawerFormStyles.sliderContainer}>
          <div style={drawerFormStyles.sliderHeader}>
            <label style={drawerFormStyles.label}>Quality</label>
            <span style={drawerFormStyles.sliderValue}>{config.quality}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={config.quality}
            onChange={(e) => updateConfig({ quality: Number(e.target.value) })}
            style={drawerFormStyles.slider}
          />
          <div style={drawerFormStyles.sliderLabels}>
            <span>Small file</span>
            <span>Best quality</span>
          </div>
        </div>
      </div>

      <div style={drawerFormStyles.divider} />

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        style={{
          ...drawerFormStyles.actionButton(category.color),
          opacity: isExporting ? 0.7 : 1,
          cursor: isExporting ? 'not-allowed' : 'pointer',
        }}
      >
        {isExporting ? '⏳ Exporting...' : '💾 Export & Generate Link'}
      </button>

      {/* Share Link */}
      {config.shareLink && (
        <div style={drawerStyles.section}>
          <label style={drawerFormStyles.label}>Share Link</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={config.shareLink}
              readOnly
              style={{ ...drawerFormStyles.input, flex: 1, fontSize: '12px' }}
            />
            <button
              onClick={handleCopyLink}
              style={{
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {isCopied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>
      )}

      {/* Export Info */}
      <div style={drawerStyles.section}>
        <div style={drawerFormStyles.outputPreview}>
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              📁 Format:{' '}
              <strong style={{ color: 'rgba(255, 255, 255, 0.8)' }}>.{config.format}</strong>
            </div>
            <div>
              📊 Quality:{' '}
              <strong style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{config.quality}%</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
