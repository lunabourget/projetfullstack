import React, { useEffect, useState } from 'react';

type Bat = {
  id: number;
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

export default function FlyingBats() {
  const [bats, setBats] = useState<Bat[]>([]);
  const [graves, setGraves] = useState<Grave[]>([]);

  useEffect(() => {
    const spawnBat = () => {
      const direction = Math.random() < 0.5 ? 1 : -1;
      const newBat: Bat = {
        id: Date.now(),
        x: direction === 1 ? -50 : window.innerWidth + 50,
        y: Math.random() * window.innerHeight * 0.6,
        vx: direction * (1 + Math.random() * 2),
        vy: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 20 - 10,
        scale: 0.7 + Math.random() * 0.6,
        lifespan: 8000 + Math.random() * 4000,
        createdAt: performance.now(),
        falling: false,
      };
      setBats(prev => [...prev, newBat]);
    };

    const interval = setInterval(spawnBat, 1500 + Math.random() * 1500);
    let frame: number;

    const update = () => {
      setBats(prev =>
        prev
          .map(b => {
            if (b.falling) {
              const newY = b.y + b.vy;
              const newVy = b.vy + 0.5; // gravité
              return { ...b, y: newY, vy: newVy, rotation: b.rotation + 10 };
            } else {
              const t = (performance.now() - b.createdAt) / 1000;
              const newY = b.y + Math.sin(t * (2 + Math.random())) * 3 + (Math.random() - 0.5) * 1.5;
              const newX = b.x + b.vx * 4;
              return { ...b, x: newX, y: newY, rotation: Math.sin(t * 5) * 15 };
            }
          })
          .filter(
            b =>
              b.y < window.innerHeight + 100 &&
              b.x > -150 &&
              b.x < window.innerWidth + 150 &&
              performance.now() - b.createdAt < b.lifespan
          )
      );

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(frame);
    };
  }, []);

  const handleClick = (id: number, x: number) => {
    // Chauve-souris "meurt" et tombe
    setBats(prev =>
      prev.map(b => (b.id === id ? { ...b, falling: true, vy: 2 } : b))
    );

    // Tombe -> apparition d'une croix en bas
    setTimeout(() => {
      setGraves(prev => [...prev, { id: Date.now(), x }]);
    }, 1200);
  };

  return (
    <>
      {bats.map(b => (
        <div
          key={b.id}
          onClick={() => handleClick(b.id, b.x)}
          style={{
            position: 'fixed',
            left: b.x,
            top: b.y,
            fontSize: `${24 * b.scale}px`,
            transform: `rotate(${b.rotation}deg)`,
            transition: b.falling ? 'none' : 'transform 0.1s linear',
            pointerEvents: 'auto',
            zIndex: 9998,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          🦇
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
          }}
        >
          ⚰️
        </div>
      ))}
    </>
  );
}
