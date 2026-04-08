import { useState } from 'react';
import { motion } from 'framer-motion';

const triggers = [
  { id: 'boredom', title: 'СКУКА', detail: 'нужно сломать момент' },
  { id: 'whatif', title: 'А ЧТО ЕСЛИ...', detail: 'мысль уже стала действием' },
  { id: 'awkward', title: 'НЕЛОВКОСТЬ', detail: 'усилить абсурд до предела' },
  { id: 'memory', title: 'ВОСПОМИНАНИЕ', detail: 'импульс запущен ретроспективно' },
  { id: 'rules', title: 'ЧУЖИЕ ПРАВИЛА', detail: 'хочется сделать наоборот' },
  { id: 'nothing', title: 'ТИШИНА', detail: 'ощущение, что ничего не происходит' },
];

export default function Triggers() {
  const [activeTrigger, setActiveTrigger] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen py-24 px-4 bg-[var(--color-bg-dark)] flex flex-col items-center justify-center">
      <div className="absolute top-10 right-10 font-mono text-xs text-[var(--color-acid-red)] uppercase tracking-widest">
        [SYSTEM_TRIGGERS]
      </div>

      <div className="text-center mb-20">
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">
          Что включает <span className="text-[var(--color-acid-red)]">Джизеева</span>
        </h2>
        <p className="font-mono text-gray-500 mt-4 uppercase text-sm">Наведи для активации протокола</p>
      </div>

      <div className="relative w-full max-w-5xl aspect-square md:aspect-video flex items-center justify-center">
        {/* Central Hub */}
        <div className="absolute w-32 h-32 rounded-full border border-white/20 flex items-center justify-center z-10 bg-[var(--color-bg-dark)]">
          <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${activeTrigger ? 'bg-[var(--color-acid-red)] shadow-[0_0_20px_var(--color-acid-red)]' : 'bg-white/20'}`} />
        </div>

        {/* Trigger Nodes */}
        {triggers.map((trigger, index) => {
          const angle = (index / triggers.length) * Math.PI * 2;
          const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 250;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const isActive = activeTrigger === trigger.id;

          return (
            <motion.div
              key={trigger.id}
              className="absolute interactive"
              initial={{ x: 0, y: 0, opacity: 0 }}
              whileInView={{ x, y, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, type: 'spring' }}
              onMouseEnter={() => setActiveTrigger(trigger.id)}
              onMouseLeave={() => setActiveTrigger(null)}
            >
              {/* Connecting Line */}
              <svg className="absolute top-1/2 left-1/2 -z-10 overflow-visible pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}>
                <line 
                  x1="0" y1="0" 
                  x2={-x} y2={-y} 
                  stroke={isActive ? 'var(--color-acid-red)' : 'rgba(255,255,255,0.1)'} 
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray={isActive ? "0" : "4 4"}
                  className="transition-all duration-300"
                />
              </svg>

              <div className={`relative group cursor-none p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
                isActive 
                  ? 'border-[var(--color-acid-red)] bg-[var(--color-acid-red)]/10 scale-110 z-20' 
                  : 'border-white/10 bg-black/50 hover:border-white/30 z-10'
              }`}>
                <h3 className={`font-mono text-sm md:text-base font-bold whitespace-nowrap transition-colors ${
                  isActive ? 'text-[var(--color-acid-red)]' : 'text-white'
                }`}>
                  {trigger.title}
                </h3>
                
                {/* Detail Tooltip */}
                <motion.div 
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0, 
                    y: isActive ? 0 : 10,
                    height: isActive ? 'auto' : 0
                  }}
                  className="overflow-hidden"
                >
                  <p className="font-sans text-xs text-gray-300 mt-2 max-w-[150px] whitespace-normal">
                    {trigger.detail}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
