import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, DollarSign, CheckCircle, Smartphone, Camera, Eye, RotateCw } from 'lucide-react';
import { Service } from '../types';

interface DetailsModalProps {
  service: Service;
  onClose: () => void;
  onOpenBooking: (id: string) => void;
}

export default function DetailsModal({ service, onClose, onOpenBooking }: DetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'gallery'>('details');
  const [activeImage, setActiveImage] = useState(service.gallery[0] || service.bgImage);
  
  // Interactive Simulator States
  const [dayNight, setDayNight] = useState<'day' | 'sunset' | 'night'>('sunset');
  const [activeMaterial, setActiveMaterial] = useState('Carrara Marble');
  const [cameraAngle, setCameraAngle] = useState('Orbit View');
  const [tourRotation, setTourRotation] = useState(180);
  const [modelRotation, setModelRotation] = useState(45);
  const [conceptGlow, setConceptGlow] = useState('Cosmic Gold Glow');

  // Click & Drag states for 360 tour and model rotation
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const handleDragStart = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;

    if (service.demo.type === 'tour-360') {
      setTourRotation(prev => (prev + delta * 0.5 + 360) % 360);
    } else if (service.demo.type === 'model-rotate') {
      setModelRotation(prev => (prev + delta * 0.8 + 360) % 360);
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  // Continuous subtle rotation if not dragged
  useEffect(() => {
    if (service.demo.type === 'model-rotate' || service.demo.type === 'tour-360') {
      const timer = setInterval(() => {
        if (!isDragging.current) {
          if (service.demo.type === 'model-rotate') {
            setModelRotation(prev => (prev + 0.3) % 360);
          } else {
            setTourRotation(prev => (prev + 0.08) % 360);
          }
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [service.demo.type]);

  const materialsList = [
    { name: "Carrara Marble", info: "Премиальный белый итальянский мрамор с серыми прожилками. Идеально полированная поверхность.", colorClass: "bg-slate-100" },
    { name: "Brushed Brass", info: "Шлифованная латунь с тёплым металлическим отливом для фурнитуры и светильников.", colorClass: "bg-amber-400" },
    { name: "Walnut Wood", info: "Шлифованный американский орех с глубокой текстурой древесных волокон.", colorClass: "bg-amber-900" },
    { name: "Deep Green Velvet", info: "Мягкий бархат изумрудного оттенка для мебели элитного класса.", colorClass: "bg-emerald-900" }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 select-none animate-fade-in"
      id={`modal-service-${service.id}`}
    >
      <div className="bg-[#0b0b0b] border border-[#DFB15B]/30 w-full max-w-5xl rounded-none relative overflow-hidden flex flex-col lg:flex-row shadow-[0_0_80px_rgba(223,177,91,0.15)] my-auto">
        
        {/* Shimmer animations on borders */}
        <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#DFB15B]/50 to-transparent animate-pulse" />
        <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#DFB15B]/50 to-transparent animate-pulse" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-gray-400 hover:text-[#DFB15B] transition-colors p-2 bg-black/60 border border-neutral-800 hover:border-[#DFB15B] cursor-pointer"
          id="btn-close-modal"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: INTERACTIVE SIMULATOR */}
        <div className="w-full lg:w-[55%] bg-[#060606] p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#DFB15B]/20 min-h-[420px]">
          <div>
            <div className="flex items-center gap-2 mb-6 text-xs tracking-widest text-[#DFB15B]/80 uppercase font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFB15B] animate-ping" />
              ИНТЕРАКТИВНЫЙ РЕНДЕР СТУДИИ AP
            </div>

            {/* DAY/NIGHT SIMULATOR */}
            {service.demo.type === "day-night" && (
              <div className="space-y-6" id="demo-day-night">
                <div className="relative aspect-[4/3] bg-neutral-900 border border-neutral-800 overflow-hidden group">
                  <img 
                    src={service.bgImage} 
                    alt="Interactive viewport render" 
                    className="w-full h-full object-cover transition-all duration-1000 ease-out"
                    style={{ 
                      filter: dayNight === "day" 
                        ? "brightness(1.0) contrast(1.05) saturate(1.0)" 
                        : dayNight === "sunset"
                        ? "brightness(0.8) hue-rotate(-10deg) saturate(1.2) contrast(1.05)"
                        : "brightness(0.4) contrast(1.25) saturate(0.85) hue-rotate(220deg)"
                    }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Grid lines overlay */}
                  <div className="absolute inset-0 border border-white/5 pointer-events-none grid grid-cols-3 grid-rows-3">
                    {[...Array(9)].map((_, idx) => (
                      <div key={idx} className="border border-white/5" />
                    ))}
                  </div>

                  {/* Spectral blending overlays */}
                  {dayNight === "sunset" && <div className="absolute inset-0 bg-orange-500/10 mix-blend-color-burn pointer-events-none transition-all duration-1000" />}
                  {dayNight === "night" && <div className="absolute inset-0 bg-blue-950/40 mix-blend-overlay pointer-events-none transition-all duration-1000" />}
                  
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 border border-neutral-800 text-[8px] font-mono text-gray-400 tracking-wider">
                    TIME COORD: {dayNight === "day" ? "12:00 PM" : dayNight === "sunset" ? "07:30 PM (DUSK)" : "01:00 AM (MIDNIGHT)"}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] text-gray-400 font-mono tracking-wider uppercase text-center">
                    Выбор светового сценария рендера:
                  </div>
                  <div className="flex gap-2">
                    {['day', 'sunset', 'night'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setDayNight(mode as any)}
                        className={`flex-1 py-2 text-xs uppercase tracking-wider border rounded-none transition-all duration-300 font-mono ${dayNight === mode ? "border-[#DFB15B] bg-[#DFB15B]/10 text-[#DFB15B]" : "border-neutral-800 text-gray-500 hover:border-neutral-700 hover:text-white"}`}
                      >
                        {mode === 'day' ? 'День' : mode === 'sunset' ? 'Закат' : 'Ночь'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MATERIAL CONFIGURATOR */}
            {service.demo.type === "materials" && (
              <div className="space-y-6" id="demo-materials">
                <div className="relative aspect-[4/3] bg-neutral-900 border border-neutral-800 overflow-hidden">
                  <img 
                    src={service.bgImage} 
                    alt="Material render state" 
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{
                      filter: activeMaterial === "Carrara Marble" ? "brightness(1.0) saturate(1.0) contrast(1.0)"
                        : activeMaterial === "Brushed Brass" ? "brightness(0.9) sepia(0.55) hue-rotate(5deg) saturate(1.3) contrast(1.15)"
                        : activeMaterial === "Walnut Wood" ? "brightness(0.7) sepia(0.6) hue-rotate(15deg) saturate(1.0) contrast(1.1)"
                        : "brightness(0.65) hue-rotate(85deg) saturate(0.85) contrast(1.05)"
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/90 p-3 border-t border-neutral-800">
                    <p className="text-[9px] text-[#DFB15B] font-mono uppercase tracking-widest mb-1">
                      АКТИВНЫЙ МАТЕРИАЛ: {activeMaterial}
                    </p>
                    <p className="text-[9px] text-gray-400 leading-normal">
                      {materialsList.find(m => m.name === activeMaterial)?.info}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] text-gray-400 font-mono tracking-wider uppercase text-center">
                    Интерактивный конфигуратор материалов отделки:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {materialsList.map((mat) => (
                      <button
                        key={mat.name}
                        onClick={() => setActiveMaterial(mat.name)}
                        className={`flex items-center gap-2.5 px-3 py-2 text-left text-xs tracking-wider border rounded-none transition-all duration-300 ${activeMaterial === mat.name ? "border-[#DFB15B] bg-[#DFB15B]/10 text-[#DFB15B]" : "border-neutral-800 text-gray-400 hover:border-neutral-700"}`}
                      >
                        <span className={`w-3 h-3 rounded-full ${mat.colorClass} border border-black/30 flex-shrink-0`} />
                        <span className="font-mono text-[10px] truncate">{mat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CAMERA WALK-THROUGH */}
            {service.demo.type === "camera" && (
              <div className="space-y-6" id="demo-camera">
                <div className="relative aspect-[4/3] bg-neutral-900 border border-neutral-800 overflow-hidden">
                  <img 
                    src={service.bgImage} 
                    alt="Camera render state" 
                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                    style={{
                      transform: cameraAngle === "Orbit View" ? "scale(1.0) rotate(0deg)"
                        : cameraAngle === "Drone Entrance" ? "scale(1.15) translate(10px, -5px)"
                        : "scale(1.08) translate(-15px, 5px) rotate(1deg)"
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 text-[7.5px] font-mono text-white tracking-widest uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    REC [CAM 01]
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/85 px-2 py-1 border border-neutral-800 text-[8px] font-mono text-gray-400">
                    PATH ACTIVE: {cameraAngle.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] text-gray-400 font-mono tracking-wider uppercase text-center">
                    Выбор пролёта камеры (анимационный тест):
                  </div>
                  <div className="flex gap-2">
                    {['Orbit View', 'Drone Entrance', 'Cinematic Slow Pan'].map((cam) => (
                      <button
                        key={cam}
                        onClick={() => setCameraAngle(cam)}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-wider border rounded-none transition-all duration-300 font-mono ${cameraAngle === cam ? "border-[#DFB15B] bg-[#DFB15B]/10 text-[#DFB15B]" : "border-neutral-800 text-gray-500 hover:border-neutral-700"}`}
                      >
                        {cam === 'Orbit View' ? 'Облёт 360' : cam === 'Drone Entrance' ? 'Наезд' : 'Панорама'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 360 PANORAMA TOUR */}
            {service.demo.type === "tour-360" && (
              <div className="space-y-6" id="demo-tour-360">
                <div 
                  className="relative aspect-[4/3] bg-neutral-950 border border-neutral-800 overflow-hidden cursor-grab active:cursor-grabbing"
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                  <div 
                    className="absolute inset-0 w-[300%] h-full pointer-events-none"
                    style={{
                      backgroundImage: `url(${service.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transform: `translateX(-${(tourRotation / 360) * 50}%)`
                    }}
                  />
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                  
                  {/* Drag indicator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white/50 text-[10px] font-mono tracking-widest pointer-events-none bg-black/60 px-4 py-2 border border-white/10 rounded-none animate-pulse">
                    <span>Удерживай & Тяни</span>
                    <span className="text-[8px] mt-0.5">360° КРУГОМ</span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/85 px-2 py-1 border border-neutral-800 text-[8px] font-mono text-gray-400">
                    PAN ANGLE: {Math.round(tourRotation)}°
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 font-mono tracking-wider uppercase text-center">
                  Панорамный режим 3D-сферы • Поддерживается вращение мышкой
                </div>
              </div>
            )}

            {/* INTERACTIVE MODEL ROTATOR */}
            {service.demo.type === "model-rotate" && (
              <div className="space-y-6" id="demo-model-rotate">
                <div 
                  className="relative aspect-[4/3] bg-neutral-950 border border-neutral-800 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                  {/* Decorative wireframe grid rotating in 3D */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  
                  <div 
                    className="w-48 h-48 relative transition-transform duration-75 pointer-events-none"
                    style={{ transform: `rotateY(${modelRotation}deg) rotateX(15deg)` }}
                  >
                    {/* Glowing holographic cubes */}
                    <div className="absolute inset-0 border border-cyan-500/35 flex items-center justify-center bg-cyan-950/10 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]">
                      <div className="w-32 h-32 border border-cyan-400/50 flex items-center justify-center">
                        <div className="w-16 h-16 border-2 border-cyan-300 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }} />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 text-[7px] font-mono text-cyan-400 uppercase tracking-widest">
                    WebGL Hologram System
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/85 px-2 py-1 border border-neutral-800 text-[8px] font-mono text-gray-400">
                    ROTATION: {Math.round(modelRotation)}°
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 font-mono tracking-wider uppercase text-center">
                  Вращайте голографическую модель мышкой во всех направлениях
                </div>
              </div>
            )}

            {/* CONCEPT LIGHT SPECIFIC */}
            {service.demo.type === "concept-light" && (
              <div className="space-y-6" id="demo-concept">
                <div className="relative aspect-[4/3] bg-neutral-900 border border-neutral-800 overflow-hidden">
                  <img 
                    src={service.bgImage} 
                    alt="Concept lighting state" 
                    className="w-full h-full object-cover transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  {/* Immersive glow preset overrides */}
                  {conceptGlow === "Cosmic Gold Glow" && <div className="absolute inset-0 bg-yellow-500/10 mix-blend-color-dodge pointer-events-none" />}
                  {conceptGlow === "Neon Cyan Glow" && <div className="absolute inset-0 bg-cyan-500/15 mix-blend-overlay pointer-events-none" />}
                  {conceptGlow === "Cyberpunk Red Sparkle" && <div className="absolute inset-0 bg-red-600/10 mix-blend-color-burn pointer-events-none" />}

                  <div className="absolute bottom-3 left-3 bg-black/85 px-2 py-1 border border-neutral-800 text-[8px] font-mono text-[#DFB15B]">
                    SPECTRUM: {conceptGlow.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] text-gray-400 font-mono tracking-wider uppercase text-center">
                    Выбор футуристичного светового спектра:
                  </div>
                  <div className="flex gap-2">
                    {['Cosmic Gold Glow', 'Neon Cyan Glow', 'Cyberpunk Red Sparkle'].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setConceptGlow(preset)}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-wider border rounded-none transition-all duration-300 font-mono ${conceptGlow === preset ? "border-[#DFB15B] bg-[#DFB15B]/10 text-[#DFB15B]" : "border-neutral-800 text-gray-500 hover:border-neutral-700"}`}
                      >
                        {preset === 'Cosmic Gold Glow' ? 'Золото' : preset === 'Neon Cyan Glow' ? 'Неон' : 'Алый'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-[8px] text-gray-500 font-mono uppercase tracking-[0.15em] mt-6">
            7 SOT SYSTEM AP • ACTIVE RENDER CONSOLE v1.07
          </div>
        </div>

        {/* RIGHT COLUMN: INFORMATION & GALLERY TAB SELECTION */}
        <div className="w-full lg:w-[45%] p-6 lg:p-8 flex flex-col justify-between bg-[#0b0b0b]">
          <div className="space-y-6">
            
            {/* Tabs control headers */}
            <div className="flex border-b border-neutral-800 gap-6 pb-2" id="modal-tabs">
              <button 
                onClick={() => setActiveTab('details')}
                className={`text-xs uppercase tracking-widest font-semibold pb-1.5 transition-colors border-b-2 cursor-pointer ${activeTab === 'details' ? "border-[#DFB15B] text-white" : "border-transparent text-gray-500 hover:text-white"}`}
              >
                Описание
              </button>
              <button 
                onClick={() => {
                  setActiveTab('gallery');
                  setActiveImage(service.gallery[0] || service.bgImage);
                }}
                className={`text-xs uppercase tracking-widest font-semibold pb-1.5 transition-colors border-b-2 cursor-pointer ${activeTab === 'gallery' ? "border-[#DFB15B] text-white" : "border-transparent text-gray-500 hover:text-white"}`}
              >
                Галерея ({service.gallery.length})
              </button>
            </div>

            {/* DESCRIPTION PANEL */}
            {activeTab === 'details' ? (
              <div className="space-y-5 animate-fade-in" id="panel-details">
                <div className="space-y-1">
                  <h3 className="text-xl lg:text-2xl font-serif text-[#DFB15B] tracking-wide leading-tight">
                    {service.titleRu}
                  </h3>
                  <p className="text-xs text-gray-400 tracking-wider font-light">
                    {service.taglineRu}
                  </p>
                </div>

                <p className="text-xs leading-relaxed text-gray-300">
                  {service.descriptionRu}
                </p>

                <div className="pt-2">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#DFB15B] mb-2 leading-none">
                    Что входит в стандарт разработки:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-gray-400 font-sans">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      Текстурирование по ТЗ (PBR)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      3 круга бесплатных правок
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      Сложный студийный свет
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      Интеграция уличных карт
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      Постобработка в DaVinci
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      VR готовность к отправке
                    </li>
                  </ul>
                </div>

                {/* Duration & Pricing details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
                  <div className="flex gap-2.5 items-center">
                    <div className="p-2 border border-neutral-800 bg-neutral-900/50 flex-shrink-0 text-[#DFB15B]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-widest font-mono text-gray-500">Сроки сдачи</p>
                      <p className="text-[11px] font-sans text-gray-200 mt-0.5 font-medium">{service.durationRu}</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="p-2 border border-[#DFB15B]/20 bg-neutral-900/50 flex-shrink-0 text-[#DFB15B]">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-widest font-mono text-gray-500">Стоимость</p>
                      <p className="text-[11px] font-sans text-[#DFB15B] mt-0.5 font-semibold">{service.priceRu}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* GALLERY PANEL */
              <div className="space-y-4 animate-fade-in" id="panel-gallery">
                <div className="relative aspect-[16/10] bg-neutral-950 border border-neutral-800 overflow-hidden">
                  <img 
                    src={activeImage} 
                    alt="Extended gallery large rendering preview" 
                    className="w-full h-full object-cover transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Thumbnail carousel grid */}
                <div className="grid grid-cols-4 gap-2">
                  {service.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`aspect-[4/3] cursor-pointer overflow-hidden border transition-all duration-300 ${activeImage === img ? "border-[#DFB15B] opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail index ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-8 pt-6 border-t border-neutral-900 space-y-4">
            <button
              onClick={() => onOpenBooking(service.id)}
              className="w-full bg-[#DFB15B] hover:bg-white text-black py-4 px-6 text-[10px] font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-none cursor-pointer"
              id="btn-order-modal-service"
            >
              Заказать визуализацию
            </button>
            <div className="text-[8px] text-gray-500 text-center font-mono uppercase tracking-[0.1em]">
              * Расчет индивидуального коммерческого предложения за 15 минут
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
