'use client';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Particles() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    let animationFrameId: number;
    let paths: CircuitPath[] = [];
    let pulses: Pulse[] = [];
    
    // Theme-aware colors
    const color = theme === 'light' ? '0, 0, 0' : '255, 255, 255';
    const accentColor = theme === 'light' ? '#000000' : '#ffffff';

    class CircuitPath {
      points: { x: number, y: number }[] = [];
      baseOpacity: number;
      width: number;

      constructor() {
        // Random start positions across the screen
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;

        this.points.push({ x, y });
        // Maximized opacity and width for light mode to ensure strong exposure
        const minOpacity = theme === 'light' ? 0.35 : 0.1;
        this.baseOpacity = minOpacity + Math.random() * 0.15;
        this.width = theme === 'light' ? 1.2 : 0.6;

        let curX = x;
        let curY = y;
        const segments = 6 + Math.floor(Math.random() * 10);

        for (let i = 0; i < segments; i++) {
          const mode = Math.random();
          const length = 40 + Math.random() * 120;

          if (mode < 0.4) {
            curX += (Math.random() > 0.5 ? 1 : -1) * length;
          } else if (mode < 0.8) {
            curY += (Math.random() > 0.5 ? 1 : -1) * length;
          } else {
            const diag = length * 0.7;
            const sx = Math.random() > 0.5 ? 1 : -1;
            const sy = Math.random() > 0.5 ? 1 : -1;
            curX += sx * diag;
            curY += sy * diag;
          }

          this.points.push({ x: curX, y: curY });
        }
      }

      draw() {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const maxDist = Math.max(canvas.width, canvas.height) / 1.5;

        for (let i = 0; i < this.points.length - 1; i++) {
          const p1 = this.points[i];
          const p2 = this.points[i + 1];

          // Soft radial fade for better readability
          const dist = Math.sqrt(Math.pow(p1.x - cx, 2) + Math.pow(p1.y - cy, 2));
          const fade = Math.max(0.2, 1 - dist / maxDist);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color}, ${this.baseOpacity * fade})`;
          ctx.lineWidth = this.width;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          if (this.width > 1 && i % 3 === 0) {
            ctx.fillStyle = `rgba(${color}, ${this.baseOpacity * fade * 0.5})`;
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    class Pulse {
      path: CircuitPath;
      progress: number = 0;
      speed: number;

      constructor(path: CircuitPath) {
        this.path = path;
        this.speed = 0.0001 + Math.random() * 0.0004; // Calm motion
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.progress = 0;
          this.path = paths[Math.floor(Math.random() * paths.length)];
        }
      }

      draw() {
        const segmentCount = this.path.points.length - 1;
        const totalProgress = this.progress * segmentCount;
        const segmentIdx = Math.floor(totalProgress);
        const segmentProgress = totalProgress % 1;

        const p1 = this.path.points[segmentIdx];
        const p2 = this.path.points[segmentIdx + 1];
        if (!p1 || !p2) return;

        const curX = p1.x + (p2.x - p1.x) * segmentProgress;
        const curY = p1.y + (p2.y - p1.y) * segmentProgress;

        // Blinking logic
        const blink = (Math.sin(Date.now() * 0.005 + (curX + curY)) + 1) / 2; // 0 to 1

        ctx.globalAlpha = (0.3 + blink * 0.7) * (theme === 'light' ? 0.8 : 1);
        ctx.shadowBlur = theme === 'light' ? 2 : 10;
        ctx.shadowColor = accentColor;
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(curX, curY, theme === 'light' ? 1 : 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      paths = [];
      pulses = [];
      for (let i = 0; i < 80; i++) {
        paths.push(new CircuitPath());
      }
      for (let i = 0; i < 30; i++) {
        pulses.push(new Pulse(paths[Math.floor(Math.random() * paths.length)]));
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Paths and Pulses only

      paths.forEach(p => p.draw());
      pulses.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
