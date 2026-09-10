import React, { useEffect, useRef } from 'react';

interface Props {
  activePulse: boolean;
}

export const NeuralBrainCanvas: React.FC<Props> = ({ activePulse }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate Neural Nodes forming a stylized Brain outline
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      activation: number;
      isCore: boolean;
    }

    const nodes: Node[] = [];
    const nodeCount = 70;

    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < nodeCount; i++) {
      // Shape points like brain lobes
      const angle = Math.random() * Math.PI * 2;
      const distRatio = Math.random();
      const rX = (150 + Math.random() * 80) * (distRatio < 0.5 ? 1.2 : 0.8);
      const rY = 120 + Math.random() * 80;

      const x = centerX + Math.cos(angle) * rX;
      const y = centerY + Math.sin(angle) * rY - 20;

      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 2 + Math.random() * 3,
        activation: 0,
        isCore: i < 15, // Nucleus accumbens reward center
      });
    }

    let pulses: { from: Node; to: Node; progress: number; color: string }[] = [];

    const triggerPulseBatch = () => {
      for (let i = 0; i < 12; i++) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        const toIdx = Math.floor(Math.random() * nodes.length);
        if (fromIdx !== toIdx) {
          pulses.push({
            from: nodes[fromIdx],
            to: nodes[toIdx],
            progress: 0,
            color: Math.random() > 0.5 ? '#E50914' : '#00D9FF',
          });
        }
      }
    };

    if (activePulse) {
      triggerPulseBatch();
    }

    let animationFrameId: number;

    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Draw Neural Connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move nodes slightly
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        if (Math.abs(nodeA.x - centerX) > 280) nodeA.vx *= -1;
        if (Math.abs(nodeA.y - centerY) > 220) nodeA.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = nodeA.isCore || nodeB.isCore ? 'rgba(229, 9, 20, 0.25)' : 'rgba(0, 217, 255, 0.15)';
            ctx.lineWidth = nodeA.isCore || nodeB.isCore ? 1.5 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw Pulses moving along neurons
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += 0.03;

        const currX = p.from.x + (p.to.x - p.from.x) * p.progress;
        const currY = p.from.y + (p.to.y - p.from.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.progress >= 1) {
          p.to.activation = 1;
          pulses.splice(i, 1);
        }
      }

      // Draw Nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (node.activation > 0 ? 3 : 0), 0, Math.PI * 2);

        if (node.isCore) {
          ctx.fillStyle = '#E50914';
          ctx.shadowColor = '#E50914';
          ctx.shadowBlur = 15;
        } else {
          ctx.fillStyle = node.activation > 0 ? '#00D9FF' : 'rgba(255, 255, 255, 0.6)';
          ctx.shadowColor = '#00D9FF';
          ctx.shadowBlur = node.activation > 0 ? 10 : 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        if (node.activation > 0) {
          node.activation -= 0.02;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activePulse]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 pointer-events-none" />;
};
