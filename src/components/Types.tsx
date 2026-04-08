import { motion } from 'framer-motion';

const types = [
  {
    id: "light",
    name: "Лайтовый",
    desc: "Ещё держится, но уже проскальзывает.",
    style: "border-white/20 text-white/80 hover:bg-white/5",
    font: "font-sans font-light",
    animation: { y: [0, -5, 0], transition: { duration: 4, repeat: Infinity } }
  },
  {
    id: "functional",
    name: "Функциональный",
    desc: "Снаружи норм, внутри системный хаос.",
    style: "border-blue-500/30 text-blue-100 hover:border-blue-500/80",
    font: "font-mono font-medium",
    animation: { opacity: [1, 0.8, 1], transition: { duration: 0.2, repeat: Infinity, repeatType: "mirror" as const } }
  },
  {
    id: "hard",
    name: "Хард",
    desc: "Импульс почти всегда сильнее логики.",
    style: "border-[var(--color-acid-red)]/50 text-[var(--color-acid-red)] bg-[var(--color-acid-red)]/5",
    font: "font-display font-bold uppercase italic tracking-tighter",
    animation: { x: [-2, 2, -2], transition: { duration: 0.1, repeat: Infinity } }
  },
  {
    id: "chaos",
    name: "Chaos Mode",
    desc: "Не реагирует на реальность, а ломает её.",
    style: "border-transparent text-white bg-black mix-blend-screen",
    font: "font-display font-black uppercase tracking-widest",
    isChaos: true
  }
];

export default function Types() {
  return (
    <section className="py-32 px-4 bg-[#111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-center mb-24 text-white">
          КЛАССИФИКАЦИЯ
        </h2>

        <div className="flex flex-col gap-12">
          {types.map((type, idx) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              className={`relative p-8 md:p-12 border-l-4 ${type.style} transition-all duration-500 group`}
            >
              {type.isChaos ? (
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')] opacity-20 group-hover:opacity-50 transition-opacity animate-pulse" />
              ) : null}
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <motion.h3 
                  animate={type.isChaos ? { 
                    textShadow: ["-2px 0 red", "2px 0 blue", "-2px 0 green"],
                    x: [-1, 1, -1]
                  } : type.animation}
                  transition={type.isChaos ? { duration: 0.1, repeat: Infinity } : type.animation.transition}
                  className={`text-4xl md:text-6xl ${type.font}`}
                >
                  {type.name}
                </motion.h3>
                
                <p className="font-mono text-sm md:text-base max-w-sm text-right opacity-80">
                  {type.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
