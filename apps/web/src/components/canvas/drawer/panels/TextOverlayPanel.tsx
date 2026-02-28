import { useReactFlow } from '@xyflow/react';

import type { TextOverlayData, TextPosition, FontFamily, TextEffect } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: TextOverlayData;
};

const POSITIONS: TextPosition[] = ['top', 'center', 'bottom', 'custom'];
const FONTS: { value: FontFamily; label: string }[] = [
  { value: 'inter', label: 'Inter' },
  { value: 'impact', label: 'Impact' },
  { value: 'arabic-display', label: 'Arabic Display' },
  { value: 'comic-neue', label: 'Comic Neue' },
];
const EFFECTS: TextEffect[] = ['none', 'shadow', 'glow', 'gradient'];

export function TextOverlayPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">
          Text (or from input port)
        </label>
        <textarea
          value={config.text}
          onChange={(e) => updateConfig({ text: e.target.value })}
          placeholder="Leave empty to use connected text input"
          className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none resize-y min-h-[80px] font-inherit box-border"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Position</label>
        <div className="flex gap-1.5">
          {POSITIONS.map((pos) => (
            <button
              key={pos}
              onClick={() => updateConfig({ position: pos })}
              className={`flex-1 p-2 rounded-md border cursor-pointer text-white text-[11px] ${
                config.position === pos
                  ? 'border-amber-500 bg-amber-500/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Font</label>
        <div className="flex flex-wrap gap-1.5">
          {FONTS.map((f) => (
            <button
              key={f.value}
              onClick={() => updateConfig({ font: f.value })}
              className={`px-3 py-1.5 rounded-full border cursor-pointer text-white text-xs ${
                config.font === f.value
                  ? 'border-amber-500 bg-amber-500/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex justify-between items-center">
            <label className="block text-white/70 text-xs font-medium mb-2">Font Size</label>
            <span className="text-white/60 text-[13px] font-medium">{config.fontSize}px</span>
          </div>
          <input
            type="range"
            min="12"
            max="120"
            step="2"
            value={config.fontSize}
            onChange={(e) => updateConfig({ fontSize: Number(e.target.value) })}
            className="w-full h-2 rounded bg-white/10 outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <div>
            <label className="block text-white/70 text-xs font-medium mb-2">Color</label>
            <input
              type="color"
              value={config.fontColor}
              onChange={(e) => updateConfig({ fontColor: e.target.value })}
              className="w-10 h-8 border-none cursor-pointer rounded-md"
            />
          </div>
          <div>
            <label className="block text-white/70 text-xs font-medium mb-2">Stroke</label>
            <button
              onClick={() => updateConfig({ stroke: !config.stroke })}
              className={`px-3.5 py-1.5 rounded-md border cursor-pointer text-white text-xs ${
                config.stroke ? 'border-amber-500 bg-amber-500/15' : 'border-white/10 bg-white/5'
              }`}
            >
              {config.stroke ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Effect</label>
        <div className="flex gap-1.5">
          {EFFECTS.map((eff) => (
            <button
              key={eff}
              onClick={() => updateConfig({ effect: eff })}
              className={`flex-1 p-2 rounded-md border cursor-pointer text-white text-[11px] ${
                config.effect === eff
                  ? 'border-amber-500 bg-amber-500/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {eff}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
