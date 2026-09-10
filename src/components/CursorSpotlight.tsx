import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-30 transition-transform duration-75 ease-out opacity-40 hidden md:block"
      style={{
        left: 0,
        top: 0,
        width: '500px',
        height: '500px',
        transform: `translate3d(${pos.x - 250}px, ${pos.y - 250}px, 0)`,
        background: 'radial-gradient(circle, rgba(229,9,20,0.08) 0%, rgba(0,217,255,0.04) 40%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
};
