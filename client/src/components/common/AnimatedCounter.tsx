import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !isInView) return;

    // Extract numeric match
    const match = value.match(/^([^\d]*)(\d[\d,]*)(\+?.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const rawNumber = parseInt(match[2].replace(/,/g, ""), 10);
    const suffix = match[3] || "";

    if (isNaN(rawNumber)) {
      setDisplayValue(value);
      return;
    }

    const start = rawNumber > 1900 ? rawNumber - 30 : 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentNumber = Math.round(start + (rawNumber - start) * ease);

      const formatted = rawNumber >= 1000 && !value.includes("2017")
        ? currentNumber.toLocaleString()
        : String(currentNumber);

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
