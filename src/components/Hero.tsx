import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchText, cn } from './GlitchText';

const phrases = [
  "JEEZEEV",
  "Я ПОНИМАЮ, ЧТО НЕ НАДО...",
  "BUT I'M ALREADY DOING IT"
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updatePointerMode = (event?: MediaQueryListEvent) => {
      const nextIsFinePointer = event?.matches ?? mediaQuery.matches;
      setIsFinePointer(nextIsFinePointer);

      if (!nextIsFinePointer) {
        setMousePos({ x: 0, y: 0 });
      }
    };

    updatePointerMode();
    mediaQuery.addEventListener('change', updatePointerMode);

    return () => {
      mediaQuery.removeEventListener('change', updatePointerMode);
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFinePointer]);

  useEffect(() => {
    if (isTriggered) return;
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isTriggered]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleTrigger = () => {
    if (isTriggered) return;

    setIsTriggered(true);

    setTimeout(() => {
      setIsTriggered(false);
    }, 2000);

    scrollTimeoutRef.current = window.setTimeout(() => {
      const nextSection = sectionRef.current?.nextElementSibling;
      if (nextSection instanceof HTMLElement) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Background elements reacting to mouse */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={{
          x: mousePos.x * -2,
          y: mousePos.y * -2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="absolute top-[20%] left-[10%] text-[var(--color-acid-red)] font-mono text-xs opacity-50 rotate-90">SYS.ERR.0x992</div>
        <div className="absolute bottom-[30%] right-[15%] text-[var(--color-electric-green)] font-mono text-xs opacity-50 -rotate-90">IMPULSE_OVERRIDE</div>
        <div className="absolute top-[60%] left-[80%] text-white font-mono text-xs opacity-30">AWAITING_TRIGGER</div>
      </motion.div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center">
        <div className="h-[120px] md:h-[160px] flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={phraseIndex + (isTriggered ? '-triggered' : '')}
              initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.9 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "font-display font-bold text-4xl md:text-7xl lg:text-8xl tracking-tighter uppercase",
                isTriggered ? "text-[var(--color-acid-red)]" : "text-white"
              )}
            >
              {isTriggered ? (
                <GlitchText text="SYSTEM COMPROMISED" />
              ) : (
                <GlitchText text={phrases[phraseIndex]} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-mono text-sm md:text-base text-gray-400 max-w-lg mb-16 uppercase tracking-widest"
        >
          архетип человека, который делает вещи, которые делать не нужно
        </motion.p>

        <motion.button
          onClick={handleTrigger}
          className="interactive relative group px-8 py-4 font-mono text-sm uppercase tracking-widest overflow-hidden border border-white/20 hover:border-[var(--color-acid-red)] transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 group-hover:text-[var(--color-acid-red)] transition-colors duration-300">
            {isTriggered ? "TOO LATE" : "НЕ НАЖИМАЙ"}
          </span>
          
          {/* Hover glitch effect */}
          <div className="absolute inset-0 bg-[var(--color-acid-red)]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-acid-red)] animate-[glitch-anim_2s_infinite]" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-electric-green)] animate-[glitch-anim-2_2.5s_infinite]" />
          </div>
        </motion.button>
      </div>

      {/* Screen flash effect on trigger */}
      <AnimatePresence>
        {isTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.1, 0.2, 0.3, 1] }}
            className="fixed inset-0 bg-white mix-blend-difference z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
