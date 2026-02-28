import { useReactFlow } from '@xyflow/react';
import type { VideoGeneratorData, VideoDuration, VideoResolution } from '../../types/node-types';

type Props = {
  nodeId: string;
  data: VideoGeneratorData;
};

const DURATIONS: VideoDuration[] = ['3s', '5s', '10s'];
const RESOLUTIONS: VideoResolution[] = ['480p', '720p'];

export function VideoGeneratorPanel({ nodeId, data }: Props) {
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
          {config.mode === 'text2video' ? '📝 → 🎬 Text to Video' : '🖼️ → 🎬 Image to Video'}
          <div className="text-[11px] text-white/30 mt-1">Auto-detected from connections</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Duration</label>
        <div className="flex gap-2">
          {DURATIONS.map((dur) => (
            <button
              key={dur}
              onClick={() => updateConfig({ duration: dur })}
              className={`flex-1 p-2.5 rounded-md border cursor-pointer text-white text-[13px] ${
                config.duration === dur
                  ? 'border-blue-400 bg-blue-400/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {dur}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">Resolution</label>
        <div className="flex gap-2">
          {RESOLUTIONS.map((res) => (
            <button
              key={res}
              onClick={() => updateConfig({ resolution: res })}
              className={`flex-1 p-2.5 rounded-md border cursor-pointer text-white text-[13px] ${
                config.resolution === res
                  ? 'border-blue-400 bg-blue-400/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="block text-white/70 text-xs font-medium mb-2">FPS</label>
        <div className="flex gap-2">
          {([24, 30] as const).map((fps) => (
            <button
              key={fps}
              onClick={() => updateConfig({ fps })}
              className={`flex-1 p-2.5 rounded-md border cursor-pointer text-white text-[13px] ${
                config.fps === fps ? 'border-blue-400 bg-blue-400/15' : 'border-white/10 bg-white/5'
              }`}
            >
              {fps} fps
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
