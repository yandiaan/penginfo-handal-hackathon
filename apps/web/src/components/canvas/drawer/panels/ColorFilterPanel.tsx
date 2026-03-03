import { useReactFlow } from '@xyflow/react';
import type { ColorFilterData, ColorFilterPreset } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: ColorFilterData;
};

const PRESETS: { value: ColorFilterPreset; label: string; icon: string; desc: string }[] = [
  { value: 'none', label: 'None', icon: '⬜', desc: 'No filter applied' },
  { value: 'warm', label: 'Warm', icon: '🌅', desc: 'Golden-hour warm tones' },
  { value: 'vintage', label: 'Vintage', icon: '📸', desc: 'Aged, faded look' },
  { value: 'eid-gold', label: 'Eid Gold', icon: '✨', desc: 'Festive golden palette' },
  { value: 'sahur', label: 'Sahur', icon: '🌙', desc: 'Cool pre-dawn blue tones' },
  { value: 'cool', label: 'Cool', icon: '❄️', desc: 'Fresh cold-tone grading' },
  { value: 'vibrant', label: 'Vibrant', icon: '🌈', desc: 'Boosted saturation & contrast' },
];

export function ColorFilterPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Filter Preset</label>
        <div className="grid grid-cols-2 gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => updateConfig({ preset: preset.value })}
              className={`motion-lift motion-press focus-ring-orange flex items-center gap-2 py-2.5 px-3 rounded-xl border text-white cursor-pointer text-xs text-left transition-colors ${
                config.preset === preset.value
                  ? 'border-[var(--editor-accent-65)] bg-[var(--editor-accent-14)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              <span className="text-base">{preset.icon}</span>
              <div>
                <div className="font-medium">{preset.label}</div>
                <div className="text-[10px] text-white/40">{preset.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {config.preset !== 'none' && (
        <div className="flex flex-col gap-3">
          <label className="block text-white/70 text-xs font-medium mb-2">
            Intensity — <span className="text-white/50">{config.intensity}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={config.intensity}
            onChange={(e) => updateConfig({ intensity: Number(e.target.value) })}
            className="w-full accent-[var(--editor-accent)] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-white/30">
            <span>Subtle</span>
            <span>Full</span>
          </div>
        </div>
      )}
    </>
  );
}
