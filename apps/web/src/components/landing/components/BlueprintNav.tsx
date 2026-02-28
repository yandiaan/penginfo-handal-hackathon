import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const navItems = [
  "About Us",
  "How it works",
  "Node Based",
  "Templates",
  "Contributors"
];

export function BlueprintNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    
    gsap.set(progressRefs.current, { scaleX: 0, transformOrigin: "left" });

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      const durationPerItem = 3; 

      navItems.forEach((_, index) => {
        const nextIndex = (index + 1) % navItems.length;

        
        tl.add(() => {
          setActiveIndex(index);
          
          gsap.set(progressRefs.current[index], { scaleX: 0 });
        });

        
        tl.to(progressRefs.current[nextIndex], {
          scaleX: 1,
          duration: durationPerItem,
          ease: "none",
        });

        
        tl.set(progressRefs.current[nextIndex], { scaleX: 0 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav className="w-full" ref={containerRef}>
      <ul className="list-none p-0 m-0 flex flex-col items-start w-full space-y-4">
        {navItems.map((item, i) => {
          const isActive = activeIndex === i;
          
          return (
            <li key={i} className="relative w-fit pb-1 cursor-pointer">
              
              <span 
                className={`text-l font-['Roboto'] transition-colors duration-500 block ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`}
              >
                {item}
              </span>

              
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)] z-10" />
              )}

              
              <div 
                ref={(el) => (progressRefs.current[i] = el)}
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-600 z-0"
                style={{ scaleX: 0, transformOrigin: 'left' }}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}