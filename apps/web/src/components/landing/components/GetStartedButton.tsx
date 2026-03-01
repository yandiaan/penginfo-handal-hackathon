import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function GetStartedButton({
  onHoverChange,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { onHoverChange?: (hovered: boolean) => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      onHoverChange?.(true);
      gsap.to(button, {
        boxShadow: '0 0 20px rgba(255, 127, 80, 0.6), inset 0 0 20px rgba(255, 127, 80, 0.2)',
        backgroundColor: 'rgba(255, 127, 80, 0.1)',
        backdropFilter: 'blur(10px)',
        borderColor: '#ff9966',
        scale: 1.05,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
        force3D: true,
      });
    };

    const handleMouseLeave = () => {
      onHoverChange?.(false);
      gsap.to(button, {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        borderColor: '#ff7f50',
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
        force3D: true,
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="px-14 py-2 border-2 border-[#ff7f50] rounded-full text-white font-bold text-[1.1rem] cursor-pointer"
      style={{ willChange: 'transform, box-shadow, background-color, border-color' }}
      {...props}
    >
      Get Started
    </button>
  );
}
