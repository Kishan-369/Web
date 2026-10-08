import React, { useEffect, useRef } from 'react';

interface Props {
  type: 'zen' | 'chaos';
  intensity: number; // 0 to 100
  className?: string;
}

export const RhythmWaveVisualizer: React.FC<Props> = ({
  type,
  intensity,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intensityRef = useRef(intensity);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 220);
    let height = (canvas.height = 36);

    let animId: number;
    let phase = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      const currentIntensity = intensityRef.current;

      ctx.clearRect(0, 0, width, height);

      const midY = height / 2;

      ctx.beginPath();
      ctx.lineWidth = 1.8;

      if (type === 'zen') {
        // Serene, smooth harmonic Alpha/Theta wave with breathing amplitude modulation
        phase += 0.045;
        const breath = 0.7 + 0.3 * Math.sin(phase * 0.4);
        const amp = (height * 0.28) * breath;

        ctx.strokeStyle = '#34d399';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 6;

        for (let x = 0; x <= width; x += 2) {
          const progress = x / width;
          // Harmonic dual sine for organic feel
          const y =
            midY +
            Math.sin(progress * 12 + phase) * amp * 0.8 +
            Math.sin(progress * 24 + phase * 1.5) * amp * 0.25;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else {
        // Spiky, erratic, jittery Gamma wave that reacts to chaos intensity
        const speed = 0.08 + (currentIntensity / 100) * 0.16;
        phase += speed;
        const chaosFactor = Math.max(0.2, currentIntensity / 100);

        ctx.strokeStyle = '#f87171';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 8;

        for (let x = 0; x <= width; x += 2) {
          const progress = x / width;
          // Rapid spikes and random glitch jerks
          const spikeJitter = Math.sin(progress * 42 + phase * 2.5);
          const isSpike = Math.sin(progress * 14 + phase) > 0.82;
          const spikeHeight = isSpike ? (Math.random() - 0.5) * height * 0.85 * chaosFactor : 0;
          const y = midY + spikeJitter * (height * 0.22) * chaosFactor + spikeHeight;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 220;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [type]);

  return (
    <div className={`w-full h-9 rounded-lg bg-black/40 border border-white/10 px-2 py-0.5 flex items-center justify-between overflow-hidden relative ${className}`}>
      <span className="text-[9px] font-mono tracking-wider font-bold shrink-0 uppercase select-none opacity-80 z-10">
        {type === 'zen' ? (
          <span className="text-emerald-400">Alpha Wave • 10Hz</span>
        ) : (
          <span className="text-red-400">Gamma Spike • 45Hz</span>
        )}
      </span>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
