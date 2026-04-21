import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 55;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function makeParticle(width, height, randomY = true) {
  return {
    x: randomBetween(0, width),
    y: randomY ? randomBetween(0, height) : height + randomBetween(10, 40),
    size: randomBetween(10, 22),
    opacity: randomBetween(0.04, 0.11),
    vx: randomBetween(-0.15, 0.15),
    vy: randomBetween(-0.5, -0.18),
    rotation: randomBetween(0, Math.PI * 2),
    rotSpeed: randomBetween(-0.003, 0.003),
    type: Math.random() > 0.45 ? 'open' : 'closed',
  };
}

function drawClosedBook(ctx, p) {
  const w = p.size * 0.68;
  const h = p.size;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.rect(-w / 2, -h / 2, w, h);
  ctx.stroke();
  // Spine
  const spineX = -w / 2 + w * 0.18;
  ctx.beginPath();
  ctx.moveTo(spineX, -h / 2);
  ctx.lineTo(spineX, h / 2);
  ctx.stroke();
  // Page lines
  ctx.lineWidth = 0.45;
  ctx.globalAlpha = p.opacity * 0.7;
  for (let i = 1; i <= 2; i++) {
    const lineY = -h / 2 + (h / 3) * i;
    ctx.beginPath();
    ctx.moveTo(spineX, lineY);
    ctx.lineTo(w / 2, lineY);
    ctx.stroke();
  }
  ctx.restore();
}

function drawOpenBook(ctx, p) {
  const w = p.size;
  const h = p.size * 0.62;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 0.9;
  // Left page
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.bezierCurveTo(-w * 0.08, -h / 2, -w / 2, -h * 0.35, -w / 2, 0);
  ctx.bezierCurveTo(-w / 2, h * 0.35, -w * 0.08, h / 2, 0, h / 2);
  ctx.stroke();
  // Right page
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.bezierCurveTo(w * 0.08, -h / 2, w / 2, -h * 0.35, w / 2, 0);
  ctx.bezierCurveTo(w / 2, h * 0.35, w * 0.08, h / 2, 0, h / 2);
  ctx.stroke();
  // Spine
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(0, h / 2);
  ctx.stroke();
  // Text lines on pages
  ctx.lineWidth = 0.4;
  ctx.globalAlpha = p.opacity * 0.55;
  for (let i = 1; i <= 2; i++) {
    const ly = -h / 2 + (h / 3) * i;
    // left side
    ctx.beginPath();
    ctx.moveTo(-w * 0.42, ly);
    ctx.lineTo(-w * 0.06, ly);
    ctx.stroke();
    // right side
    ctx.beginPath();
    ctx.moveTo(w * 0.06, ly);
    ctx.lineTo(w * 0.42, ly);
    ctx.stroke();
  }
  ctx.restore();
}

function BookParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(makeParticle(canvas.width, canvas.height, true));
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        if (p.type === 'open') drawOpenBook(ctx, p);
        else drawClosedBook(ctx, p);

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.y < -30) {
          particles[i] = makeParticle(canvas.width, canvas.height, false);
        }
        if (p.x < -30) p.x = canvas.width + 30;
        if (p.x > canvas.width + 30) p.x = -30;
      });

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

export default BookParticles;
