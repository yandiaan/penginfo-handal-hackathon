import { useReactFlow } from '@xyflow/react';

import type { ImageGeneratorData, ImageDimension } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: ImageGeneratorData;
};

const DIMENSIONS: { value: ImageDimension; label: string }[] = [
  { value: 'square-1024', label: '1024×1024 (Square)' },
  { value: 'portrait-768x1024', label: '768×1024 (Portrait)' },
  { value: 'landscape-1024x768', label: '1024×768 (Landscape)' },
  { value: 'story-576x1024', label: '576×1024 (Story)' },
];

export function ImageGeneratorPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Mode</label>
        <div className="text-white/50 text-[13px] p-2 px-3 bg-white/5 rounded-md">
          {config.mode === 'text2img' ? '📝 → 🖼️ Text to Image' : '🖼️ → 🖼️ Image to Image'}
          <div className="text-[11px] text-white/30 mt-1">Auto-detected from connections</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Dimensions</label>
        <div className="flex flex-col gap-1.5">
          {DIMENSIONS.map((dim) => (
            <button
              key={dim.value}
              onClick={() => updateConfig({ dimensions: dim.value })}
              className={`py-2.5 px-3 rounded-md border text-white cursor-pointer text-xs text-left ${config.dimensions === dim.value ? 'border-blue-400 bg-blue-400/15' : 'border-white/10 bg-white/5'}`}
            >
              {dim.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex justify-between items-center">
            <label className="block text-white/70 text-xs font-medium mb-2">Steps</label>
            <span className="text-white/60 text-[13px] font-medium">{config.steps}</span>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={config.steps}
            onChange={(e) => updateConfig({ steps: Number(e.target.value) })}
            className="w-full h-2 rounded bg-white/10 outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Seed (optional)</label>
        <input
          type="number"
          value={config.seed ?? ''}
          onChange={(e) => updateConfig({ seed: e.target.value ? Number(e.target.value) : null })}
          placeholder="Random"
          className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none box-border"
        />
      </div>
    </>
  );
}
