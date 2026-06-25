import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, ArrowRight, CornerDownRight } from 'lucide-react';
import Header from './components/Header';
import HexagonFlowerStage from './components/HexagonFlowerStage';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import DevelopmentProcess from './components/DevelopmentProcess';
import DetailsModal from './components/DetailsModal';
import BookingModal from './components/BookingModal';
import { services, statistics } from './data';

function LogoStage3D() {
  return (
    <div className="w-full h-[320px] md:h-[400px] border-none select-none relative" id="threejs-logo-stage-wrapper">
      <iframe 
        src="/three_logo.html" 
        className="w-full h-full border-none block" 
        title="VO7SOT 3D Golden Logo Space" 
        scrolling="no" 
        id="threejs-golden-logo-iframe"
      />
    </div>
  );
}

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | null>('exterior');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  // Parallax drift tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const x = (e.clientX / w) * 2 - 1;
      const y = (e.clientY / h) * 2 - 1;
      setMousePosition({
        x: isNaN(x) || !isFinite(x) ? 0 : x,
        y: isNaN(y) || !isFinite(y) ? 0 : y,
      });
    };

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - (window.innerHeight || 1);
      if (total > 0) {
        setScrollProgress(window.scrollY / total);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ambient sound system
  useEffect(() => {
    try {
      if (!ambientAudioRef.current) {
        ambientAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav');
        ambientAudioRef.current.loop = true;
        ambientAudioRef.current.volume = 0.15;
      }
      if (isMuted) {
        ambientAudioRef.current.pause();
      } else {
        ambientAudioRef.current.play().catch(() => {
          // Playback might be blocked by browser autoplay rules
        });
      }
    } catch (err) {
      console.warn('Audio environment error:', err);
    }
  }, [isMuted]);

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
  };

  const handleOpenBooking = (serviceId: string = 'exterior') => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const selectedService = selectedServiceId ? services.find(s => s.id === selectedServiceId) : null;

  return (
    <div className="relative min-h-screen text-gray-100 overflow-hidden bg-[#030303] flex flex-col justify-between" id="applet-viewport-root">
      {/* 1. Real-time scroll progress glowing indicator line */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-[#DFB15B] to-[#9E7B31] transition-all duration-300 z-50 shadow-[0_0_8px_rgba(223,177,91,0.5)]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* 2. Parallax background layer with cursor drift */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `scale(1.08) translate(${mousePosition.x * -14}px, ${mousePosition.y * -14}px)` }}
        id="parallax-background-container"
      >
        <img 
          src="/assets/luxury_dark_mansion_interior.jpg" 
          alt="Studio ambient backdrop" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none filter brightness-[0.22] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-radial-vignette bg-gradient-to-t from-[#030303] via-black/40 to-[#030303]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#DFB15B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      {/* 3. Header HUD menu */}
      <Header 
        onSelectService={handleSelectService} 
        onOpenBooking={() => handleOpenBooking('exterior')} 
        activeServiceId={selectedServiceId || undefined} 
      />

      {/* 4. Main content stream */}
      <main className="relative z-10 flex-grow flex flex-col" id="master-main-wrapper">
        {/* HERO SECTION */}
        <section className="min-h-screen px-6 lg:px-12 flex flex-col items-center justify-center pt-48 sm:pt-48 md:pt-44 lg:pt-44 xl:pt-48 pb-16" id="section-hero">
          <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center gap-12">
            
            {/* Headlines */}
            <div className="flex flex-col items-center text-center space-y-5 md:space-y-6 max-w-3xl mx-auto animate-fade-in" id="hero-headlines">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#DFB15B]/10 to-transparent border-l-2 border-[#DFB15B] text-[9px] font-sans font-semibold tracking-[0.25em] text-[#DFB15B] uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Архитектура • Интерьер • Визуализация</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-[1.15] font-serif font-light tracking-tight text-white uppercase max-w-none sm:whitespace-nowrap">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#DFB15B] to-[#9E7B31] font-medium drop-shadow-[0_2px_15px_rgba(223,177,91,0.25)]">
                    3D Визуализация
                  </span>{' '}
                  и моделирование
                </h1>
                
                {/* 3D WebGL Letters and fireworks container */}
                <LogoStage3D />

                <p className="text-xs sm:text-[13px] text-gray-400 font-sans font-light leading-relaxed max-w-xl mx-auto mt-2">
                  Мы создаём фотореалистичные визуализации и интерактивные 3D-модели, которые продают дорогостоящие идеи и вдохновляют на безупречную реализацию.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
                <button 
                  onClick={() => handleOpenBooking('exterior')}
                  className="group relative border border-[#DFB15B] hover:border-white px-7 py-3.5 text-[10.5px] font-semibold tracking-[0.25em] uppercase text-[#DFB15B] hover:text-black hover:bg-[#DFB15B] transition-all duration-300 shadow-[0_0_15px_rgba(223,177,91,0.12)] hover:shadow-[0_0_25px_rgba(223,177,91,0.35)] rounded-none cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
                  id="btn-main-cta"
                >
                  <span>Заказать визуализацию</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a 
                  href="#experience-showroom" 
                  className="text-[9px] tracking-[0.2em] text-gray-500 hover:text-[#DFB15B] transition-colors py-2 uppercase font-mono flex items-center gap-1.5"
                >
                  <span>смотреть шоурум</span>
                  <CornerDownRight className="w-3 h-3 animate-bounce" />
                </a>
              </div>
            </div>

            {/* Honeycomb interactive stage */}
            <div className="w-full flex justify-center items-center relative" id="hero-hexagon-flower-panel">
              <div className="w-full max-w-[550px] md:max-w-[620px] lg:max-w-[640px] xl:max-w-[680px] relative animate-float">
                <HexagonFlowerStage 
                  onSelectService={handleSelectService} 
                  onOpenBooking={() => handleOpenBooking('exterior')} 
                  isMuted={isMuted} 
                />
              </div>
            </div>

          </div>
        </section>

        {/* BEFORE/AFTER TRANSFORM SLIDER SECTION */}
        <BeforeAfterSlider />

        {/* WORKFLOW DEVELOPMENT PROCESS SECTION */}
        <DevelopmentProcess />
      </main>

      {/* 5. Ambient sound toggle float button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button 
          onClick={() => setIsMuted(prev => !prev)}
          className="p-2.5 bg-black/80 border border-[#DFB15B]/30 text-[#DFB15B] hover:text-white hover:border-[#DFB15B] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)] cursor-pointer"
          title="Toggle Background Ambient Pad"
          id="btn-volume-toggle"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          )}
        </button>
      </div>

      {/* 6. Footer section with stats */}
      <footer className="relative z-20 bg-gradient-to-t from-black via-black/80 to-[#030303] pt-12 pb-6 px-6 lg:px-12 border-t border-neutral-900" id="master-footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-neutral-950">
          <div className="lg:col-span-4 space-y-2">
            <div className="text-lg font-semibold tracking-wider text-white">
              3D VISUAL <span className="text-[#DFB15B] font-serif font-light drop-shadow-[0_0_12px_rgba(223,177,91,0.5)]">AP</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal max-w-xs uppercase tracking-wider font-mono">
              АРХИТЕКТУРА И МОДЕЛИРОВАНИЕ КЛАССА LUXURY
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-wrap gap-8 lg:justify-end" id="footer-stats-hud">
            {statistics.map((stat, index) => (
              <div key={index} className="flex gap-3 items-center" id={`stat-node-${index}`}>
                <div className="text-3xl font-serif text-[#DFB15B] font-semibold tracking-tight">
                  {stat.value}
                </div>
                <div className="h-6 w-[1px] bg-neutral-800" />
                <div className="text-[7.5px] tracking-[0.2em] text-[#A3A3A3] uppercase max-w-[120px] font-sans">
                  {stat.labelRu}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between text-gray-600 text-[9px] tracking-widest font-mono">
          <p>© 2026 3D VISUAL AP. ALL RIGHTS RESERVED (V07SOT CORP).</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="mailto:vo7sot@gmail.com" className="hover:text-[#DFB15B] transition-colors">VO7SOT@GMAIL.COM</a>
            <span>ST. PETERSBURG / MOSCOW / COORD PORTAL</span>
          </div>
        </div>
      </footer>

      {/* 7. Detailed service description modal */}
      {selectedService && (
        <DetailsModal 
          service={selectedService} 
          onClose={() => setSelectedServiceId(null)} 
          onOpenBooking={(id) => handleOpenBooking(id)} 
        />
      )}

      {/* 8. Order / Cost Estimation Modal */}
      {isBookingOpen && (
        <BookingModal 
          initialServiceId={bookingServiceId} 
          onClose={() => setIsBookingOpen(false)} 
        />
      )}
    </div>
  );
}
