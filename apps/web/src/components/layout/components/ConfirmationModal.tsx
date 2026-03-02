import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useModalAnimation, useModalButtonsHover } from '../hooks/useAnimations';
import type { PipelineTemplate } from '../../canvas/templates';

interface ConfirmationModalProps {
  isOpen: boolean;
  pendingAction: { type: 'template' | 'new-workflow'; template?: PipelineTemplate } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isOpen,
  pendingAction,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const backdropRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);
  const cardRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);

  useModalAnimation(isOpen, backdropRef, cardRef);
  useModalButtonsHover(isOpen);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
    >
      <div
        ref={cardRef}
        className="bg-background border border-white/20 rounded-lg p-6 max-w-sm mx-4 shadow-2xl"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
            <h2 className="text-lg font-semibold text-white">Switch Workflow?</h2>
          </div>
          <button onClick={onCancel} className="text-white/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-white/70 mb-6">
          {pendingAction?.type === 'new-workflow'
            ? 'Create a new blank workflow? Your current workflow will be cleared.'
            : `Load "${pendingAction?.template?.name}"? Your current workflow will be replaced.`}
        </p>

        <div className="flex gap-3">
          <button
            data-modal-button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            data-modal-button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition-colors text-sm font-medium"
          >
            {pendingAction?.type === 'new-workflow' ? 'Create Blank' : 'Load Template'}
          </button>
        </div>
      </div>
    </div>
  );
}
