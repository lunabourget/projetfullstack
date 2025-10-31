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
      <style>
        {`
          body { cursor: none; }

          @keyframes ghostPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.3); }
          }
        `}
      </style>

      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          pointerEvents: 'none',
          zIndex: 9999,
          fontSize: '48px',
          animation: 'ghostPulse 1.5s ease-in-out infinite', // 👈 effet "respiration"
        }}
      >
        👻
      </div>
    </>
  );
}
