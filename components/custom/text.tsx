"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Text = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isInsideFrame, setIsInsideFrame] = useState(false);

  const radius = useMotionValue(0);
  const animatedRadius = useSpring(radius, { stiffness: 100, damping: 20 });

  useEffect(() => {
    radius.set(isInsideFrame ? 200 : 0);
  }, [isInsideFrame]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  return (
    <>
      {/* Custom Wand Cursor with Glow */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: "translate(-10px, -10px)",
          width: 100,
          height: 100,
        }}
      >
        <img
          src="/wand.png"
          alt="wand cursor"
          style={{
            width: 100,
            height: 70,
            objectFit: "contain",
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        <div
          className="absolute animate-pulse"
          style={{
            left: -10,
            top: -10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 60%, transparent 100%)",
            filter: "blur(5px)",
            pointerEvents: "none",
          }}
        />
      </div>

      <main className="grid h-screen place-items-center p-10 cursor-none">
        <div
          className="relative w-full max-w-screen-lg aspect-video overflow-hidden rounded-2xl shadow-inner"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsInsideFrame(true)}
          onMouseLeave={() => setIsInsideFrame(false)}
        >
          <img
            src="/harry2.svg"
            className="absolute left-0 top-0 w-full h-auto object-cover"
          />

          <motion.div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 10,
              width: "100%",
              height: "100%",
              WebkitMaskImage: animatedRadius.get() > 0
                ? `radial-gradient(circle ${animatedRadius.get()}px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
                : "none",
              maskImage: animatedRadius.get() > 0
                ? `radial-gradient(circle ${animatedRadius.get()}px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
                : "none",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <img
              src="/harry1.svg"
              className="relative left-0 top-0 z-10 w-full h-auto object-cover filter grayscale blur-lg"
            />
          </motion.div>
        </div>
      </main>
    </>
  );
};
