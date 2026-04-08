import { motion } from 'framer-motion';

const incidents = [
  {
    id: "INC-001",
    time: "14:32:05",
    trigger: "VISUAL_CUE",
    desc: "Увидел закрывающийся багажник — и этого уже было достаточно.",
    status: "EXECUTED"
  },
  {
    id: "INC-042",
    time: "09:15:22",
    trigger: "SOCIAL_VOID",
    desc: "Странный диалог с незнакомцем без причины.",
    status: "ESCALATED"
  },
  {
    id: "INC-087",
    time: "23:59:59",
    trigger: "RISK_ASSESSMENT",
    desc: "Почти спалился — значит всё было правильно.",
    status: "VALIDATED"
  },
  {
    id: "INC-112",
    time: "18:40:11",
    trigger: "POST_RATIONALIZATION",
    desc: "Сделал, а объяснение придумал потом.",
    status: "LOGGED"
  },
  {
    id: "INC-204",
    time: "12:00:00",
    trigger: "HOMEOSTASIS_BREACH",
    desc: "Если стало слишком нормально — нужно создать событие.",
    status: "INITIATED"
  }
];

export default function Scenarios() {
  return (
    <section className="py-32 px-4 md:px-12 bg-[#0a0a0a] relative border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 border-b border-white/20 pb-8 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase text-white mb-2">Архив Инцидентов</h2>
            <p className="font-mono text-gray-500 text-sm uppercase tracking-widest">Задокументированные проявления</p>
          </div>
          <div className="font-mono text-[var(--color-acid-red)] text-xs mt-4 md:mt-0 animate-pulse">
            [LIVE_MONITORING_ACTIVE]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map((incident, idx) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative border border-white/10 bg-black p-6 hover:border-[var(--color-electric-green)] transition-colors duration-300"
            >
              {/* Scanline effect on hover */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,102,0.05)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
              
              <div className="flex justify-between items-start mb-6 font-mono text-xs">
                <span className="text-gray-500">{incident.id}</span>
                <span className="text-[var(--color-electric-green)]">{incident.time}</span>
              </div>
              
              <div className="mb-4">
                <span className="inline-block px-2 py-1 bg-white/5 text-gray-400 font-mono text-[10px] uppercase mb-3">
                  TRG: {incident.trigger}
                </span>
                <p className="font-sans text-white/90 text-lg leading-snug">
                  "{incident.desc}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center font-mono text-[10px]">
                <span className="text-gray-600">STATUS:</span>
                <span className={incident.status === 'EXECUTED' ? 'text-[var(--color-acid-red)]' : 'text-white'}>
                  [{incident.status}]
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
