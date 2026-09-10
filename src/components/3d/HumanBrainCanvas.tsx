import React, { useEffect, useRef } from "react";

export interface FlyingTrigger {
  id: string;
  text: string;
  icon: string;
  startX: number;
  startY: number;
  progress: number;
  speed: number;
  color: string;
}

interface HumanBrainCanvasProps {
  activePulse: boolean;
  incomingTrigger?: { text: string; icon: string } | null;
  onImpact?: (text: string) => void;
  scrollProgress?: number;
}

type Point = {
  x: number;
  y: number;
};

export const HumanBrainCanvas: React.FC<HumanBrainCanvasProps> = ({
  activePulse,
  incomingTrigger,
  onImpact,
  scrollProgress = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const flyingTriggersRef = useRef<FlyingTrigger[]>([]);
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  const impactRef = useRef({
    strength: 0,
    x: 0,
    y: 0,
  });

  // ------------------------------------------------------------
  // Incoming notification trigger
  // ------------------------------------------------------------
  useEffect(() => {
    if (!incomingTrigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;

    const side = Math.random() > 0.5 ? "left" : "right";

    flyingTriggersRef.current.push({
      id: Math.random().toString(36).substring(2),
      text: incomingTrigger.text,
      icon: incomingTrigger.icon,

      startX: side === "left" ? 40 : w - 40,
      startY: h * (0.2 + Math.random() * 0.4),

      progress: 0,
      speed: 0.008,

      color:
        [
          "#00F0FF",
          "#29B6F6",
          "#7C4DFF",
          "#00E5FF",
          "#18FFFF",
        ][Math.floor(Math.random() * 5)],
    });
  }, [incomingTrigger]);

  // ------------------------------------------------------------
  // MAIN CANVAS
  // ------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    let animationFrame = 0;
    let time = 0;

    // ============================================================
    // Resize
    // ============================================================

    const resize = () => {
      const parent = canvas.parentElement;

      width = canvas.width =
        parent?.clientWidth || window.innerWidth;

      height = canvas.height =
        parent?.clientHeight || window.innerHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    // ============================================================
    // Brain Path
    // Reference-image inspired human brain side profile
    // ============================================================

    const createBrainPath = (
      cx: number,
      cy: number,
      scale: number
    ) => {
      const p = new Path2D();

      p.moveTo(cx - 185 * scale, cy + 10 * scale);

      // Front forehead
      p.bezierCurveTo(
        cx - 205 * scale,
        cy - 25 * scale,
        cx - 195 * scale,
        cy - 80 * scale,
        cx - 160 * scale,
        cy - 105 * scale
      );

      // Upper frontal
      p.bezierCurveTo(
        cx - 145 * scale,
        cy - 145 * scale,
        cx - 95 * scale,
        cy - 160 * scale,
        cx - 55 * scale,
        cy - 150 * scale
      );

      // Top middle
      p.bezierCurveTo(
        cx - 15 * scale,
        cy - 175 * scale,
        cx + 45 * scale,
        cy - 165 * scale,
        cx + 70 * scale,
        cy - 145 * scale
      );

      // Upper back
      p.bezierCurveTo(
        cx + 120 * scale,
        cy - 150 * scale,
        cx + 175 * scale,
        cy - 120 * scale,
        cx + 190 * scale,
        cy - 75 * scale
      );

      // Occipital rear
      p.bezierCurveTo(
        cx + 220 * scale,
        cy - 45 * scale,
        cx + 215 * scale,
        cy + 10 * scale,
        cx + 195 * scale,
        cy + 35 * scale
      );

      // Rear lower brain
      p.bezierCurveTo(
        cx + 185 * scale,
        cy + 70 * scale,
        cx + 145 * scale,
        cy + 90 * scale,
        cx + 105 * scale,
        cy + 88 * scale
      );

      // Cerebellum
      p.bezierCurveTo(
        cx + 100 * scale,
        cy + 125 * scale,
        cx + 60 * scale,
        cy + 145 * scale,
        cx + 25 * scale,
        cy + 125 * scale
      );

      // Brain stem
      p.bezierCurveTo(
        cx + 15 * scale,
        cy + 150 * scale,
        cx + 15 * scale,
        cy + 180 * scale,
        cx - 5 * scale,
        cy + 190 * scale
      );

      p.bezierCurveTo(
        cx - 25 * scale,
        cy + 175 * scale,
        cx - 30 * scale,
        cy + 145 * scale,
        cx - 40 * scale,
        cy + 120 * scale
      );

      // Temporal lower area
      p.bezierCurveTo(
        cx - 85 * scale,
        cy + 120 * scale,
        cx - 125 * scale,
        cy + 90 * scale,
        cx - 140 * scale,
        cy + 55 * scale
      );

      p.bezierCurveTo(
        cx - 170 * scale,
        cy + 50 * scale,
        cx - 190 * scale,
        cy + 30 * scale,
        cx - 185 * scale,
        cy + 10 * scale
      );

      p.closePath();

      return p;
    };

    // ============================================================
    // Generate dense circuit / sulci paths
    // ============================================================

    const circuitLines: Point[][] = [];

    const generateCircuitLines = () => {
      circuitLines.length = 0;

      for (let i = 0; i < 125; i++) {
        const points: Point[] = [];

        let x = -165 + Math.random() * 330;
        let y = -125 + Math.random() * 230;

        const segments = 5 + Math.floor(Math.random() * 8);

        for (let j = 0; j < segments; j++) {
          points.push({ x, y });

          // Circuit-like angular turns
          if (Math.random() > 0.5) {
            x += (Math.random() - 0.5) * 42;
          } else {
            y += (Math.random() - 0.5) * 35;
          }
        }

        circuitLines.push(points);
      }
    };

    generateCircuitLines();

    // ============================================================
    // Glowing activation nodes
    // ============================================================

    const glowNodes = Array.from({ length: 14 }).map(() => ({
      x: -145 + Math.random() * 300,
      y: -110 + Math.random() * 210,
      size: 2 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
    }));

    // ============================================================
    // Render
    // ============================================================

    const render = () => {
      time += 0.018;

      ctx.clearRect(0, 0, width, height);

      const sp = Math.max(0, Math.min(1, scrollProgressRef.current || 0));
      const currentBrainOpacity = Math.max(0, 1 - sp * 1.2);

      if (currentBrainOpacity <= 0.005) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.globalAlpha = currentBrainOpacity;

      // ----------------------------------------------------------
      // Background
      // ----------------------------------------------------------

      const bg = ctx.createLinearGradient(
        0,
        0,
        width,
        height
      );

      bg.addColorStop(0, "#29136f");
      bg.addColorStop(0.45, "#17298c");
      bg.addColorStop(1, "#063b91");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // ----------------------------------------------------------
      // Responsive brain size
      // ----------------------------------------------------------

      const scale = Math.min(
        width / 1050,
        height / 650
      );

      const baseBrainScale = Math.max(
        0.75,
        Math.min(scale * 1.25, 1.65)
      );

      // Brain expands slightly as user scrolls into tunnel
      const brainScale = baseBrainScale * (1 + sp * 1.2);

      // Brain positioned slightly above center for full visibility
      const cx = width * 0.5;
      const cy = height * 0.41;

      const brainPath = createBrainPath(
        cx,
        cy,
        brainScale
      );

      // ----------------------------------------------------------
      // Large atmospheric glow
      // ----------------------------------------------------------

      const atmosphere =
        ctx.createRadialGradient(
          cx,
          cy,
          20,
          cx,
          cy,
          330 * brainScale
        );

      atmosphere.addColorStop(
        0,
        "rgba(0,240,255,0.16)"
      );

      atmosphere.addColorStop(
        0.55,
        "rgba(60,80,255,0.08)"
      );

      atmosphere.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle = atmosphere;

      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        330 * brainScale,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // ----------------------------------------------------------
      // Brain transparent fill
      // ----------------------------------------------------------

      const brainGradient =
        ctx.createLinearGradient(
          cx - 180 * brainScale,
          cy,
          cx + 190 * brainScale,
          cy
        );

      brainGradient.addColorStop(
        0,
        "rgba(110,70,255,0.16)"
      );

      brainGradient.addColorStop(
        0.5,
        "rgba(30,120,255,0.12)"
      );

      brainGradient.addColorStop(
        1,
        "rgba(0,225,255,0.18)"
      );

      ctx.fillStyle = brainGradient;

      ctx.fill(brainPath);

      // ----------------------------------------------------------
      // Brain outer neon outline
      // ----------------------------------------------------------

      ctx.save();

      ctx.strokeStyle = "#45D9FF";
      ctx.lineWidth = 2.2;

      ctx.shadowColor = "#00E5FF";
      ctx.shadowBlur = 18;

      ctx.stroke(brainPath);

      ctx.restore();

      // ============================================================
      // CIRCUIT FOLDS
      // ============================================================

      ctx.save();

      // Clip everything inside brain
      ctx.clip(brainPath);

      ctx.translate(cx, cy);
      ctx.scale(brainScale, brainScale);

      circuitLines.forEach((line, index) => {
        if (line.length < 2) return;

        ctx.beginPath();

        ctx.moveTo(
          line[0].x,
          line[0].y
        );

        for (let i = 1; i < line.length; i++) {
          const prev = line[i - 1];
          const current = line[i];

          const midX =
            (prev.x + current.x) / 2;

          const midY =
            (prev.y + current.y) / 2;

          ctx.quadraticCurveTo(
            prev.x,
            prev.y,
            midX,
            midY
          );
        }

        const pulse =
          0.38 +
          Math.sin(
            time * 1.5 + index * 0.15
          ) *
            0.1;

        ctx.strokeStyle =
          `rgba(91,210,255,${pulse})`;

        ctx.lineWidth =
          index % 5 === 0 ? 1.4 : 0.85;

        ctx.stroke();
      });

      // ----------------------------------------------------------
      // Extra tiny circuit branches
      // ----------------------------------------------------------

      for (let i = 0; i < 75; i++) {
        const angle =
          i * 0.82 + time * 0.03;

        const x =
          Math.cos(angle * 1.7) *
          (45 + (i % 9) * 13);

        const y =
          Math.sin(angle * 1.2) *
          (35 + (i % 7) * 12);

        ctx.beginPath();

        ctx.moveTo(x, y);

        ctx.lineTo(
          x + Math.cos(angle) * 15,
          y
        );

        ctx.lineTo(
          x + Math.cos(angle) * 15,
          y + Math.sin(angle) * 12
        );

        ctx.strokeStyle =
          "rgba(120,225,255,0.28)";

        ctx.lineWidth = 0.7;

        ctx.stroke();
      }

      // ============================================================
      // GLOW NODES
      // ============================================================

      glowNodes.forEach((node) => {
        const pulse =
          0.65 +
          Math.sin(
            time * 4 + node.phase
          ) *
            0.35;

        const gradient =
          ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            18
          );

        gradient.addColorStop(
          0,
          `rgba(255,255,255,${pulse})`
        );

        gradient.addColorStop(
          0.18,
          `rgba(0,255,255,${pulse})`
        );

        gradient.addColorStop(
          1,
          "rgba(0,180,255,0)"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
          node.x,
          node.y,
          18,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle = "#BFFFFF";

        ctx.beginPath();

        ctx.arc(
          node.x,
          node.y,
          node.size,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });

      ctx.restore();

      // ============================================================
      // CENTRAL BRAIN FISSURE
      // ============================================================

      ctx.save();

      ctx.strokeStyle =
        "rgba(74,220,255,0.42)";

      ctx.lineWidth = 1.5;

      ctx.shadowColor = "#00E5FF";
      ctx.shadowBlur = 6;

      ctx.beginPath();

      ctx.moveTo(
        cx - 20 * brainScale,
        cy - 145 * brainScale
      );

      ctx.bezierCurveTo(
        cx - 5 * brainScale,
        cy - 95 * brainScale,
        cx - 25 * brainScale,
        cy - 35 * brainScale,
        cx - 5 * brainScale,
        cy + 20 * brainScale
      );

      ctx.stroke();

      ctx.restore();

      // ============================================================
      // ACTIVE PULSE
      // ============================================================

      if (activePulse) {
        const radius =
          (60 +
            Math.sin(time * 5) * 20) *
          brainScale;

        const pulse =
          ctx.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            radius
          );

        pulse.addColorStop(
          0,
          "rgba(0,255,255,0.22)"
        );

        pulse.addColorStop(
          1,
          "rgba(0,255,255,0)"
        );

        ctx.fillStyle = pulse;

        ctx.beginPath();

        ctx.arc(
          cx,
          cy,
          radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      // ============================================================
      // FLYING SOCIAL / NOTIFICATION TRIGGERS
      // ============================================================

      const targetX =
        cx - 50 * brainScale;

      const targetY =
        cy + 5 * brainScale;

      for (
        let i =
          flyingTriggersRef.current.length - 1;
        i >= 0;
        i--
      ) {
        const trigger =
          flyingTriggersRef.current[i];

        trigger.progress +=
          trigger.speed;

        const t =
          Math.min(trigger.progress, 1);

        const controlX =
          (trigger.startX + targetX) / 2;

        const controlY =
          Math.min(
            trigger.startY,
            targetY
          ) - 120;

        const x =
          (1 - t) *
            (1 - t) *
            trigger.startX +
          2 *
            (1 - t) *
            t *
            controlX +
          t * t * targetX;

        const y =
          (1 - t) *
            (1 - t) *
            trigger.startY +
          2 *
            (1 - t) *
            t *
            controlY +
          t * t * targetY;

        // Trajectory
        ctx.beginPath();

        ctx.moveTo(
          trigger.startX,
          trigger.startY
        );

        ctx.quadraticCurveTo(
          controlX,
          controlY,
          x,
          y
        );

        ctx.strokeStyle =
          trigger.color;

        ctx.lineWidth = 2;

        ctx.shadowColor =
          trigger.color;

        ctx.shadowBlur = 12;

        ctx.stroke();

        ctx.shadowBlur = 0;

        // Notification badge
        ctx.save();

        ctx.translate(x, y);

        const text =
          `${trigger.icon} ${trigger.text}`;

        ctx.font =
          "600 13px Inter, Arial";

        const tw =
          ctx.measureText(text).width;

        ctx.fillStyle =
          "rgba(10,20,55,0.94)";

        ctx.strokeStyle =
          trigger.color;

        ctx.lineWidth = 1.5;

        ctx.beginPath();

        ctx.roundRect(
          -tw / 2 - 14,
          -17,
          tw + 28,
          34,
          17
        );

        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(text, 0, 1);

        ctx.restore();

        // Impact
        if (trigger.progress >= 1) {
          impactRef.current = {
            strength: 1,
            x: targetX,
            y: targetY,
          };

          onImpact?.(trigger.text);

          flyingTriggersRef.current.splice(
            i,
            1
          );
        }
      }

      // ============================================================
      // IMPACT FLASH
      // ============================================================

      if (
        impactRef.current.strength > 0
      ) {
        const strength =
          impactRef.current.strength;

        const impactRadius =
          (1 - strength) * 150 + 25;

        ctx.beginPath();

        ctx.arc(
          impactRef.current.x,
          impactRef.current.y,
          impactRadius,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle =
          `rgba(0,240,255,${strength})`;

        ctx.lineWidth = 3;

        ctx.shadowColor =
          "#00F0FF";

        ctx.shadowBlur = 20;

        ctx.stroke();

        ctx.shadowBlur = 0;

        impactRef.current.strength -=
          0.018;
      }

      ctx.restore();

      animationFrame =
        requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, [activePulse, onImpact]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
};
