import { useEffect, useRef } from 'react';
import styles from './CaptchaTasksBanner.module.css';
 
const W = 200;
const H = 66;
const rand = (min, max) => min + Math.random() * (max - min);
 
export default function CaptchaCanvas({ code }) {
  const ref = useRef(null);
 
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 
    ctx.fillStyle = '#dcdce8';
    ctx.fillRect(0, 0, W, H);
 
    for (let i = 0; i < 70; i += 1) {
      ctx.fillStyle = `rgba(43,43,64,${rand(0.05, 0.3)})`;
      ctx.fillRect(rand(0, W), rand(0, H), 2, 2);
    }
 
    const step = W / (code.length + 1);
    [...code].forEach((ch, i) => {
      ctx.save();
      ctx.translate(step * (i + 1), H / 2 + rand(-5, 5));
      ctx.rotate(rand(-0.28, 0.28));
      ctx.font = `700 ${Math.round(rand(36, 42))}px Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#2b2b40';
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    });
 
    ctx.strokeStyle = 'rgba(43,43,64,.5)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(rand(0, 20), rand(0, H));
      ctx.bezierCurveTo(60, rand(0, H), 140, rand(0, H), W - rand(0, 20), rand(0, H));
      ctx.stroke();
    }
  }, [code]);
 
  return (
    <canvas
      ref={ref}
      className={styles.captchaCanvas}
      role="img"
      aria-label={`Captcha image. Type the ${code.length} characters shown.`}
    />
  );
}