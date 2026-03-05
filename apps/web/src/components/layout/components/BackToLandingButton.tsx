import { LogOut } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../../ui/tooltip';

interface BackToLandingButtonProps {
  onClick?: () => void;
}

export function BackToLandingButton({ onClick }: BackToLandingButtonProps) {
  return (
    <div className="mt-auto px-3 py-3 flex justify-center border-t border-white/10">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-white"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Back to Landing Page</TooltipContent>
      </Tooltip>
    </div>
  );
}
