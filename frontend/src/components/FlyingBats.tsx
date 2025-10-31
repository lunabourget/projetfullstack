import React, { useEffect, useState } from 'react';
import { useHalloween } from '../contexts/HalloweenContext';

type Creature = {
  id: number;
  type: 'bat' | 'owl';
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  lifespan: number;
  createdAt: number;
  falling: boolean;
};

type Grave = {
  id: number;
  x: number;
};

export default function FlyingCreatures() {
  const { isHalloweenMode } = useHalloween();
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [graves, setGraves] = useState<Grave[]>([]);

  useEffect(() => {
    if (!isHalloweenMode) {
      // Nettoyer les créatures et tombes quand le mode est désactivé
      setCreatures([]);
      setGraves([]);
      return;
    }
    const spawnCreature = () => {
      // 1 chance sur 10 d’être un hibou 🦉
      const isOwl = Math.random() < 0.1;
      const direction = Math.random() < 0.5 ? 1 : -1;

      const newCreature: Creature = {
        id: Date.now(),
        type: isOwl ? 'owl' : 'bat',
        x: direction === 1 ? -50 : window.innerWidth + 50,
        y: Math.random() * window.innerHeight * 0.6,
        vx: direction * (isOwl ? 1 : 1 + Math.random() * 2),
        vy: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 20 - 10,
        scale: isOwl ? 1.2 : 1.2 + Math.random() * 0.8, // chauves-souris plus grandes et aléatoires

        lifespan: isOwl ? 10000 + Math.random() * 3000 : 8000 + Math.random() * 4000,
        createdAt: performance.now(),
        falling: false,
      };

      setCreatures(prev => [...prev, newCreature]);
    };

    const interval = setInterval(spawnCreature, 1500 + Math.random() * 1500);
    let frame: number;

    const update = () => {
      setCreatures(prev =>
        prev
          .map(c => {
            if (c.falling) {
              // Effet de chute
              const newY = c.y + c.vy;
              const newVy = c.vy + 0.5;
              return { ...c, y: newY, vy: newVy, rotation: c.rotation + 10 };
            } else {
              // Vol aléatoire erratique
              const t = (performance.now() - c.createdAt) / 1000;
              const newY = c.y + Math.sin(t * (2 + Math.random())) * 3 + (Math.random() - 0.5) * 1.5;
              const newX = c.x + c.vx * 4;
              return { ...c, x: newX, y: newY, rotation: Math.sin(t * 5) * 15 };
            }
          })
          .filter(
            c =>
              c.y < window.innerHeight + 100 &&
              c.x > -150 &&
              c.x < window.innerWidth + 150 &&
              performance.now() - c.createdAt < c.lifespan
          )
      );

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(frame);
    };
  }, [isHalloweenMode]);

  const handleClick = (id: number, x: number, type: 'bat' | 'owl') => {
    if (type === 'bat') {
      // Chauve-souris “meurt” et tombe
      setCreatures(prev =>
        prev.map(c => (c.id === id ? { ...c, falling: true, vy: 2 } : c))
      );

      // Apparition d'une pierre tombale après la chute
      setTimeout(() => {
        setGraves(prev => [...prev, { id: Date.now(), x }]);
      }, 1200);
    } else if (type === 'owl') {
      // Le hibou fait disparaître toutes les tombes 🪦
      setGraves([]);
    }
  };

  return (
    <>
      {creatures.map(c => (
        <div
          key={c.id}
          onClick={() => handleClick(c.id, c.x, c.type)}
          style={{
            position: 'fixed',
            left: c.x,
            top: c.y,
            fontSize: `${34 * c.scale}px`,
            transform: `rotate(${c.rotation}deg)`,
            transition: c.falling ? 'none' : 'transform 0.1s linear',
            pointerEvents: 'auto',
            zIndex: 9998,
            cursor: 'pointer',
            userSelect: 'none',
            filter: c.type === 'owl' ? 'brightness(1.5)' : 'none',
          }}
        >
          {c.type === 'owl' ? '🦉' : '🦇'}
        </div>
      ))}

      {graves.map(g => (
        <div
          key={g.id}
          style={{
            position: 'fixed',
            bottom: 0,
            left: g.x,
            fontSize: '32px',
            transform: 'translateX(-50%)',
            opacity: 0.9,
            pointerEvents: 'none',
            zIndex: 9997,
            animation: 'popIn 0.3s ease-out',
          }}
        >
          🪦
        </div>
      ))}

      <style>
        {`
          @keyframes popIn {
            0% { transform: translateX(-50%) scale(0); opacity: 0; }
            100% { transform: translateX(-50%) scale(1); opacity: 1; }
          }
        `}
      </style>
    </>
  );
}
