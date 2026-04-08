import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function InternalConflict() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Normal side shrinks, Chaos side grows
  const normalWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["50%", "20%", "0%"]);
  const chaosWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["50%", "80%", "100%"]);
  
  const normalOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const chaosScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen flex overflow-hidden">
        
        {/* Normal Side */}
        <motion.div 
          style={{ width: normalWidth, opacity: normalOpacity }}
          className="h-full bg-white flex items-center justify-center border-r border-gray-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')]"></div>
          <div className="p-8 text-center z-10">
            <h2 className="font-sans text-4xl md:text-6xl font-light text-black tracking-tight mb-4">
              Будь нормальным.
            </h2>
            <p className="font-sans text-gray-500 max-w-sm mx-auto">
              Всё хорошо. Не привлекай внимание. Сохраняй лицо. Думай о последствиях.
            </p>
          </div>
        </motion.div>

        {/* Chaos Side */}
        <motion.div 
          style={{ width: chaosWidth }}
          className="h-full bg-[var(--color-bg-dark)] flex items-center justify-center relative overflow-hidden"
        >
          <motion.div style={{ scale: chaosScale }} className="p-8 text-center z-10 w-full">
            <h2 className="font-display text-5xl md:text-8xl font-bold text-[var(--color-acid-red)] uppercase tracking-tighter mb-4 glitch-text" data-text="СДЕЛАЙ ЭТО ПРЯМО СЕЙЧАС">
              СДЕЛАЙ ЭТО ПРЯМО СЕЙЧАС
            </h2>
            <p className="font-mono text-white/70 max-w-md mx-auto uppercase tracking-widest text-sm md:text-base">
              Логика отключена. Импульс захватил контроль. Если стало слишком нормально — нужно создать событие.
            </p>
          </motion.div>
          
          {/* Chaos Background Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-acid-red)] rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--color-electric-green)] rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </motion.div>

        {/* Center Divider / Conflict Point */}
        <motion.div 
          className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white mix-blend-difference z-20"
          style={{ left: normalWidth }}
        />
      </div>
    </section>
  );
}
