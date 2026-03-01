import { useState } from 'react';
import LandingPanel from './landing/LandingPanel';
import FlowCanvas from '@/components/canvas';

export default function LandingCanvasWrapper() {
  const [showLanding, setShowLanding] = useState(true);

  return showLanding ? (
    <LandingPanel onHideLanding={() => setShowLanding(false)} />
  ) : (
    <div className="fixed inset-0 overflow-hidden">
      <FlowCanvas />
    </div>
  );
}
