import React, { useEffect, useRef } from 'react';

export default function DreamParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles = [];
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0, height = 0, dpr = 1, raf = 0, last = 0;
    let visible = true;

    const makeParticle = (randomY = true) => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + Math.random() * 40,
      r: 0.8 + Math.random() * 2.2,
      speed: 8 + Math.random() * 19,
      drift: (Math.random() - 0.5) * 10,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.55 ? '#e6a0b7' : Math.random() > 0.5 ? '#c6a8df' : '#f3c8a8',
      alpha: 0.22 + Math.random() * 0.42,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(85, Math.max(28, Math.round(width * height / 12500)));
      particles.length = 0;
      for (let i = 0; i < count; i++) particles.push(makeParticle());
      draw(0);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        const wobble = Math.sin(time * 0.00045 + p.phase) * 10;
        if (!reduced && !document.hidden && visible) {
          p.y -= p.speed / 60;
          p.x += (p.drift + wobble * 0.12) / 60;
          if (p.y < -12) Object.assign(p, makeParticle(false));
          if (p.x < -10) p.x = width + 8;
          if (p.x > width + 10) p.x = -8;
        }
        let dx = p.x - pointer.x, dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        let px = p.x, py = p.y;
        if (pointer.active && dist < 95 && dist > 0) {
          const force = (95 - dist) / 95;
          px += dx / dist * force * 18;
          py += dy / dist * force * 18;
        }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.hue;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.r > 2.1) {
          ctx.globalAlpha = p.alpha * 0.45;
          ctx.fillRect(px - 0.5, py - 5, 1, 10);
          ctx.fillRect(px - 5, py - 0.5, 10, 1);
        }
      });
      ctx.globalAlpha = 1;
    };

    const animate = (time) => {
      if (document.hidden || !visible) return;
      if (!last || time - last >= 28) {
        draw(time);
        last = time;
      }
      if (!reduced) raf = requestAnimationFrame(animate);
    };
    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) { last = 0; raf = requestAnimationFrame(animate); }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced && !document.hidden) raf = requestAnimationFrame(animate);
      else cancelAnimationFrame(raf);
    }, { threshold: 0.02 });

    resize();
    observer.observe(canvas);
    canvas.addEventListener('pointermove', onPointer, { passive: true });
    canvas.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduced) raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="dream-particles" aria-hidden="true" />;
}
