import { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { drawerFormStyles, drawerStyles } from '../../styles/drawer';
import { NODE_CATEGORIES } from '../../config/nodeCategories';
import type { AITextGeneratorData } from '../../types/node-types';
import { mockAI } from '../../services/mockAI';

type Props = {
  nodeId: string;
  data: AITextGeneratorData;
};

export function AITextGeneratorPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const [isGenerating, setIsGenerating] = useState(false);
  const category = NODE_CATEGORIES.generator;
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  const handleGenerate = async () => {
    if (!config.prompt.trim()) return;

    setIsGenerating(true);
    try {
      const outputs = await mockAI.generateText(config.prompt, config.outputCount);
      updateConfig({ generatedOutputs: outputs });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Prompt Input */}
      <div style={drawerStyles.section}>
        <label style={drawerFormStyles.label}>Prompt Template</label>
        <textarea
          value={config.prompt}
          onChange={(e) => updateConfig({ prompt: e.target.value })}
          placeholder="Generate a funny punchline about {topic}..."
          style={drawerFormStyles.textarea}
        />
      </div>

      {/* Temperature */}
      <div style={drawerStyles.section}>
        <div style={drawerFormStyles.sliderContainer}>
          <div style={drawerFormStyles.sliderHeader}>
            <label style={drawerFormStyles.label}>Temperature (Creativity)</label>
            <span style={drawerFormStyles.sliderValue}>{config.temperature.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={config.temperature}
            onChange={(e) => updateConfig({ temperature: Number(e.target.value) })}
            style={drawerFormStyles.slider}
          />
          <div style={drawerFormStyles.sliderLabels}>
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>
      </div>

      {/* Max Tokens */}
      <div style={drawerStyles.section}>
        <div style={drawerFormStyles.sliderContainer}>
          <div style={drawerFormStyles.sliderHeader}>
            <label style={drawerFormStyles.label}>Max Tokens</label>
            <span style={drawerFormStyles.sliderValue}>{config.maxTokens}</span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={config.maxTokens}
            onChange={(e) => updateConfig({ maxTokens: Number(e.target.value) })}
            style={drawerFormStyles.slider}
          />
        </div>
      </div>

      {/* Output Count */}
      <div style={drawerStyles.section}>
        <div style={drawerFormStyles.sliderContainer}>
          <div style={drawerFormStyles.sliderHeader}>
            <label style={drawerFormStyles.label}>Output Count</label>
            <span style={drawerFormStyles.sliderValue}>{config.outputCount}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={config.outputCount}
            onChange={(e) => updateConfig({ outputCount: Number(e.target.value) })}
            style={drawerFormStyles.slider}
          />
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !config.prompt.trim()}
        style={{
          ...drawerFormStyles.actionButton(category.color),
          opacity: isGenerating || !config.prompt.trim() ? 0.5 : 1,
          cursor: isGenerating || !config.prompt.trim() ? 'not-allowed' : 'pointer',
        }}
      >
        {isGenerating ? '⏳ Generating...' : '✨ Generate'}
      </button>

      {/* Generated Outputs */}
      {config.generatedOutputs.length > 0 && (
        <div style={drawerStyles.section}>
          <label style={drawerFormStyles.label}>Generated Outputs</label>
          <div style={drawerFormStyles.outputPreview}>
            {config.generatedOutputs.map((output, index) => (
              <div key={index} style={drawerFormStyles.outputItem}>
                {index + 1}. {output}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
