import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const fragments = [
  { text: "он не ищет выгоду", keyword: "ИМПУЛЬС", align: "text-left" },
  { text: "он не считает последствия", keyword: "РИСК", align: "text-right" },
  { text: "он делает это, потому что мысль уже произошла", keyword: "ТРИГГЕР", align: "text-center" },
  { text: "чем выше шанс спалиться —", keyword: "АБСУРД", align: "text-left" },
  { text: "тем сильнее притяжение", keyword: "МОМЕНТ", align: "text-right" },
];

export default function WhoIsJeezeev() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] py-32 px-4 md:px-12 overflow-hidden bg-[var(--color-graphite)]">
      <div className="absolute top-10 left-10 font-mono text-xs text-gray-600 uppercase tracking-widest">
        [LOG_EXTRACT: DEFINITION]
      </div>

      <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto flex flex-col justify-center min-h-screen gap-24">
        {fragments.map((frag, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative w-full ${frag.align}`}
          >
            <div className="font-mono text-sm md:text-lg text-gray-400 mb-2 uppercase">
              {frag.text}
            </div>
            <div className="font-display text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white/90 hover:text-[var(--color-acid-red)] transition-colors duration-500 cursor-default">
              {frag.keyword}
            </div>
            
            {/* Decorative line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-[1px] bg-white/10 mt-4 ${frag.align === 'text-left' ? 'origin-left' : frag.align === 'text-right' ? 'origin-right' : 'origin-center'}`}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Background noise/text */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.03]">
        <div className="font-display text-[20vw] font-bold leading-none break-all text-white">
          JEEZEEVJEEZEEVJEEZEEV
        </div>
      </div>
    </section>
  );
}
