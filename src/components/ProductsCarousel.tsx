'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SliderImage } from '@/lib/models/SliderImage';

interface Props {
  sliders: SliderImage[];
}

export default function ProductsCarousel({ sliders }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || sliders.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliders.length, isMounted]);

  if (sliders.length === 0) return null;

  // Hydration için placeholder - server ve client aynı render
  if (!isMounted) {
    return (
      <div className="relative w-full mb-8 overflow-hidden">
        <div className="relative w-full" style={{ height: 'clamp(280px, 35vh, 400px)', perspective: '1200px' }}>
          <div className="relative w-full h-full flex items-center justify-center">
            {sliders.map((slider, index) => (
              <div
                key={slider.Id}
                className="absolute w-[85%] md:w-[65%] lg:w-[55%] aspect-[16/9] rounded-lg md:rounded-xl overflow-hidden"
                style={{
                  transform: index === 0 ? 'translateX(0%) scale(1)' : 'translateX(0%) scale(0.6)',
                  zIndex: index === 0 ? 30 : 10,
                  opacity: index === 0 ? 1 : 0,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slider.ImageUrl}
                    alt={`Yönel Oto Yedek Parça - Görsel ${slider.Id}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    quality={85}
                    sizes="(max-width: 768px) 90vw, 75vw"
                  />
                </div>
                {index === 0 && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-bold shadow-lg">
                    1 / {sliders.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getSlideStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + sliders.length) % sliders.length);
    
    if (normalizedDiff === 0) {
      // Active slide - center
      return {
        transform: 'translateX(0%) scale(1)',
        zIndex: 30,
        opacity: 1,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === sliders.length - 1) {
      // Adjacent slides
      const isNext = normalizedDiff === 1;
      return {
        transform: `translateX(${isNext ? '80%' : '-80%'}) scale(0.8)`,
        zIndex: 20,
        opacity: 0.6,
      };
    } else {
      // Hidden slides
      return {
        transform: 'translateX(0%) scale(0.6)',
        zIndex: 10,
        opacity: 0,
      };
    }
  };

  return (
    <div className="relative w-full mb-8 overflow-hidden">
      {/* Container - Daha küçük yükseklik */}
      <div className="relative w-full" style={{ height: 'clamp(280px, 35vh, 400px)', perspective: '1200px' }}>
        <div className="relative w-full h-full flex items-center justify-center">
          {sliders.map((slider, index) => {
            const style = getSlideStyle(index);
            return (
              <div
                key={slider.Id}
                className="absolute w-[85%] md:w-[65%] lg:w-[55%] aspect-[16/9] rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-out"
                style={style}
                onClick={() => setActiveIndex(index)}
              >
              {/* Image - No Padding, Full Fill */}
              <div className="relative w-full h-full">
                <Image
                  src={slider.ImageUrl}
                  alt={`Yönel Oto Yedek Parça - Görsel ${slider.Id}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  quality={85}
                  sizes="(max-width: 768px) 90vw, 75vw"
                />
              </div>
              
              {/* Active Badge */}
              {index === activeIndex && (
                <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-bold shadow-lg">
                  {activeIndex + 1} / {sliders.length}
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

