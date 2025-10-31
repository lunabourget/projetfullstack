import React, { useEffect, useState } from 'react';

type Bat = {
  id: number;
  y: number;
  scale: number;
  duration: number;
  amplitude: number;
  frequency: number;
  rotation: number;
};

export default function FlyingBats() {
  const [bats, setBats] = useState<Bat[]>([]);

  useEffect(() => {
    const spawnBat = () => {
      const newBat: Bat = {
        id: Date.now(),
        y: Math.random() * (window.innerHeight / 2), // zone de vol haute
        scale: 0.7 + Math.random() * 0.7,
        duration: 5000 + Math.random() * 4000,
        amplitude: 40 + Math.random() * 60, // amplitude du zigzag
        frequency: 2 + Math.random() * 3, // vitesse du zigzag
        rotation: Math.random() * 20 - 10,
      };

      setBats(prev => [...prev, newBat]);

      // Suppression après le vol
      setTimeout(() => {
        setBats(prev => prev.filter(b => b.id !== newBat.id));
      }, newBat.duration);
    };

    // Apparition d'une chauve-souris toutes les 1 à 2 secondes
    const interval = setInterval(spawnBat, 1000 + Math.random() * 1000);
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
            left: -50,
            fontSize: `${24 * bat.scale}px`,
            zIndex: 9998,
            pointerEvents: 'none',
            animation: `fly-${bat.id} ${bat.duration}ms linear forwards`,
          }}
        >
          🦇
          <style>
            {`
              @keyframes fly-${bat.id} {
                0% {
                  transform: translate(0, 0) rotate(${bat.rotation}deg);
                  opacity: 0;
                }
                5% { opacity: 1; }
                50% {
                  transform: translate(${window.innerWidth / 2}px, ${
              bat.amplitude
            }px) rotate(${bat.rotation}deg);
                }
                100% {
                  transform: translate(${window.innerWidth + 100}px, ${
              Math.sin(bat.frequency * Math.PI) * bat.amplitude
            }px) rotate(${bat.rotation}deg);
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
