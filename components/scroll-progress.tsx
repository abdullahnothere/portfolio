"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  return <motion.div style={{ scaleX: width }} className="h-[2px] origin-left bg-mint" aria-hidden />;
}
