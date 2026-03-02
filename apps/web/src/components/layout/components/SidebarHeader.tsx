import { useAdisTextAnimation } from '../hooks/useAnimations';

interface SidebarHeaderProps {
  isExpanded: boolean;
}

export function SidebarHeader({ isExpanded }: SidebarHeaderProps) {
  const adisTextRef = useAdisTextAnimation(isExpanded);

  return (
    <div className="flex flex-row items-center justify-center gap-3 px-3 py-3 border-b border-white/10">
      <img src="/logo.svg" alt="Logo" className="w-8 h-8 shrink-0 transition-all duration-300" />
      {isExpanded && (
        <span ref={adisTextRef} className="text-2xl font-bold text-white whitespace-nowrap">
          ADIS AI
        </span>
      )}
    </div>
  );
}
