"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroBackground.module.css";

type Orb = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
};

const PALETTE = ["#3d2112", "#7a451e", "#c87932", "#452613", "#1e1108"];

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let orbs: Orb[] = [];
    let animationFrame = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      orbs = Array.from({ length: 16 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 100 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 0.3 + Math.random() * 0.35,
      }));
    }

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "#0f0a07";
      ctx.fillRect(0, 0, w, h);
      for (const o of orbs) {
        if (!reduced) {
          o.x += o.vx;
          o.y += o.vy;
          if (o.x < -o.r) o.x = w + o.r;
          if (o.x > w + o.r) o.x = -o.r;
          if (o.y < -o.r) o.y = h + o.r;
          if (o.y > h + o.r) o.y = -o.r;
        }
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0, o.color + "ee");
        grad.addColorStop(1, o.color + "00");
        ctx.fillStyle = grad;
        ctx.globalAlpha = o.alpha;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="bokeh-canvas" className={styles.bokehCanvas} />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoReady(true)}
        className={`${styles.bgVideo} ${videoReady ? styles.bgVideoReady : ""}`}
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className={styles.siteScrim} />
    </>
  );
}
