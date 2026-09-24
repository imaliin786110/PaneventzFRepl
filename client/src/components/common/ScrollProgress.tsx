import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[70] origin-left pointer-events-none bg-gradient-to-r from-[#D4AF37] via-[#FFF9E6] to-[#E5C378] shadow-[0_0_12px_rgba(229,195,120,0.6)]"
      style={{ scaleX }}
    />
  );
}
