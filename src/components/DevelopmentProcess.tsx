import React from 'react';
import { PenTool, Box, Sun, Palette, ShieldCheck } from 'lucide-react';

export default function DevelopmentProcess() {
  const steps = [
    {
      num: "01",
      title: "Техническое ТЗ",
      icon: PenTool,
      desc: "Сбор архитектурных планов, чертежей фасадов, ведомостей отделки и мудбордов с атмосферой."
    },
    {
      num: "02",
      title: "Clay Моделинг",
      icon: Box,
      desc: "Построение высокополигональной геометрии в серых материалах для детального согласования архитектурного объема."
    },
    {
      num: "03",
      title: "Шейдеры и свет",
      icon: Sun,
      desc: "Наложение премиальных PBR материалов и настройка сложных световых сценариев (дневной, сумеречный, ночной)."
    },
    {
      num: "04",
      title: "Пост-обработка",
      icon: Palette,
      desc: "Тонкая художественная ретушь, цветокоррекция в DaVinci и интеграция атмосферных эффектов (дымка, птицы, брызги)."
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-[#060606] border-t border-neutral-900 relative overflow-hidden" id="process-steps">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(223,177,91,0.02)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-2xl lg:text-4xl font-serif text-white tracking-wide uppercase">
            Этапы Создания Совершенства
          </h2>
          <p className="text-xs text-[#DFB15B] tracking-[0.3em] uppercase font-mono pl-[0.3em]">
            АРХИТЕКТУРНЫЙ КЛАСС ДЕТАЛИЗАЦИИ
          </p>
          <div className="w-12 h-[1px] bg-[#DFB15B]/40 mx-auto mt-4" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="bg-[#090909] border border-neutral-900 hover:border-[#DFB15B]/30 transition-all duration-500 p-6 relative group"
                id={`process-step-node-${index}`}
              >
                {/* Step numbering HUD background */}
                <span className="absolute top-4 right-6 text-4xl lg:text-5xl font-mono font-bold text-neutral-800/20 group-hover:text-[#DFB15B]/10 transition-colors duration-500">
                  {step.num}
                </span>

                <div className="p-3 border border-neutral-800 bg-neutral-950/80 w-12 h-12 flex items-center justify-center text-[#DFB15B] group-hover:border-[#DFB15B]/40 group-hover:text-white transition-all duration-500 mb-6 rounded-none">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-serif text-white tracking-wide uppercase">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Art Director quality guarantee statement */}
        <div className="max-w-3xl mx-auto mt-20 p-6 bg-[#090909]/60 border border-[#DFB15B]/15 text-center space-y-4">
          <div className="inline-flex p-2.5 rounded-full bg-[#DFB15B]/5 text-[#DFB15B]">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="text-xs tracking-[0.2em] font-mono text-white uppercase">
            ДВОЙНОЙ КОНТРОЛЬ КАЧЕСТВА СТУДИИ AP
          </h4>
          <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
            Каждое готовое изображение перед отправкой клиенту проходит строгую личную проверку арт-директора на соответствие законам композиции, корректность световых преломлений и фотореалистичность текстур.
          </p>
        </div>
      </div>
    </section>
  );
}
