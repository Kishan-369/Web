import React, { useEffect, useRef } from 'react';

interface Props {
  chaosLevel: number; // 0 to 100
  className?: string;
}

interface ZenParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  pulsePhase: number;
  maxAlpha: number;
}

interface ChaosSpark {
  x: number;
  y: number;
  length: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  jitter: number;
}

export const ChaosAtmosphereCanvas: React.FC<Props> = ({
  chaosLevel,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chaosRef = useRef(chaosLevel);

  useEffect(() => {
    chaosRef.current = chaosLevel;
  }, [chaosLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Zen particles (left side)
    const zenCount = 38;
    const zenParticles: ZenParticle[] = [];
    for (let i = 0; i < zenCount; i++) {
      zenParticles.push({
        x: Math.random() * (width * 0.52),
        y: Math.random() * height,
        radius: 1.5 + Math.random() * 3.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.45, // Slow upward drift
        alpha: 0.1 + Math.random() * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        maxAlpha: 0.4 + Math.random() * 0.45,
      });
    }

    // Chaos sparks (right side)
    const chaosCount = 45;
    const chaosSparks: ChaosSpark[] = [];
    const chaosColors = ['#ef4444', '#f87171', '#fb7185', '#dc2626', '#f43f5e', '#ffffff'];
    for (let i = 0; i < chaosCount; i++) {
      chaosSparks.push({
        x: width * 0.48 + Math.random() * (width * 0.52),
        y: Math.random() * height,
        length: 6 + Math.random() * 16,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 2.2,
        alpha: 0.2 + Math.random() * 0.7,
        color: chaosColors[Math.floor(Math.random() * chaosColors.length)],
        jitter: Math.random() * 4,
      });
    }

    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.02;

      ctx.clearRect(0, 0, width, height);

      const currentChaos = chaosRef.current;
      const zenWeight = Math.max(0.1, (100 - currentChaos) / 100);
      const chaosWeight = Math.max(0.1, currentChaos / 100);

      // 1. Draw Zen Bioluminescent Spores (Left half)
      ctx.save();
      for (let i = 0; i < zenParticles.length; i++) {
        const p = zenParticles[i];
        p.x += p.vx + Math.sin(time + p.pulsePhase) * 0.3;
        p.y += p.vy;

        // Wrap around
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * (width * 0.52);
        }
        if (p.x < -10) p.x = width * 0.5;
        if (p.x > width * 0.52) p.x = 0;

        const currentAlpha = (0.25 + 0.25 * Math.sin(time * 2 + p.pulsePhase)) * p.maxAlpha * zenWeight;

        // Soft radial glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
        grad.addColorStop(0, `rgba(52, 211, 153, ${currentAlpha})`);
        grad.addColorStop(0.4, `rgba(16, 185, 129, ${currentAlpha * 0.5})`);
        grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Bright nucleus
        ctx.fillStyle = `rgba(167, 243, 208, ${currentAlpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 2. Draw Digital Chaos Spark Field (Right half)
      ctx.save();
      const speedMult = 0.5 + chaosWeight * 2.5;

      for (let i = 0; i < chaosSparks.length; i++) {
        const s = chaosSparks[i];
        // Jittery velocity
        s.x += s.vx * speedMult + (Math.random() - 0.5) * s.jitter * chaosWeight;
        s.y += s.vy * speedMult + (Math.random() - 0.5) * s.jitter * chaosWeight;

        // Wrap around right zone
        if (s.x < width * 0.46) s.x = width;
        if (s.x > width + 20) s.x = width * 0.48;
        if (s.y < -20) s.y = height + 10;
        if (s.y > height + 20) s.y = -10;

        const sparkAlpha = s.alpha * chaosWeight;

        // Draw dynamic lightning spark stroke
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = sparkAlpha;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);

        // Direction vector with glitch bend
        const angle = Math.atan2(s.vy, s.vx);
        const endX = s.x + Math.cos(angle) * s.length;
        const endY = s.y + Math.sin(angle) * s.length;

        if (chaosWeight > 0.6 && Math.random() < 0.2) {
          // Micro-electric zigzag arc
          const midX = (s.x + endX) / 2 + (Math.random() - 0.5) * 6;
          const midY = (s.y + endY) / 2 + (Math.random() - 0.5) * 6;
          ctx.lineTo(midX, midY);
        }
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Tip glow
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(endX, endY, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};
