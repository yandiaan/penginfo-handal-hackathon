import { useReactFlow } from '@xyflow/react';
import type { FrameBorderData, FrameStyle } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: FrameBorderData;
};

const FRAME_STYLES: { value: FrameStyle; label: string; icon: string }[] = [
  { value: 'none', label: 'None', icon: '⬜' },
  { value: 'islamic', label: 'Islamic', icon: '🌙' },
  { value: 'floral', label: 'Floral', icon: '🌸' },
  { value: 'polaroid', label: 'Polaroid', icon: '📷' },
  { value: 'neon', label: 'Neon', icon: '💜' },
  { value: 'torn-paper', label: 'Torn Paper', icon: '📄' },
];

export function FrameBorderPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Frame Style</label>
        <div className="grid grid-cols-3 gap-1.5">
          {FRAME_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => updateConfig({ style: style.value })}
              className={`motion-lift motion-press focus-ring-orange py-2.5 px-2 rounded-xl border text-white cursor-pointer text-xs text-center transition-colors ${
                config.style === style.value
                  ? 'border-[var(--editor-accent-65)] bg-[var(--editor-accent-14)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              <div className="text-base">{style.icon}</div>
              <div className="mt-1 text-[10px]">{style.label}</div>
            </button>
          ))}
        </div>
      </div>

      {config.style !== 'none' && (
        <>
          <div className="flex flex-col gap-3">
            <label className="block text-white/70 text-xs font-medium mb-2">
              Thickness — <span className="text-white/50">{config.thickness}px</span>
            </label>
            <input
              type="range"
              min={4}
              max={60}
              step={4}
              value={config.thickness}
              onChange={(e) => updateConfig({ thickness: Number(e.target.value) })}
              className="w-full accent-[var(--editor-accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/30">
              <span>Thin</span>
              <span>Thick</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="block text-white/70 text-xs font-medium mb-2">Frame Color</label>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
              <input
                type="color"
                value={config.color}
                onChange={(e) => updateConfig({ color: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border border-white/20"
                style={{ padding: 2 }}
              />
              <span className="font-mono text-white/60 text-sm">{config.color}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
