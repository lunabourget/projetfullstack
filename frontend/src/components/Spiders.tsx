import React, { useEffect, useState } from 'react';
import { useHalloween } from '../contexts/HalloweenContext';

type Spider = {
  id: number;
  x: number;
  y: number;
  speed: number;
  swingPhase: number; // pour le balancement
  swingAmplitude: number; // amplitude du balancement
};

export default function Spiders() {
  const { isHalloweenMode } = useHalloween();
  const [spiders, setSpiders] = useState<Spider[]>([]);

  useEffect(() => {
    if (!isHalloweenMode) {
      // Nettoyer les araignées quand le mode est désactivé
      setSpiders([]);
      return;
    }
    const spawnSpider = () => {
      if (spiders.length >= 3) return; // max 3 araignées

      const newSpider: Spider = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: 0,
        speed: 0.3 + Math.random() * 0.3,
        swingPhase: Math.random() * Math.PI * 2,
        swingAmplitude: 10 + Math.random() * 15, // px
      };

      setSpiders(prev => [...prev, newSpider]);
    };

    // Apparition rare : toutes les 6 à 12 secondes
    const interval = setInterval(spawnSpider, 6000 + Math.random() * 6000);

    let frame: number;

    const update = () => {
      setSpiders(prev =>
        prev
          .map(sp => ({
            ...sp,
            y: sp.y + sp.speed * 2,
            swingPhase: sp.swingPhase + 0.05, // évolution du balancement
          }))
          .filter(sp => sp.y < window.innerHeight + 50)
      );

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(frame);
    };
  }, [spiders.length, isHalloweenMode]);

  return (
    <>
      {spiders.map(sp => {
        const swingX = Math.sin(sp.swingPhase) * sp.swingAmplitude;

        return (
          <div
            key={sp.id}
            style={{
              position: 'fixed',
              left: sp.x + swingX,
              top: sp.y,
              zIndex: 9999,
              pointerEvents: 'none',
            }}
          >
            {/* Fil scintillant */}
            <div
              style={{
                position: 'absolute',
                top: -sp.y,
                left: '50%',
                width: '2px',
                height: sp.y,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.1))',
                transform: 'translateX(-50%)',
                zIndex: -1,
              }}
            ></div>

            {/* Araignée */}
            <span style={{ fontSize: '32px', transform: 'translateX(-50%)' }}>🕷️</span>
          </div>
        );
      })}
    </>
  );
}
