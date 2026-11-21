'use client';

import React, { useEffect, useRef } from 'react';

function getEllipsePath(cx: number, cy: number, rx: number, ry: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const pt = (x: number, y: number) =>
    `${(cx + x * cos - y * sin).toFixed(2)} ${(cy + x * sin + y * cos).toFixed(2)}`;
  return `M${pt(rx, 0)}C${pt(rx, 0.5523 * ry)} ${pt(0.5523 * rx, ry)} ${pt(0, ry)}C${pt(-0.5523 * rx, ry)} ${pt(-rx, 0.5523 * ry)} ${pt(-rx, 0)}C${pt(-rx, -0.5523 * ry)} ${pt(-0.5523 * rx, -ry)} ${pt(0, -ry)}C${pt(0.5523 * rx, -ry)} ${pt(rx, -0.5523 * ry)} ${pt(rx, 0)}Z`;
}

// Exact paw SVG path from original website
const PAW_PATH =
  'M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z' +
  getEllipsePath(14.6, 29.2, 5.3, 6.9, -28) +
  getEllipsePath(24.2, 16.6, 5.5, 7.3, -10) +
  getEllipsePath(39.8, 16.6, 5.5, 7.3, 10) +
  getEllipsePath(49.4, 29.2, 5.3, 6.9, 28);

interface Stamp {
  x: number;
  y: number;
  angle: number;
  born: number;
}

export default function PawCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only show on desktop devices with hover and fine pointer, respecting reduced motion
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pawPath: Path2D;
    try {
      pawPath = new Path2D(PAW_PATH);
    } catch {
      return;
    }

    const stamps: Stamp[] = [];
    let dpr = 1;
    let animId = 0;
    let isRunning = false;
    let lastX = Number.NaN;
    let lastY = Number.NaN;
    let distanceTravelled = 0;
    let side = 1;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    handleResize();

    const render = (now: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = stamps.length - 1; i >= 0; i--) {
        const stamp = stamps[i];
        const age = now - stamp.born;
        if (age > 1000) {
          stamps.splice(i, 1);
          continue;
        }

        const fade = age < 600 ? 1 : 1 - (age - 600) / 400;
        ctx.globalAlpha = 0.42 * fade * fade;
        ctx.setTransform(0.27 * dpr, 0, 0, 0.27 * dpr, stamp.x * dpr, stamp.y * dpr);
        ctx.rotate(stamp.angle);
        ctx.translate(-32, -34);
        ctx.fillStyle = '#c2622b';
        ctx.fill(pawPath);
      }

      if (stamps.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;

      if (Number.isNaN(lastX)) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      distanceTravelled += Math.hypot(dx, dy);

      if (distanceTravelled >= 46) {
        distanceTravelled = 0;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        side = -side;
        const lateralOffset = 7 * side;

        stamps.push({
          x: e.clientX + Math.cos(angle) * lateralOffset + 14,
          y: e.clientY + Math.sin(angle) * lateralOffset + 16,
          angle,
          born: performance.now(),
        });

        if (stamps.length > 14) {
          stamps.shift();
        }

        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(render);
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] size-full"
    />
  );
}
