import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* Masque le curseur natif */}
      <style>{`body { cursor: none; }`}</style>

      {/* Ton icône ou SVG */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.05s linear',
        }}
      >
        {/* Exemple avec une icône textuelle */}
        👻
        {/* ou bien : <img src="/icon.svg" width={24} height={24} alt="cursor" /> */}
      </div>
    </>
  );
}
