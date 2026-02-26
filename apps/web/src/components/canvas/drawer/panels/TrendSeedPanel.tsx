import { useState, type KeyboardEvent } from 'react';
import { useReactFlow } from '@xyflow/react';
import { drawerFormStyles, drawerStyles } from '../../styles/drawer';
import { NODE_CATEGORIES } from '../../config/nodeCategories';
import type { TrendSeedData } from '../../types/node-types';

const PRESET_TOPICS = ['THR', 'Mudik', 'Sahur', 'Lebaran', 'Puasa', 'Ramadan'];

type Props = {
  nodeId: string;
  data: TrendSeedData;
};

export function TrendSeedPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const [keywordInput, setKeywordInput] = useState('');
  const category = NODE_CATEGORIES.input;
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  const handleAddKeyword = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      const newKeyword = keywordInput.trim();
      if (!config.keywords.includes(newKeyword)) {
        updateConfig({ keywords: [...config.keywords, newKeyword] });
      }
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    updateConfig({ keywords: config.keywords.filter((k) => k !== keyword) });
  };

  const handlePresetClick = (topic: string) => {
    updateConfig({ topic });
    if (!config.keywords.includes(topic)) {
      updateConfig({ keywords: [...config.keywords, topic] });
    }
  };

  return (
    <>
      {/* Topic Input */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Topic / Theme</label>
        <input
          type="text"
          value={config.topic}
          onChange={(e) => updateConfig({ topic: e.target.value })}
          placeholder="Enter topic..."
          style={drawerFormStyles.input}
        />
      </div>

      {/* Preset Topics */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Quick Presets</label>
        <div style={drawerFormStyles.buttonGroup}>
          {PRESET_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => handlePresetClick(topic)}
              style={drawerFormStyles.optionButton(config.topic === topic, category.color)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Keywords (press Enter to add)</label>
        <input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={handleAddKeyword}
          placeholder="Add keyword..."
          style={drawerFormStyles.input}
        />
        {config.keywords.length > 0 && (
          <div style={{ ...drawerFormStyles.tagContainer, marginTop: '12px' }}>
            {config.keywords.map((keyword) => (
              <span key={keyword} style={drawerFormStyles.tag}>
                {keyword}
                <button
                  onClick={() => handleRemoveKeyword(keyword)}
                  style={drawerFormStyles.tagRemove}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={drawerFormStyles.divider} />

      {/* Trending Toggle */}
      <div style={drawerFormStyles.toggleRow}>
        <span style={drawerFormStyles.toggleLabel}>Trending mode</span>
        <div
          style={drawerFormStyles.toggle(config.trending, category.color)}
          onClick={() => updateConfig({ trending: !config.trending })}
        >
          <div style={drawerFormStyles.toggleKnob(config.trending)} />
        </div>
      </div>
    </>
  );
}
