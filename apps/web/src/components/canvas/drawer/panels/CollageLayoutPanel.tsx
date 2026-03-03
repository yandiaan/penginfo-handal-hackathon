import { useReactFlow } from '@xyflow/react';
import type { CollageLayoutData, CollageLayoutStyle } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: CollageLayoutData;
};

const LAYOUTS: { value: CollageLayoutStyle; label: string; icon: string; desc: string }[] = [
  { value: '2-horizontal', label: 'Side-by-side', icon: '⬛⬛', desc: '2 images left / right' },
  { value: '2-vertical', label: 'Stacked', icon: '🔲', desc: '2 images top / bottom' },
  { value: '3-grid', label: '3 Grid', icon: '🔳', desc: '1 large + 2 small' },
  { value: '4-grid', label: '4 Grid', icon: '⬛⬛\n⬛⬛', desc: '4 equal quadrants' },
  { value: 'mosaic', label: 'Mosaic', icon: '🧩', desc: 'Varied-size mosaic' },
];

export function CollageLayoutPanel({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Layout</label>
        <div className="flex flex-col gap-1.5">
          {LAYOUTS.map((layout) => (
            <button
              key={layout.value}
              onClick={() => updateConfig({ layout: layout.value })}
              className={`motion-lift motion-press focus-ring-orange flex items-center gap-3 py-2.5 px-3 rounded-xl border text-white cursor-pointer text-xs text-left transition-colors ${
                config.layout === layout.value
                  ? 'border-[var(--editor-accent-65)] bg-[var(--editor-accent-14)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/7'
              }`}
            >
              <span className="text-lg flex-shrink-0 font-emoji">{layout.icon}</span>
              <div>
                <div className="font-medium">{layout.label}</div>
                <div className="text-white/40 text-[11px]">{layout.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">
          Gap — <span className="text-white/50">{config.gap}px</span>
        </label>
        <input
          type="range"
          min={0}
          max={32}
          step={2}
          value={config.gap}
          onChange={(e) => updateConfig({ gap: Number(e.target.value) })}
          className="w-full accent-[var(--editor-accent)] cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">
          Border Radius — <span className="text-white/50">{config.borderRadius}px</span>
        </label>
        <input
          type="range"
          min={0}
          max={32}
          step={2}
          value={config.borderRadius}
          onChange={(e) => updateConfig({ borderRadius: Number(e.target.value) })}
          className="w-full accent-[var(--editor-accent)] cursor-pointer"
        />
      </div>

      <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-300/80 text-xs">
        <div className="font-medium mb-1">⊞ V2 Feature</div>
        <div className="text-amber-300/60">
          Connect two Image nodes (Image A + Image B inputs) to create a collage.
        </div>
      </div>
    </>
  );
}
