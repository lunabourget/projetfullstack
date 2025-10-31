import React, { useEffect, useState } from 'react';

type Bat = {
  id: number;
  x: number;
  y: number;
  duration: number;
  scale: number;
  rotation: number;
};

export default function FlyingBats() {
  const [bats, setBats] = useState<Bat[]>([]);

  useEffect(() => {
    const spawnBat = () => {
      const newBat: Bat = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight / 2), // zone haute de l'écran
        duration: 5000 + Math.random() * 3000, // durée du vol
        scale: 0.8 + Math.random() * 0.6,
        rotation: Math.random() * 30 - 15, // petit angle aléatoire
      };

      setBats(prev => [...prev, newBat]);

      // Supprimer après le vol
      setTimeout(() => {
        setBats(prev => prev.filter(b => b.id !== newBat.id));
      }, newBat.duration);
    };

    // Apparition d'une chauve-souris toutes les 1 à 3 secondes
    const interval = setInterval(spawnBat, 1000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {bats.map(bat => (
        <div
          key={bat.id}
          style={{
            position: 'fixed',
            top: bat.y,
            left: -50, // départ hors de l'écran
            fontSize: `${24 * bat.scale}px`,
            transform: `rotate(${bat.rotation}deg)`,
            animation: `fly-${bat.id} ${bat.duration}ms linear forwards`,
            zIndex: 9998,
            pointerEvents: 'none',
          }}
        >
          🦇
          <style>
            {`
              @keyframes fly-${bat.id} {
                0% {
                  transform: translateX(0) rotate(${bat.rotation}deg);
                  opacity: 0.2;
                }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% {
                  transform: translateX(${window.innerWidth + 100}px) rotate(${bat.rotation}deg);
                  opacity: 0;
                }
              }
            `}
          </style>
        </div>
      ))}
    </>
  );
}
