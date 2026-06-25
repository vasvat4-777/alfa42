import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calculator, User, Phone, Send, ArrowRight, MessageSquare } from 'lucide-react';
import { services } from '../data';

interface BookingModalProps {
  initialServiceId: string | null;
  onClose: () => void;
}

export default function BookingModal({ initialServiceId, onClose }: BookingModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || 'exterior');
  const [area, setArea] = useState<number>(120);
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number>(120000);
  const [ticketId, setTicketId] = useState<string>('');

  const rates: Record<string, number> = {
    exterior: 1500,
    interior: 1200,
    animation: 2500,
    tours: 1000,
    models: 1800,
    concept: 2000,
  };

  const basePrices: Record<string, number> = {
    exterior: 95000,
    interior: 75000,
    animation: 190000,
    tours: 120000,
    models: 140000,
    concept: 110000,
  };

  useEffect(() => {
    const rate = rates[selectedServiceId] || 1200;
    const base = basePrices[selectedServiceId] || 80000;
    const computed = base + Math.round(area * rate);
    setEstimatedPrice(computed);
  }, [selectedServiceId, area]);

  useEffect(() => {
    // Generate static ticket ID on load
    setTicketId(`AP-v07sot-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setIsSuccess(true);
  };

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 min-h-screen" id="booking-form-overlay">
      <div className="bg-[#0c0c0c] border border-[#DFB15B]/35 w-full max-w-2xl rounded-none relative overflow-hidden shadow-[0_0_80px_rgba(223,177,91,0.2)] p-6 md:p-10 select-none animate-fade-in">
        {/* Golden accent bar */}
        <div className="absolute top-0 left-0 w-2 h-full bg-[#DFB15B]" />
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 bg-neutral-900 border border-neutral-800 cursor-pointer"
          id="btn-close-booking"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10 space-y-6 animate-fade-in" id="booking-success-container">
            <div className="inline-flex p-4 rounded-full bg-[#DFB15B]/10 border border-[#DFB15B]/30 text-[#DFB15B] animate-bounce">
              <CheckCircle className="w-12 h-12" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-white uppercase tracking-wide">Заявка принята!</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                Спасибо, <span className="text-[#DFB15B] font-semibold">{name}</span>. Наш главный архитектор-визуализатор свяжется с вами в течение 15 минут для уточнения технических деталей.
              </p>
            </div>

            {/* Ticket Review Card */}
            <div className="bg-[#060606] p-4 border border-neutral-900 rounded-none text-left space-y-2 max-w-sm mx-auto font-mono text-[10px] text-gray-400">
              <p className="text-[#DFB15B] border-b border-neutral-900 pb-1.5 uppercase tracking-widest text-center font-bold">
                ОБЗОР ТЗ ЗАЯВКИ
              </p>
              <p className="flex justify-between">
                <span>Направление:</span>
                <span className="text-white uppercase font-bold">{selectedService.titleRu}</span>
              </p>
              <p className="flex justify-between">
                <span>Общая площадь:</span>
                <span className="text-white font-bold">{area} м²</span>
              </p>
              <p className="flex justify-between">
                <span>Ориент. бюджет:</span>
                <span className="text-[#DFB15B] font-bold">{estimatedPrice.toLocaleString('ru-RU')} ₽</span>
              </p>
              <p className="flex justify-between">
                <span>Канал связи:</span>
                <span className="text-white font-bold truncate max-w-[180px]">{contact}</span>
              </p>
              {telegram && (
                <p className="flex justify-between">
                  <span>Telegram:</span>
                  <span className="text-white font-bold">@{telegram.replace(/^@/, '')}</span>
                </p>
              )}
              <p className="text-[8px] text-gray-500 pt-2 text-center font-sans tracking-wide border-t border-neutral-900/50 mt-1">
                Идентификатор тикета: <span className="font-mono text-gray-400">{ticketId}</span>
              </p>
            </div>

            <button 
              onClick={onClose}
              className="px-8 py-3 border border-[#DFB15B] text-[#DFB15B] hover:bg-[#DFB15B] hover:text-black hover:shadow-[0_0_15px_rgba(223,177,91,0.25)] text-[10px] uppercase font-mono tracking-widest transition-all duration-300 rounded-none cursor-pointer"
              id="btn-success-close"
            >
              Закрыть окно
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" id="consultation-form">
            <div className="text-center space-y-2">
              <h2 className="text-2xl lg:text-3xl font-serif text-white tracking-wide uppercase">Запрос на визуализацию</h2>
              <p className="text-xs text-amber-500/80 tracking-widest uppercase font-mono">РАСЧЕТ СМЕТЫ И ПОДГОТОВКА СМЕТНЫХ УСЛОВИЙ</p>
              <div className="w-12 h-[1px] bg-[#DFB15B]/50 mx-auto mt-4" />
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#DFB15B]/80 block">
                1. Выберите категорию проекта:
              </label>
              <div className="relative">
                <select 
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-[#060606] border border-neutral-800 text-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-[#DFB15B] rounded-none appearance-none cursor-pointer"
                  id="select-booking-service"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.titleRu} ({s.title})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#DFB15B]">
                  <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                </div>
              </div>
            </div>

            {/* Budget & Area Slider Card */}
            <div className="space-y-3 bg-[#060606] p-4 border border-neutral-900 rounded-none">
              <div className="flex justify-between text-xs font-mono tracking-wider">
                <span className="text-gray-400 uppercase">2. Общая площадь объекта:</span>
                <span className="text-[#DFB15B] font-bold">{area} м²</span>
              </div>
              
              <input 
                type="range" 
                min="20" 
                max="1000" 
                step="5" 
                value={area} 
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full touch-none accent-[#DFB15B] bg-neutral-800 cursor-ew-resize"
                id="range-area-calculator"
              />
              
              <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                <span>20 м²</span>
                <span>500 м² (Оптимально)</span>
                <span>1000 м²</span>
              </div>

              {/* Real-time price tag */}
              <div className="pt-4 mt-3 border-t border-neutral-900 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div className="flex items-center gap-1 text-[10px] uppercase font-mono text-[#DFB15B]/80">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Ориентировочная стоимость:</span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-lg font-mono text-white font-semibold tracking-wide">
                    ~ {estimatedPrice.toLocaleString('ru-RU')} ₽
                  </span>
                  <p className="text-[7.5px] text-gray-500 uppercase tracking-widest mt-0.5">
                    *Включает 8K рендеры + 3 круга правок
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#DFB15B]/80 block">
                3. Ваши контактные данные:
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3.5 top-[15px] w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Ваше имя *" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#060606] border border-neutral-800 focus:border-[#DFB15B] text-gray-100 text-xs pl-10 pr-4 py-3.5 focus:outline-none rounded-none placeholder-gray-600"
                    id="input-client-name"
                  />
                </div>
                
                <div className="relative">
                  <Phone className="absolute left-3.5 top-[15px] w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Телефон / Email / WhatsApp *" 
                    value={contact} 
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-[#060606] border border-neutral-800 focus:border-[#DFB15B] text-gray-100 text-xs pl-10 pr-4 py-3.5 focus:outline-none rounded-none placeholder-gray-600"
                    id="input-client-contact"
                  />
                </div>
              </div>

              {/* Optional Telegram */}
              <div className="relative">
                <span className="absolute left-3.5 top-[14px] font-mono text-xs font-semibold text-gray-600">@</span>
                <input 
                  type="text" 
                  placeholder="Ваш Telegram (необязательно)" 
                  value={telegram} 
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full bg-[#060606] border border-neutral-800 focus:border-[#DFB15B] text-gray-100 text-xs pl-10 pr-4 py-3.5 focus:outline-none rounded-none placeholder-gray-600"
                  id="input-client-telegram"
                />
              </div>

              {/* Project Brief/Notes */}
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-[15px] w-4 h-4 text-gray-600" />
                <textarea 
                  placeholder="Опишите ваши пожелания к визуализации (стиль, количество ракурсов) или вставьте ссылку на облако с ТЗ..." 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-[#060606] border border-neutral-800 focus:border-[#DFB15B] text-gray-100 text-xs pl-10 pr-4 py-3 focus:outline-none rounded-none placeholder-gray-600 resize-none font-sans"
                  id="textarea-client-message"
                />
              </div>
            </div>

            {/* Submission */}
            <div className="pt-3">
              <button 
                type="submit"
                className="w-full bg-[#DFB15B] hover:bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-2 transition-all duration-500 shadow-[0_4px_20px_rgba(223,177,91,0.2)] rounded-none cursor-pointer"
                id="btn-submit-booking"
              >
                Отправить заявку <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
