import React from 'react';
import { Mail, Building2, Layers, Video, Compass, Box, Sparkles, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  onSelectService: (id: string) => void;
  onOpenBooking: () => void;
  activeServiceId?: string;
}

export default function Header({ onSelectService, onOpenBooking, activeServiceId }: HeaderProps) {
  const navItems = [
    { id: 'exterior', label: 'EXTERIOR\nVISUALIZATION', icon: Building2, color: '#FF7A00' },
    { id: 'interior', label: 'INTERIOR\nVISUALIZATION', icon: Layers, color: '#10B981' },
    { id: 'animation', label: 'ARCHITECTURAL\nANIMATION', icon: Video, color: '#A855F7' },
    { id: 'tours', label: '360°\nVIRTUAL TOURS', icon: Compass, color: '#3B82F6' },
    { id: 'models', label: 'INTERACTIVE\n3D MODELS', icon: Box, color: '#06B6D4' },
    { id: 'concept', label: 'CONCEPT\nDESIGN', icon: Sparkles, color: '#FACC15' },
    { id: 'concept', label: 'DIGITAL\nSHOWROOMS', icon: LayoutGrid, color: '#EAB308' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-[#060606]/90 via-[#060606]/40 to-transparent pt-4 pb-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side: logo */}
        <div className="flex flex-col items-start gap-1" id="nav-logo-area">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer group select-none flex flex-col justify-start"
            id="nav-logo"
          >
            <div className="text-xl lg:text-2xl font-semibold tracking-[0.2em] text-white">
              3D VISUAL <span className="text-[#DFB15B] font-serif font-light drop-shadow-[0_0_12px_rgba(223,177,91,0.5)]">AP</span>
            </div>
            <div className="text-[9px] tracking-[0.5em] text-gray-500 group-hover:text-amber-500/80 transition-all duration-500">
              V07SOT
            </div>
          </div>
        </div>

        {/* Center: horizontal menus (hidden on small screen, flex on xl) */}
        <nav className="hidden xl:flex items-center gap-1" id="nav-horizontal-menu">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeServiceId === item.id;
            return (
              <div 
                key={`${item.id}-${index}`}
                onClick={() => onSelectService(item.id)}
                className="group flex flex-col items-center cursor-pointer relative w-24"
                id={`nav-item-${item.id}-${index}`}
              >
                {/* Hexagon icon button */}
                <div className="relative w-11 h-12 flex items-center justify-center transition-all duration-500 hover:scale-110">
                  <svg 
                    className={`absolute inset-0 w-full h-full text-transparent transition-all duration-300 ${
                      isActive 
                        ? 'drop-shadow-[0_0_8px_rgba(223,177,91,0.75)]' 
                        : 'drop-shadow-[0_0_4px_rgba(223,177,91,0.2)] group-hover:drop-shadow-[0_0_8px_rgba(223,177,91,0.6)]'
                    }`} 
                    viewBox="0 0 100 115" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon 
                      points="50 3, 97 30, 97 85, 50 112, 3 85, 3 30" 
                      className={`transition-all duration-500 fill-black/60 ${
                        isActive 
                          ? 'stroke-[#DFB15B] stroke-[6px]' 
                          : 'stroke-[#DFB15B]/40 group-hover:stroke-[#DFB15B]'
                      }`}
                      strokeWidth="5"
                    />
                  </svg>
                  <Icon 
                    className={`w-5 h-5 transition-all duration-300 z-10 ${
                      isActive ? 'text-white' : 'text-[#DFB15B]/70 group-hover:text-white'
                    }`}
                    style={{ filter: `drop-shadow(0 0 4px ${item.color}40)` }}
                  />
                </div>

                {/* Vertical micro connector wire */}
                <div className={`w-[1px] h-2 transition-colors ${isActive ? 'bg-[#DFB15B]' : 'bg-[#DFB15B]/20 group-hover:bg-[#DFB15B]/60'}`} />

                {/* Small labels */}
                <div 
                  className={`text-[7.5px] leading-[1.3] font-sans tracking-wider text-center whitespace-pre-wrap transition-all duration-300 min-h-[22px] h-auto mt-1 pb-1 px-1 ${
                    isActive ? 'text-[#DFB15B] font-bold' : 'text-[#A3A3A3] group-hover:text-[#DFB15B] font-medium'
                  }`}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right side: Email link & CTA */}
        <div className="flex items-center gap-6" id="nav-right-actions">
          <a 
            href="mailto:vo7sot@gmail.com" 
            className="hidden sm:flex items-center gap-2 group text-xs tracking-widest text-[#E5E5E5] hover:text-[#DFB15B] transition-all duration-300 select-none font-light"
          >
            <Mail className="w-3.5 h-3.5 text-[#DFB15B]/80 group-hover:drop-shadow-[0_0_6px_rgba(223,177,91,0.8)]" />
            <span className="font-mono">vo7sot@gmail.com</span>
          </a>

          <button 
            onClick={onOpenBooking}
            className="border border-[#DFB15B]/50 hover:border-[#DFB15B] px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-[#DFB15B] hover:text-black hover:bg-[#DFB15B] transition-all duration-500 shadow-[0_0_15px_rgba(223,177,91,0.1)] hover:shadow-[0_0_25px_rgba(223,177,91,0.35)] rounded-none cursor-pointer"
            id="btn-fast-consult"
          >
            Заказать
          </button>
        </div>
      </div>
    </header>
  );
}
