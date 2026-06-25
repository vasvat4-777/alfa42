import React, { useState, useRef, useEffect } from 'react';
import { Eye, HelpCircle } from 'lucide-react';
import { services } from '../data';

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Use the interior portfolio render as the comparison basis
  const baseImage = services.find(s => s.id === 'interior')?.bgImage || "/assets/portfolio_interior_luxury.jpg";

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const showcaseCards = [
    {
      title: "Экстерьеры",
      tag: "Dusk Villa",
      img: services.find(s => s.id === 'exterior')?.bgImage || "/assets/portfolio_exterior_dusk.jpg",
      desc: "Загородное поместье с многослойным вечерним освещением и зеркальным отражением бассейна."
    },
    {
      title: "Интерьеры",
      tag: "Luxury Lounge",
      img: services.find(s => s.id === 'interior')?.bgImage || "/assets/portfolio_interior_luxury.jpg",
      desc: "Гостиная пентхауса с мраморными текстурами и вкраплениями полированной латуни."
    },
    {
      title: "Концепты",
      tag: "Showroom Loft",
      img: services.find(s => s.id === 'concept')?.bgImage || "/assets/luxury_dark_mansion_interior.jpg",
      desc: "Виртуальная бренд-зона с интерактивной световой сценой для диджитал презентаций."
    }
  ];

  return (
    <section id="experience-showroom" className="min-h-screen bg-[#050505]/95 px-6 lg:px-12 py-24 border-t border-neutral-900 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title Block */}
        <div className="text-center space-y-3">
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-amber-500/80 block font-bold">
            ИНТЕРАКТИВНЫЙ ОПЫТ С ТЕХНОЛОГИЯМИ AP
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif text-white tracking-wide uppercase">
            От чертежа к фотореализму
          </h2>
          <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
            Потяните слайдер по центру, чтобы увидеть, как сухие CAD схемы и векторные планы превращаются в кинематографичную модель с физически корректными текстурами.
          </p>
        </div>

        {/* Before/After comparison area */}
        <div className="max-w-4xl mx-auto relative select-none">
          <div 
            ref={containerRef}
            className="relative aspect-[16/10] w-full bg-[#0a0a0a] border border-[#DFB15B]/30 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onTouchStart={() => { isDragging.current = true; }}
            onTouchEnd={() => { isDragging.current = false; }}
            id="before-after-slider-viewport"
          >
            {/* Left side CAD Background (Underneath) */}
            <div className="absolute inset-0 w-full h-full">
              {/* CAD Blueprint Blueprint blue/cyan overlay */}
              <div className="absolute inset-0 bg-[#0c1824] opacity-90 z-10 mix-blend-color pointer-events-none" />
              <img 
                src={baseImage} 
                alt="Blueprint schematic" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-[1.2] brightness-[0.9] grayscale-[1] sepia-[0.2] hue-rotate-[180deg]"
              />
              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 border border-cyan-500/10 grid grid-cols-12 grid-rows-12 pointer-events-none z-10" />
            </div>

            {/* Right side Photorealistic Render (Clipped Layer above) */}
            <div 
              className="absolute inset-0 w-full h-full z-15 overflow-hidden pointer-events-none"
              style={{ width: `${position}%` }}
            >
              {/* Note that we need a wrapper inside with the exact parent width to prevent stretching */}
              <img 
                src={baseImage} 
                alt="Photorealistic finished render" 
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{ 
                  width: containerRef.current?.getBoundingClientRect().width || '100%',
                  height: '100%' 
                }}
              />
            </div>

            {/* Glowing Golden Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-[#DFB15B] z-20 cursor-ew-resize pointer-events-none shadow-[0_0_10px_#DFB15B]"
              style={{ left: `${position}%` }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#DFB15B] bg-[#0c0c0c] text-[#DFB15B] shadow-[0_0_15px_rgba(223,177,91,0.5)]">
                <Eye className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Left & Right HUD Tags */}
            <span className="absolute left-6 top-6 bg-black/90 p-2 border border-neutral-800 text-[9px] font-mono text-cyan-400 tracking-wider z-10 select-none">
              BEFORE: CAD BLUEPRINT SCHEMES
            </span>
            <span className="absolute right-6 top-6 bg-black/95 p-2 border border-[#DFB15B]/35 text-[9px] font-mono text-[#DFB15B] tracking-wider z-30 select-none">
              AFTER: 3D PHOTOREALISTIC RENDER
            </span>
          </div>

          <p className="text-center text-[10px] text-gray-500 font-mono uppercase mt-4 select-none">
            ◀ Зажмите золотой диск и потяните влево или вправо для сопоставления ▶
          </p>
        </div>

        {/* Portfolio Showcase Grid under slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12" id="showroom-cards-grid">
          {showcaseCards.map((card, index) => (
            <div 
              key={index}
              className="group overflow-hidden bg-[#0a0a0a] border border-neutral-900 hover:border-[#DFB15B]/40 transition-all duration-300"
              id={`showroom-card-${index}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-95"
                />
                <span className="absolute bottom-3 left-3 bg-black/90 text-[8px] font-mono text-[#DFB15B] px-2 py-0.5 tracking-widest uppercase">
                  {card.tag}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-xs font-serif text-white tracking-widest uppercase">
                  {card.title}
                </h4>
                <p className="text-[10px] text-gray-400 leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
