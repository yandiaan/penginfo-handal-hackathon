import type { NodeProps } from '@xyflow/react';
import { CompactNode } from '../CompactNode';
import type { ImageUploadData } from '../../types/node-types';

export function ImageUploadNode({ data, selected }: NodeProps<ImageUploadData>) {
  const { config } = data;
  const hasImage = config.previewUrl !== null;

  return (
    <CompactNode
      nodeType="imageUpload"
      icon="🖼️"
      title={data.label}
      subtitle={hasImage ? `${config.fileName} (${config.fileSizeMB?.toFixed(1)}MB)` : undefined}
      selected={selected}
    >
      {hasImage ? (
        <img
          src={config.previewUrl!}
          alt="Upload preview"
          className="w-full h-[60px] object-cover rounded-md"
        />
      ) : (
        <div className="text-white/30 text-[11px] text-center py-3 border border-dashed border-white/20 rounded-md">
          Drop image here
        </div>
      )}
    </CompactNode>
  );
}
