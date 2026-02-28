import { useReactFlow } from '@xyflow/react';
import type { ExportData, ExportFormat, ShareTarget } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: ExportData;
};

const FORMATS: ExportFormat[] = ['png', 'jpg', 'webp', 'mp4', 'gif'];
const SHARE_TARGETS: { value: ShareTarget; icon: string; label: string }[] = [
  { value: 'download', icon: '💾', label: 'Download' },
  { value: 'whatsapp', icon: '💬', label: 'WhatsApp' },
  { value: 'clipboard', icon: '📋', label: 'Clipboard' },
];

export function ExportPanelNew({ nodeId, data }: Props) {
  const { updateNodeData } = useReactFlow();
  const config = data.config;

  const updateConfig = (updates: Partial<typeof config>) => {
    updateNodeData(nodeId, { config: { ...config, ...updates } });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Format</label>
        <div className="flex gap-1.5">
          {FORMATS.map((fmt) => (
            <button
              key={fmt}
              onClick={() => updateConfig({ format: fmt })}
              className={`flex-1 px-1 py-2 rounded-md border cursor-pointer text-white text-xs ${
                config.format === fmt
                  ? 'border-red-400 bg-red-400/15 font-semibold'
                  : 'border-white/10 bg-white/5 font-normal'
              }`}
            >
              .{fmt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <div className="flex justify-between items-center">
            <label className="block text-white/70 text-xs font-medium mb-2">Quality</label>
            <span className="text-white/60 text-[13px] font-medium">{config.quality}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={config.quality}
            onChange={(e) => updateConfig({ quality: Number(e.target.value) })}
            className="w-full h-2 rounded bg-white/10 outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Share Target</label>
        <div className="flex gap-2">
          {SHARE_TARGETS.map((target) => (
            <button
              key={target.value}
              onClick={() => updateConfig({ shareTarget: target.value })}
              className={`flex-1 px-1 py-2 rounded-md border cursor-pointer text-white text-xs text-center ${
                config.shareTarget === target.value
                  ? 'border-red-400 bg-red-400/15 font-semibold'
                  : 'border-white/10 bg-white/5 font-normal'
              }`}
            >
              <div className="text-xl mb-1">{target.icon}</div>
              {target.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
