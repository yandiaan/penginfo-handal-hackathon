import { useRef, useEffect, useCallback } from 'react';

export const useCarousel = (itemCount: number, onIndexChange: (index: number) => void) => {
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  const startAutoPlay = useCallback(() => {
    if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    autoPlayIntervalRef.current = setInterval(() => {
      const next = (currentIndexRef.current + 1) % itemCount;
      currentIndexRef.current = next;
      onIndexChange(next);
    }, 4000);
  }, [itemCount, onIndexChange]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  }, []);

  const handleNavigation = useCallback(
    (newIndex: number) => {
      currentIndexRef.current = newIndex;
      onIndexChange(newIndex);
      stopAutoPlay();
      startAutoPlay();
    },
    [onIndexChange, stopAutoPlay, startAutoPlay],
  );

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  return { handleNavigation, stopAutoPlay, startAutoPlay, autoPlayIntervalRef };
};

export const useCarouselDelay = (isExpanded: boolean, onShowChange: (show: boolean) => void) => {
  const carouselTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isExpanded) {
      carouselTimeoutRef.current = setTimeout(() => {
        onShowChange(true);
      }, 300);
    } else {
      if (carouselTimeoutRef.current) {
        clearTimeout(carouselTimeoutRef.current);
      }
      onShowChange(false);
    }

    return () => {
      if (carouselTimeoutRef.current) {
        clearTimeout(carouselTimeoutRef.current);
      }
    };
  }, [isExpanded, onShowChange]);
};
