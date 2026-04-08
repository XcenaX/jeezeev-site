import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  "Ты когда-нибудь делал что-то странное просто чтобы посмотреть на реакцию?",
  "Возникало ли желание нажать на пожарную кнопку без причины?",
  "Тебе бывает скучно, когда всё идёт слишком идеально?",
  "Ты придумывал логичное объяснение своему абсолютно нелогичному поступку?",
  "Чем выше шанс быть пойманным, тем интереснее?",
  "Ты можешь начать странный диалог с незнакомцем просто так?",
  "Тебя раздражают чужие правила до такой степени, что хочется их нарушить?",
  "Ты делал что-то, понимая, что это плохая идея, но мысль уже появилась?",
  "Ты чувствуешь себя более живым в моменты хаоса?",
  "Если перед тобой большая красная кнопка 'НЕ НАЖИМАТЬ', ты нажмёшь?"
];

const options = [
  { value: 0, label: "НЕТ" },
  { value: 1, label: "ИНОГДА" },
  { value: 2, label: "ЧАСТО" },
  { value: 3, label: "ЭТО Я" }
];

export default function Test() {
  const [currentQ, setCurrentQ] = useState(-1);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const startTest = () => {
    setCurrentQ(0);
    setScore(0);
    setIsFinished(false);
  };

  const handleAnswer = (value: number) => {
    setScore(prev => prev + value);
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const getResult = () => {
    if (score <= 5) return { title: "НОРМИС", desc: "Система не обнаружила аномалий. Ты стабилен. Слишком стабилен." };
    if (score <= 12) return { title: "ЛАЙТОВЫЙ ДЖИЗЕЕВ", desc: "Импульсы есть, но контроль пока сильнее. Ты ещё держишься." };
    if (score <= 20) return { title: "ФУНКЦИОНАЛЬНЫЙ ДЖИЗЕЕВ", desc: "Снаружи ты кажешься нормальным. Но мы оба знаем, что происходит внутри." };
    if (score <= 27) return { title: "ХАРД ДЖИЗЕЕВ", desc: "Логика отключена. Импульс управляет тобой. Ты опасен для рутины." };
    return { title: "CHAOS MODE", desc: "КРИТИЧЕСКАЯ АНОМАЛИЯ. ТЫ И ЕСТЬ ТРИГГЕР. РЕАЛЬНОСТЬ СЛОМАНА." };
  };

  return (
    <section className="py-32 px-4 min-h-screen flex items-center justify-center bg-[var(--color-graphite)] relative">
      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
      
      <div className="max-w-3xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {currentQ === -1 && !isFinished && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 uppercase">
                Диагностика Системы
              </h2>
              <p className="font-mono text-gray-400 mb-12">
                Инициализация протокола выявления архетипа. 10 итераций.
              </p>
              <button
                onClick={startTest}
                className="interactive px-8 py-4 border border-[var(--color-acid-red)] text-[var(--color-acid-red)] font-mono uppercase tracking-widest hover:bg-[var(--color-acid-red)] hover:text-white transition-colors"
              >
                Начать сканирование
              </button>
            </motion.div>
          )}

          {currentQ >= 0 && !isFinished && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-black/50 p-8 md:p-12 border border-white/10 backdrop-blur-md"
            >
              <div className="font-mono text-[var(--color-electric-green)] text-sm mb-8">
                ITERATION {currentQ + 1} / {questions.length}
              </div>
              <h3 className="font-sans text-2xl md:text-4xl text-white mb-12 min-h-[120px]">
                {questions[currentQ]}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="interactive p-4 border border-white/20 text-left font-mono text-sm text-gray-300 hover:border-white hover:text-white hover:bg-white/5 transition-all"
                  >
                    [{opt.value}] {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {isFinished && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1 }}
              className="text-center bg-black p-8 md:p-16 border border-[var(--color-acid-red)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[var(--color-acid-red)]/5 animate-pulse pointer-events-none" />
              
              <div className="font-mono text-[var(--color-acid-red)] text-sm mb-4 uppercase tracking-widest">
                Результат диагностики
              </div>
              
              <div className="font-mono text-gray-500 mb-8">
                СИСТЕМА СЧИТАЕТ, ЧТО ТЫ:
              </div>
              
              <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 uppercase tracking-tighter glitch-text" data-text={getResult().title}>
                {getResult().title}
              </h2>
              
              <p className="font-sans text-lg text-gray-300 max-w-lg mx-auto mb-12">
                {getResult().desc}
              </p>
              
              <button
                onClick={startTest}
                className="interactive px-6 py-3 border border-white/30 text-white font-mono text-sm uppercase hover:bg-white hover:text-black transition-colors"
              >
                ПЕРЕЗАПУСК
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
