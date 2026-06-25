import React, { useState } from 'react';
import { Building2, Layers, Video, Compass, Box, Sparkles } from 'lucide-react';
import { services } from '../data';
import { playTickSound, playChimeSound } from './AudioEngine';

interface HexagonFlowerStageProps {
  onSelectService: (id: string) => void;
  onOpenBooking: () => void;
  isMuted: boolean;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Building2: Building2,
  Layers: Layers,
  Video: Video,
  Compass: Compass,
  Box: Box,
  Sparkles: Sparkles,
};

export default function HexagonFlowerStage({ onSelectService, onOpenBooking, isMuted }: HexagonFlowerStageProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const nodes = [
    { id: "exterior", service: services.find(s => s.id === "exterior")!, x: 36, y: 25.75, color: "rgba(255, 122, 0, 0.85)", glowColor: "rgba(255, 122, 0, 0.65)", icon: Building2 },
    { id: "animation", service: services.find(s => s.id === "animation")!, x: 64, y: 25.75, color: "rgba(168, 85, 247, 0.85)", glowColor: "rgba(168, 85, 247, 0.65)", icon: Video },
    { id: "models", service: services.find(s => s.id === "models")!, x: 78, y: 50, color: "rgba(6, 182, 212, 0.85)", glowColor: "rgba(6, 182, 212, 0.65)", icon: Box },
    { id: "concept", service: services.find(s => s.id === "concept")!, x: 64, y: 74.25, color: "rgba(250, 204, 21, 0.85)", glowColor: "rgba(250, 204, 21, 0.65)", icon: Sparkles },
    { id: "tours", service: services.find(s => s.id === "tours")!, x: 36, y: 74.25, color: "rgba(59, 130, 246, 0.85)", glowColor: "rgba(59, 130, 246, 0.65)", icon: Compass },
    { id: "interior", service: services.find(s => s.id === "interior")!, x: 22, y: 50, color: "rgba(16, 185, 129, 0.85)", glowColor: "rgba(16, 185, 129, 0.65)", icon: Layers },
  ];

  const handleNodeClick = (id: string) => {
    const isSelected = selectedNodes.includes(id);
    if (isSelected) {
      setSelectedNodes(prev => prev.filter(n => n !== id));
      playChimeSound(false, isMuted);
    } else {
      setSelectedNodes(prev => [...prev, id]);
      playChimeSound(true, isMuted);
    }
    onSelectService(id);
  };

  const activeGlowColor = hoveredNode 
    ? nodes.find(n => n.id === hoveredNode)?.glowColor 
    : "rgba(223, 177, 91, 0.25)";

  return (
    <div className="relative w-full max-w-[620px] aspect-square mx-auto select-none" id="hexagon-flower-stage">
      {/* Background radial glow */}
      <div 
        className="absolute inset-[10%] rounded-full blur-[80px] opacity-40 transition-all duration-1000 z-0 pointer-events-none"
        style={{ background: activeGlowColor }}
      />

      {/* Enclosing decorative grand background hexagon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full h-full pointer-events-none" id="enclosing-grand-hexagon">
        <div className="w-full h-full relative flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-[#060606]/35"
            style={{ 
              clipPath: "polygon(50% 1.5%, 92% 25.8%, 92% 74.2%, 50% 98.5%, 8% 74.2%, 8% 25.8%)",
              background: "radial-gradient(circle, rgba(223, 177, 91, 0.08) 0%, rgba(6, 6, 6, 0.5) 100%)"
            }}
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon 
              points="50 5, 89 27.5, 89 72.5, 50 95, 11 72.5, 11 27.5" 
              style={{ stroke: "rgba(223, 177, 91, 0.35)", strokeWidth: "1.0" }} 
            />
            <polygon 
              points="50 1.5, 92 25.8, 92 74.2, 50 98.5, 8 74.2, 8 25.8" 
              style={{ stroke: "rgba(223, 177, 91, 0.15)", strokeWidth: "0.7" }} 
            />
            {[
              { cx: 50, cy: 5 },
              { cx: 89, cy: 27.5 },
              { cx: 89, cy: 72.5 },
              { cx: 50, cy: 95 },
              { cx: 11, cy: 72.5 },
              { cx: 11, cy: 27.5 }
            ].map((p, index) => (
              <circle key={index} cx={p.cx} cy={p.cy} r="0.8" className="fill-[#DFB15B]/40" />
            ))}
          </svg>

          {/* Decorative small technical tags inside margins */}
          <div className="absolute bottom-[4%] text-center px-4 font-mono z-10 opacity-35">
            <span className="text-[6px] tracking-[0.4em] font-bold block uppercase text-white/40">
              КОМПЛЕКСНАЯ ИНТЕГРАЦИЯ СРЕДЫ
            </span>
            <span className="text-[8px] font-sans font-light text-white/30 tracking-[0.25em] block mt-0.5 uppercase">
              7 SOT SYSTEM • 3D MATRIX ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Center Golden Rotating Hexagon Button */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[28%] cursor-pointer group"
        style={{ aspectRatio: "100/115", filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.95)) drop-shadow(0 0 15px rgba(223, 177, 91, 0.15))", perspective: "1200px" }}
        id="center-logo-hexagon"
        onClick={onOpenBooking}
      >
        <div className="w-full h-full relative transition-transform duration-[1500ms] ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front Face */}
          <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d", transform: "translateZ(0px)" }}>
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#000000" }}
            >
              <div className="absolute inset-[5%] border border-[#DFB15B]/25 pointer-events-none z-10" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-2.5 left-1/2 -translate-x-[50%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#DFB15B]/30 to-transparent blur-[0.5px] pointer-events-none z-10" />
            </div>
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "translateZ(1px)" }}>
              <defs>
                <linearGradient id="center-border-gradient-front" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9E6" />
                  <stop offset="25%" stopColor="#DFB15B" />
                  <stop offset="50%" stopColor="#80601F" />
                  <stop offset="75%" stopColor="#DFB15B" />
                  <stop offset="100%" stopColor="#FFEAA7" />
                </linearGradient>
              </defs>
              <polygon points="50 3, 97 30, 97 85, 50 112, 3 85, 3 30" stroke="url(#center-border-gradient-front)" strokeWidth="2.8" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.85))" }} />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center py-[12%] px-2 z-10 select-none w-full h-full" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
              <div className="flex flex-col items-center justify-center w-full text-center gap-1 sm:gap-2" style={{ transform: "translateZ(5px)" }}>
                <span 
                  className="text-2xl sm:text-3xl font-bold tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF9E6] via-[#DFB15B] to-[#80601F] leading-none select-none"
                  style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.85))" }}
                >
                  AP
                </span>
                <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.4em] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D4] via-[#DFB15B] to-[#80601F] font-sans leading-none pl-[0.4em]" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.95))" }}>
                  VO7SOT
                </span>
                <span className="text-[4.5px] sm:text-[5.5px] uppercase tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#DFB15B] to-[#80601F] font-sans leading-none pl-[0.2em]" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.95))" }}>
                  3D VISUALIZATION
                </span>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d", transform: "rotateY(180deg) translateZ(0px)" }}>
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "#000000" }}
            >
              <div className="absolute inset-[5%] border border-[#DFB15B]/25 pointer-events-none z-10" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-2.5 left-1/2 -translate-x-[50%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#DFB15B]/30 to-transparent blur-[0.5px] pointer-events-none z-10" />
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "translateZ(1px)" }}>
              <polygon points="50 3, 97 30, 97 85, 50 112, 3 85, 3 30" stroke="url(#center-border-gradient-front)" strokeWidth="2.8" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.85))" }} />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 z-10 select-none w-full h-full" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
              <div className="flex flex-col items-center justify-center text-center gap-1 sm:gap-2" style={{ transform: "translateZ(5px)" }}>
                <Sparkles className="w-[18%] h-auto text-[#DFB15B] drop-shadow-[0_0_8px_rgba(223,177,91,0.6)] mb-0.5" />
                <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.25em] text-[#DFB15B] uppercase leading-tight max-w-[95%]">
                  ЗАКАЗАТЬ
                </span>
                <span className="text-[6.5px] sm:text-[8px] font-bold tracking-[0.12em] text-[#FFF2D4] uppercase leading-normal max-w-[95%]">
                  3D Визуализацию
                </span>
                <span className="text-[4px] sm:text-[5.5px] uppercase tracking-[0.2em] font-extrabold text-black bg-[#DFB15B] px-1.5 py-0.5 rounded-[1px] font-sans mt-1 shadow-[0_0_8px_rgba(223,177,91,0.3)]">
                  ОТКРЫТЬ ФОРМУ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Surrounding Interactive Hexagon Nodes */}
      {nodes.map(p => {
        const Icon = p.icon;
        const isHovered = hoveredNode === p.id;
        const isSelected = selectedNodes.includes(p.id);
        const isActive = isHovered || isSelected;
        const service = p.service;

        // Visual color styling depending on active states
        const nodeHueRotate = p.id === "interior" ? "60deg" 
                            : p.id === "animation" ? "240deg" 
                            : p.id === "tours" ? "180deg" 
                            : p.id === "models" ? "150deg" 
                            : "0deg";

        return (
          <div 
            key={p.id}
            className="absolute -translate-x-[50%] -translate-y-[50%] z-10 w-[28%] cursor-pointer"
            style={{ left: `${p.x}%`, top: `${p.y}%`, aspectRatio: "100/115" }}
            onMouseEnter={() => {
              setHoveredNode(p.id);
              playTickSound(isMuted);
            }}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => handleNodeClick(p.id)}
            id={`flower-node-${p.id}`}
          >
            <div 
              className="w-full h-full relative transition-all duration-500 ease-out flex items-center justify-center"
              style={{ 
                transform: isActive ? "scale(1.08) translateY(-4px)" : "scale(1.0)",
                filter: isActive ? `drop-shadow(0 10px 20px ${p.glowColor})` : "drop-shadow(0 0 6px rgba(0, 0, 0, 0.8))"
              }}
            >
              {/* Outer grid circuit lining highlights */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon 
                  points="50 3, 97 30, 97 85, 50 112, 3 85, 3 30" 
                  className="transition-all duration-500"
                  style={{ 
                    stroke: isActive ? p.color : "rgba(223, 177, 91, 0.45)", 
                    strokeWidth: isActive ? "3.5" : "1.8" 
                  }} 
                />
                
                {/* Circuit-like lines radiating from center of node out to outer edges */}
                <line 
                  x1="50" y1="57.5" x2="50" y2="112" 
                  stroke={p.color} strokeWidth="2.5" 
                  strokeDasharray="55" strokeDashoffset={isActive ? 0 : 55}
                  style={{ 
                    opacity: isActive ? 1 : 0, 
                    transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out" 
                  }} 
                />
                <line 
                  x1="50" y1="57.5" x2="3" y2="30" 
                  stroke={p.color} strokeWidth="2.5" 
                  strokeDasharray="55" strokeDashoffset={isActive ? 0 : 55}
                  style={{ 
                    opacity: isActive ? 1 : 0, 
                    transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out" 
                  }} 
                />
                <line 
                  x1="50" y1="57.5" x2="97" y2="30" 
                  stroke={p.color} strokeWidth="2.5" 
                  strokeDasharray="55" strokeDashoffset={isActive ? 0 : 55}
                  style={{ 
                    opacity: isActive ? 1 : 0, 
                    transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out" 
                  }} 
                />
              </svg>

              {/* Node content area */}
              <div 
                className="w-[94%] h-[94%] bg-[#101010] relative overflow-hidden transition-all duration-500"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                {/* Background rendering image with tech color shades */}
                <img 
                  src={service.bgImage} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                  style={{ 
                    filter: isActive 
                      ? "scale(1.1) brightness(0.95) saturate(1.1)" 
                      : `scale(1.0) brightness(0.35) saturate(0.5) sepia(0.3) hue-rotate(${nodeHueRotate})`
                  }}
                />

                {/* Overlay gradient shroud */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle, ${p.color} 0%, rgba(0,0,0,0.85) 100%)`, 
                    opacity: isActive ? "0.3" : "0.7" 
                  }} 
                />

                {/* Technical 3D hexagonal shading masks */}
                <div 
                  className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-10"
                  style={{ 
                    clipPath: "polygon(50% 50%, 0% 25%, 50% 0%, 100% 25%)", 
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%)",
                    opacity: isActive ? 1 : 0 
                  }}
                />
                <div 
                  className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-10"
                  style={{ 
                    clipPath: "polygon(50% 50%, 0% 25%, 0% 75%, 50% 100%)", 
                    background: "linear-gradient(225deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.5) 100%)",
                    opacity: isActive ? 1 : 0 
                  }}
                />
                <div 
                  className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-10"
                  style={{ 
                    clipPath: "polygon(50% 50%, 100% 25%, 100% 75%, 50% 100%)", 
                    background: "linear-gradient(315deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.75) 100%)",
                    opacity: isActive ? 1 : 0 
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Main Node Text & Icon Details */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-1 px-1.5 text-center z-10">
                  <div 
                    className="p-1 rounded-full transition-all duration-500 mb-1"
                    style={{ textShadow: `0 0 10px ${p.color}` }}
                  >
                    <Icon 
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500" 
                      style={{ 
                        color: isActive ? "#FFFFFF" : "#DFB15B", 
                        transform: isActive ? "rotate(10deg)" : "none" 
                      }} 
                    />
                  </div>
                  <span className="text-[7.2px] sm:text-[8.5px] font-sans font-semibold tracking-wider text-gray-200 group-hover:text-white uppercase line-clamp-2 max-w-[85px]">
                    {service.titleRu.split(" ")[0]}
                  </span>
                  
                  {/* Flashing go-to tag details */}
                  <div 
                    className="overflow-hidden transition-all duration-500 text-[5.5px] sm:text-[6.5px] text-[#DFB15B] tracking-widest font-mono uppercase mt-0.5"
                    style={{ maxHeight: isActive ? "12px" : "0px", opacity: isActive ? "1" : "0" }}
                  >
                    Перейти →
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
