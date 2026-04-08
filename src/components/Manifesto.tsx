import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);
  
  const opacity2 = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.6, 0.9], [50, 0]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-black flex flex-col items-center justify-center px-4">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center w-full max-w-5xl mx-auto text-center">
        
        <motion.div style={{ opacity: opacity1, y: y1 }} className="mb-32">
          <h2 className="font-sans text-2xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            Он понял, что живёт по чужому сценарию.<br/>
            <span className="text-gray-500">И начал действовать хаотично,</span><br/>
            просто чтобы почувствовать, что он живой.
          </h2>
        </motion.div>

        <motion.div style={{ opacity: opacity2, y: y2 }}>
          <p className="font-display text-4xl md:text-7xl font-bold text-[var(--color-acid-red)] uppercase tracking-tighter">
            Я понимаю, что не надо...
          </p>
          <p className="font-display text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter mt-2">
            но я уже делаю.
          </p>
        </motion.div>

      </div>

      {/* Cinematic grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')]" />
    </section>
  );
}
