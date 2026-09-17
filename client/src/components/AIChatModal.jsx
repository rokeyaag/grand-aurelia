import React, { useState, useEffect, useRef } from 'react';
import robotAvatar from '../assets/ai_robot_avatar.jpg';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  X, 
  Building2, 
  Utensils, 
  ArrowRight,
  Check,
  Search,
  BookOpen,
  Receipt,
  Truck,
  Brush,
  ShieldCheck,
  Copy,
  RotateCcw,
  Plane,
  Car,
  HeartHandshake,
  Compass,
  CreditCard,
  QrCode,
  Ticket,
  Maximize2,
  Minimize2,
  Printer,
  Download,
  Calendar,
  Clock,
  Luggage,
  Award,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Radio,
  Trash2
} from 'lucide-react';
import { CLIENT_KNOWLEDGE_TOPICS, FREQUENT_QUESTIONS, FLIGHT_SCHEDULES, queryClientKnowledge, detectLanguage } from '../projectKnowledge';

const SUPPORTED_LANGUAGES = [
  { code: 'bn-BD', langCode: 'bn', label: 'বাংলা (Bengali)', flag: '🇧🇩', short: 'বাংলা' },
  { code: 'en-US', langCode: 'en', label: 'English (US/UK)', flag: '🇺🇸', short: 'English' },
  { code: 'de-DE', langCode: 'de', label: 'Deutsch (German)', flag: '🇩🇪', short: 'Deutsch' },
  { code: 'ar-SA', langCode: 'ar', label: 'العربية (Arabic)', flag: '🇸🇦', short: 'العربية' },
  { code: 'fr-FR', langCode: 'fr', label: 'Français (French)', flag: '🇫🇷', short: 'Français' },
  { code: 'es-ES', langCode: 'es', label: 'Español (Spanish)', flag: '🇪🇸', short: 'Español' }
];

export default function AIChatModal({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onAddToCart,
  rooms = [],
  menuItems = [],
  tables = [],
  orders = []
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `👋 **Welcome to Grand Aurelia AI ChatBoot & Global Travel Concierge!**

I am your 24/7 multilingual intelligent concierge (বাংলা, English, Deutsch, العربية, Français, Español):
• ✈️ **Airlines & Flight Ticket Booking** (Emirates Dubai, Singapore Airlines, Qatar Airways Qsuite, Domestic & Private Jets)
• 🏨 **Luxury Suites & Pricing** (Ocean Suites, Business Suites, Presidential Penthouse)
• 🚗 **Chauffeur & Yacht Charter** (Rolls-Royce Phantom, Maybach, 65ft Azure Private Yacht)
• 💆 **Royal Spa & Thalassotherapy** (Moroccan Hammam, 24K Gold Facials & Hot Stone therapy)
• 🍽️ **Fine Dining & Chef Specials** (Wagyu Ribeye, Atlantic Salmon, Lava Cake)
• 🪑 **Table Reservations & POS** (Indoor Grand Hall, Terrace Garden, VIP Lounge)
• 💳 **Invoices, Billing & Payments** (10% VAT folios, bKash, Nagad & Cards)

🎙️ *You can speak via Microphone or type in any language!*`,
      recommendations: [
        { 
          id: 'fl_01',
          title: 'Emirates Dubai (EK-583)', 
          subtitle: 'DAC ➔ DXB • Economy $380 | Business $850 | First $1,650', 
          action: 'BOOK_FLIGHT', 
          flightData: FLIGHT_SCHEDULES[0]
        },
        { 
          id: 'rm_101',
          title: 'Deluxe Ocean Suite', 
          subtitle: 'Sea View • $180/night • King Jacuzzi', 
          action: 'VIEW_ROOM', 
          target: 'hotel' 
        }
      ],
      suggestedAction: { target: 'flight-modal', label: 'Search & Book Flights' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Voice Speech Recognition & Synthesis State
  const [isListening, setIsListening] = useState(false);
  const [selectedSpeechLang, setSelectedSpeechLang] = useState('bn-BD');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [speechStatusText, setSpeechStatusText] = useState('');
  const recognitionRef = useRef(null);
  
  // Flight Booking Dialog State
  const [selectedFlightForBooking, setSelectedFlightForBooking] = useState(null);
  const [passengerName, setPassengerName] = useState('Dr. Sarah Mahmud');
  const [passengerPassport, setPassengerPassport] = useState('A09823190');
  const [passengerPhone, setPassengerPhone] = useState('+880 1819 889900');
  const [selectedClass, setSelectedClass] = useState('business');
  const [seatNumber, setSeatNumber] = useState('3A');
  const [flightPaymentMethod, setFlightPaymentMethod] = useState('Credit Card (Visa/Mastercard)');
  const [issuedTicket, setIssuedTicket] = useState(null);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Clean up speech on unmount or close
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  // Toggle Voice Recognition
  const toggleVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please try Google Chrome or Microsoft Edge.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setSpeechStatusText('');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedSpeechLang;
      recognition.continuous = false;
      recognition.interimResults = true;

      const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedSpeechLang);

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechStatusText(`🎙️ Listening in ${currentLangObj?.label || 'Selected Language'}... Speak now!`);
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setInputVal(transcript);
        if (event.results[current].isFinal) {
          setIsListening(false);
          setSpeechStatusText('');
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setSpeechStatusText('');
      };

      recognition.onend = () => {
        setIsListening(false);
        setSpeechStatusText('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
      setSpeechStatusText('');
    }
  };

  // Text-to-Speech (TTS Audio Output)
  const speakMessageText = (text, msgId) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown characters for pleasant voice reading
    const cleanText = text
      .replace(/[*#_`~>•-]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/👋|✈️|🏨|🚗|💆|🍽️|🪑|💳|★|•|💵/g, '')
      .trim();

    const detectedLang = detectLanguage(cleanText);
    let voiceLocale = 'en-US';
    if (detectedLang === 'bn') voiceLocale = 'bn-BD';
    else if (detectedLang === 'de') voiceLocale = 'de-DE';
    else if (detectedLang === 'ar') voiceLocale = 'ar-SA';
    else if (detectedLang === 'fr') voiceLocale = 'fr-FR';
    else if (detectedLang === 'es') voiceLocale = 'es-ES';

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = voiceLocale;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setSpeakingMsgId(msgId);
    };

    utterance.onend = () => {
      setSpeakingMsgId(null);
    };

    utterance.onerror = () => {
      setSpeakingMsgId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Filtered prompt chips based on category
  const filteredPrompts = FREQUENT_QUESTIONS.filter(q => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'flights') return q.query.toLowerCase().includes('flight') || q.query.toLowerCase().includes('dubai') || q.query.includes('flüg');
    if (activeCategory === 'chauffeur_yacht') return q.query.toLowerCase().includes('rolls') || q.query.toLowerCase().includes('yacht');
    if (activeCategory === 'spa_wellness') return q.query.toLowerCase().includes('spa');
    if (activeCategory === 'rooms') return q.query.toLowerCase().includes('suite') || q.query.toLowerCase().includes('room') || q.query.includes('zimmer');
    if (activeCategory === 'dining_menu') return q.query.toLowerCase().includes('food') || q.query.toLowerCase().includes('chef');
    if (activeCategory === 'tables') return q.query.toLowerCase().includes('table') || q.query.toLowerCase().includes('terrace');
    if (activeCategory === 'invoices_billing') return q.query.toLowerCase().includes('payment') || q.query.toLowerCase().includes('bill');
    if (activeCategory === 'bn') return q.query.includes('বাংলা') || q.query.includes('বিমান');
    if (activeCategory === 'de') return q.query.includes('Flüg') || q.query.includes('Deutsch');
    if (activeCategory === 'ar') return q.query.includes('حجز') || q.query.includes('طيران');
    return true;
  });

  const handleSendMessage = async (customText) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim()) return;

    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      setIsListening(false);
      setSpeechStatusText('');
    }

    const userMsg = { 
      id: `u_${Date.now()}`,
      sender: 'user', 
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend })
      });
      
      if (res.ok) {
        const data = await res.json();
        const botMsg = {
          id: `b_${Date.now()}`,
          sender: 'bot',
          text: data.reply || data.message,
          recommendations: data.recommendations,
          suggestedAction: data.suggestedAction,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('Fallback to client knowledge');
      }
    } catch (err) {
      // Local client-side fallback knowledge engine
      const clientResult = queryClientKnowledge(textToSend, { rooms, menuItems, tables, orders });
      const fallbackMsg = {
        id: `b_${Date.now()}`,
        sender: 'bot',
        text: clientResult.reply,
        recommendations: clientResult.recommendations,
        suggestedAction: clientResult.suggestedAction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleClearChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: `👋 **AI ChatBoot Reset Complete.**
How may I assist you with airlines booking, suite reservations, chauffeur fleet, yacht charters, dining menus, or billing invoices today?

🎙️ *Feel free to speak in Bengali, English, German, Arabic, French, or Spanish!*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleOpenFlightBooking = (flight) => {
    setSelectedFlightForBooking(flight);
    setIssuedTicket(null);
    setSelectedClass('business');
    setSeatNumber('3A');
  };

  const handleConfirmFlightTicket = (e) => {
    e.preventDefault();
    if (!selectedFlightForBooking) return;

    const basePrice = selectedFlightForBooking.prices[selectedClass] || selectedFlightForBooking.prices.economy;
    const finalPrice = basePrice;
    const ticketRef = `GA-AIR-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTicket = {
      ticketNumber: ticketRef,
      airline: selectedFlightForBooking.airline,
      flightNumber: selectedFlightForBooking.flightNumber,
      aircraft: selectedFlightForBooking.aircraft,
      from: selectedFlightForBooking.from,
      to: selectedFlightForBooking.to,
      departure: selectedFlightForBooking.departureTime,
      arrival: selectedFlightForBooking.arrivalTime,
      duration: selectedFlightForBooking.duration,
      cabinClass: selectedClass === 'firstSuite' ? 'First Class Suite' : selectedClass === 'business' ? 'Business Class' : 'Economy Class',
      seat: seatNumber || '3A',
      passengerName: passengerName || 'Valued VIP Guest',
      passport: passengerPassport || 'A09823190',
      totalAmount: finalPrice,
      paymentMethod: flightPaymentMethod,
      gate: 'VIP Gate 04',
      terminal: 'Terminal 1 (Executive Concierge)',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setIssuedTicket(newTicket);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    // Add confirmation message to chat
    const ticketConfirmationMsg = {
      id: `ticket_${Date.now()}`,
      sender: 'bot',
      text: `🎉 **Airlines Ticket Successfully Confirmed & Boarding Pass Issued!**
• **Passenger**: ${newTicket.passengerName} (Passport: ${newTicket.passport})
• **Flight**: ${newTicket.airline} \`${newTicket.flightNumber}\` (${newTicket.from} ➔ ${newTicket.to})
• **Seat**: \`${newTicket.seat}\` (${newTicket.cabinClass})
• **Total Paid**: $${newTicket.totalAmount} via ${newTicket.paymentMethod}
• **e-Ticket Ref**: \`${newTicket.ticketNumber}\`

*Your digital boarding pass with VIP QR code has been generated below!*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, ticketConfirmationMsg]);
  };

  const renderFormattedText = (rawText) => {
    return (
      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ 
          __html: formatTextToHtml(rawText) 
        }} 
      />
    );
  };

  const formatTextToHtml = (text) => {
    if (!text) return '';
    return text
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="chat-code">$1</code>')
      .replace(/\$([0-9.]+)/g, '<span class="price-tag-inline">$$$1</span>');
  };

  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedSpeechLang) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      <div className="modal-overlay ai-chat-overlay" onClick={onClose}>
        <div 
          className={`modal-content ai-chat-modal ${isExpanded ? 'ai-chat-expanded' : ''} animate-fade-in`} 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="ai-chat-header">
            <div className="flex items-center gap-3">
              <div className="ai-avatar-badge robotic-badge">
                <img src={robotAvatar} alt="AI ChatBoot" className="modal-ai-robot-img" />
                <span className="robotic-status-dot"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white text-base font-bold">AI ChatBoot</h3>
                  <span className="ai-live-badge">Global Concierge & Aviation v3.0</span>
                </div>
                <p className="text-xs text-white opacity-80">
                  Multilingual Voice • Airlines & Flights • 6 Suites • Fine Dining • Chauffeur & Yacht
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                className="btn-ghost text-white text-xs p-1" 
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Standard Size (880px)" : "Wider Expanded View (1120px)"}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button 
                className="btn-ghost text-white text-xs p-1" 
                onClick={handleClearChat}
                title="Reset conversation"
              >
                <RotateCcw size={16} />
              </button>
              <button className="btn-ghost text-white p-1" onClick={onClose} title="Close AI ChatBoot">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Knowledge Explorer Category Pills */}
          <div className="ai-topic-bar">
            <div className="topic-bar-title">
              <Compass size={13} className="text-accent" />
              <span>Explore Concierge Services:</span>
            </div>
            <div className="topic-pills-scroll">
              <button 
                className={`topic-pill ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                🌐 All Services
              </button>
              <button 
                className={`topic-pill highlight-pill ${activeCategory === 'flights' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('flights');
                  handleSendMessage('Show available flight schedules and airlines tickets');
                }}
              >
                ✈️ Airlines & Flights
              </button>
              <button 
                className={`topic-pill ${activeCategory === 'chauffeur_yacht' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('chauffeur_yacht');
                  handleSendMessage('How can I book a Rolls-Royce Chauffeur or 65ft Private Yacht?');
                }}
              >
                🚗 Chauffeur & Yacht
              </button>
              <button 
                className={`topic-pill ${activeCategory === 'spa_wellness' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('spa_wellness');
                  handleSendMessage('What spa and wellness treatments are available?');
                }}
              >
                💆 Royal Spa & Wellness
              </button>
              <button 
                className={`topic-pill ${activeCategory === 'rooms' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('rooms');
                  handleSendMessage('Show available luxury suites and prices');
                }}
              >
                🏨 Luxury Suites
              </button>
              <button 
                className={`topic-pill ${activeCategory === 'dining_menu' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('dining_menu');
                  handleSendMessage('What are the chef specials and food menu?');
                }}
              >
                🍽️ Dining Menu
              </button>
              <button 
                className={`topic-pill ${activeCategory === 'tables' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('tables');
                  handleSendMessage('How can I reserve a dining table?');
                }}
              >
                🪑 Table Booking
              </button>
              <button 
                className={`topic-pill ${activeCategory === 'invoices_billing' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('invoices_billing');
                  handleSendMessage('What payment methods and billing invoices are supported?');
                }}
              >
                💳 Invoices & Payments
              </button>
              <button 
                className={`topic-pill ${activeCategory === 'bn' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('bn');
                  handleSendMessage('গ্র্যান্ড অরেলিয়া প্রজেক্টে বিমান টিকিট বুকিং ও সকল ফিচার সম্পর্কে বিস্তারিত বাংলায় জানাও');
                }}
              >
                🇧🇩 বাংলা গাইড
              </button>
              <button 
                className={`topic-pill ${activeCategory === 'de' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('de');
                  handleSendMessage('Welche Flüge und Luxus-Suiten kann ich im Grand Aurelia buchen?');
                }}
              >
                🇩🇪 Deutsch
              </button>
              <button 
                className={`topic-pill ${activeCategory === 'ar' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('ar');
                  handleSendMessage('كيف يمكنني حجز تذكرة طيران وجناح فاخر في فندق غراند أوريليا؟');
                }}
              >
                🇸🇦 العربية
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="ai-chat-body">
            {messages.map((m, idx) => (
              <div key={m.id || idx} className={`ai-message-row ${m.sender}`}>
                <div className="ai-message-avatar">
                  {m.sender === 'bot' ? (
                    <img src={robotAvatar} alt="AI Bot" className="chat-bot-robot-avatar" />
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <div className="ai-message-bubble">
                  {renderFormattedText(m.text)}

                  {/* Flight Schedules Cards & Instant Booking */}
                  {m.recommendations && m.recommendations.some(r => r.action === 'BOOK_FLIGHT' || r.flightData) && (
                    <div className="ai-flight-cards-grid mt-3">
                      {m.recommendations
                        .filter(r => r.action === 'BOOK_FLIGHT' || r.flightData)
                        .map((fl, fIdx) => (
                          <div key={fIdx} className="ai-flight-ticket-card">
                            <div className="flight-card-header">
                              <div className="flex items-center gap-2">
                                <Plane size={16} className="text-accent" />
                                <strong>{fl.title}</strong>
                              </div>
                              <span className="flight-price-tag">From ${fl.price || 380}</span>
                            </div>

                            <div className="flight-route-row">
                              <div className="route-stop">
                                <span className="airport-code">{fl.flightData?.from || 'DAC'}</span>
                                <span className="flight-time">{fl.flightData?.departureTime || '10:15 AM'}</span>
                              </div>
                              <div className="flight-duration-bar">
                                <span className="duration-text">{fl.flightData?.duration || 'Non-stop'}</span>
                                <div className="duration-line"></div>
                                <span className="aircraft-text">{fl.flightData?.aircraft || 'Boeing 777'}</span>
                              </div>
                              <div className="route-stop text-right">
                                <span className="airport-code">{fl.flightData?.to || 'DXB'}</span>
                                <span className="flight-time">{fl.flightData?.arrivalTime || '01:45 PM'}</span>
                              </div>
                            </div>

                            <div className="flight-tiers-pills">
                              <span className="tier-pill">Eco: ${fl.flightData?.prices?.economy || fl.price || 380}</span>
                              <span className="tier-pill business">Biz: ${fl.flightData?.prices?.business || 850}</span>
                              <span className="tier-pill first">First: ${fl.flightData?.prices?.firstSuite || 1650}</span>
                            </div>

                            <button 
                              className="btn btn-accent btn-sm w-full mt-2"
                              onClick={() => handleOpenFlightBooking(fl.flightData || FLIGHT_SCHEDULES[0])}
                            >
                              <Ticket size={14} /> Book Flight & Issue Boarding Pass
                            </button>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Standard Recommendations (Rooms, Dishes) */}
                  {m.recommendations && m.recommendations.some(r => r.action !== 'BOOK_FLIGHT' && !r.flightData) && (
                    <div className="ai-rec-cards-list mt-3">
                      {m.recommendations
                        .filter(r => r.action !== 'BOOK_FLIGHT' && !r.flightData)
                        .map((rec, rIdx) => (
                          <div key={rIdx} className="ai-rec-card">
                            {rec.image && (
                              <img src={rec.image} alt={rec.title} className="ai-rec-img" />
                            )}
                            <div className="ai-rec-info">
                              <strong>{rec.title}</strong>
                              <span className="text-xs text-muted block">{rec.subtitle}</span>
                            </div>
                            <button 
                              className="btn btn-accent btn-sm"
                              onClick={() => {
                                if (rec.action === 'VIEW_ROOM' || rec.target === 'hotel') {
                                  onNavigate('hotel');
                                  onClose();
                                } else if (rec.action === 'ORDER_FOOD' || rec.target === 'delivery') {
                                  onNavigate('delivery');
                                  onClose();
                                } else {
                                  onNavigate(rec.target || 'hotel');
                                  onClose();
                                }
                              }}
                            >
                              View <ArrowRight size={12} />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Suggested Action CTA */}
                  {m.suggestedAction && (
                    <div className="mt-3">
                      <button 
                        className="btn btn-primary btn-sm w-full shadow-sm"
                        onClick={() => {
                          const target = m.suggestedAction.target;
                          if (target === 'flight-modal') {
                            handleOpenFlightBooking(FLIGHT_SCHEDULES[0]);
                          } else if (target === 'hotel-rooms' || target === 'hotel') {
                            onNavigate('hotel');
                            onClose();
                          } else if (target === 'restaurant-menu' || target === 'delivery') {
                            onNavigate('delivery');
                            onClose();
                          } else if (target === 'table-reservations' || target === 'restaurant') {
                            onNavigate('restaurant');
                            onClose();
                          } else if (target === 'kds') {
                            onNavigate('kds');
                            onClose();
                          } else if (target === 'housekeeping') {
                            onNavigate('housekeeping');
                            onClose();
                          } else if (target === 'invoices') {
                            onNavigate('invoices');
                            onClose();
                          } else if (target === 'overview') {
                            onNavigate('overview');
                            onClose();
                          } else {
                            onNavigate('hotel');
                            onClose();
                          }
                        }}
                      >
                        <Sparkles size={14} className="text-accent" /> {m.suggestedAction.label}
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs opacity-75 mt-2 pt-1.5 border-t border-color-subtle">
                    <span>{m.timestamp || 'Just now'}</span>
                    
                    <div className="flex items-center gap-2">
                      {/* Text-to-Speech Speak Button */}
                      {m.sender === 'bot' && (
                        <button 
                          className={`btn-tts-listen ${speakingMsgId === (m.id || idx) ? 'speaking' : ''}`}
                          onClick={() => speakMessageText(m.text, m.id || idx)}
                          title={speakingMsgId === (m.id || idx) ? "Stop speaking" : "Listen to answer (Audio TTS)"}
                        >
                          {speakingMsgId === (m.id || idx) ? <VolumeX size={13} /> : <Volume2 size={13} />}
                          <span>{speakingMsgId === (m.id || idx) ? 'Stop Voice' : 'Listen 🔊'}</span>
                        </button>
                      )}

                      {m.sender === 'bot' && (
                        <button 
                          className="btn-ghost text-xs p-1 opacity-80 hover:opacity-100 flex items-center gap-1 text-muted"
                          onClick={() => copyToClipboard(m.text, idx)}
                          title="Copy response"
                        >
                          {copiedIdx === idx ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                          <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row bot">
                <div className="ai-message-avatar">
                  <img src={robotAvatar} alt="AI Bot" className="chat-bot-robot-avatar" />
                </div>
                <div className="ai-message-bubble typing-bubble">
                  <div className="flex items-center gap-2">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <span className="text-xs text-muted ml-1">AI ChatBoot is retrieving concierge data...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Question Prompts Bar */}
          <div className="ai-quick-prompts">
            {filteredPrompts.slice(0, 4).map((prompt, pIdx) => (
              <button 
                key={pIdx} 
                className="quick-prompt-pill"
                onClick={() => handleSendMessage(prompt.query)}
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Live Voice Recording Status Bar */}
          {isListening && (
            <div className="ai-voice-listening-bar animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="voice-pulse-indicator"></div>
                <div className="voice-wave-eq">
                  <span></span><span></span><span></span><span></span>
                </div>
                <span className="voice-status-text">{speechStatusText || 'Listening... Speak now'}</span>
              </div>
              <button 
                type="button" 
                className="btn btn-sm btn-outline-danger" 
                onClick={toggleVoiceRecognition}
              >
                Stop Recording
              </button>
            </div>
          )}

          {/* Expanded Rich Input Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }} 
            className="ai-chat-input-bar wider-input-bar"
          >
            {/* Language Selector Dropdown Pill */}
            <div className="speech-lang-container">
              <button 
                type="button" 
                className="btn-speech-lang-pill"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                title="Change Speech / Voice Language"
              >
                <span className="flag-icon">{activeLangObj.flag}</span>
                <span className="lang-short">{activeLangObj.short}</span>
                <Languages size={12} className="opacity-60" />
              </button>

              {showLangDropdown && (
                <div className="speech-lang-dropdown shadow-lg animate-fade-in">
                  <div className="dropdown-title">Select Speech / Input Language:</div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      className={`lang-option-row ${selectedSpeechLang === lang.code ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedSpeechLang(lang.code);
                        setShowLangDropdown(false);
                      }}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="font-semibold text-xs flex-1 text-left">{lang.label}</span>
                      {selectedSpeechLang === lang.code && <Check size={14} className="text-accent" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Field with Clear Button */}
            <div className="input-with-icon flex-1 relative-input-wrap">
              <Search size={16} className="input-icon" />
              <input 
                ref={inputRef}
                type="text" 
                placeholder={`Ask in ${activeLangObj.short}, English, Deutsch, العربية (Flights, Suites, Yacht, Menu)...`} 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="form-control with-icon ai-input-wide"
                autoFocus
              />
              {inputVal && (
                <button 
                  type="button" 
                  className="btn-clear-input"
                  onClick={() => setInputVal('')}
                  title="Clear text"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Colorful Microphone Voice Input Button */}
            <button 
              type="button"
              className={`btn ai-mic-btn ${isListening ? 'listening-active' : ''}`}
              onClick={toggleVoiceRecognition}
              title={isListening ? "Stop voice listening" : `Voice Input (${activeLangObj.label}) - Click to speak!`}
            >
              {isListening ? <MicOff size={20} className="mic-icon-svg" /> : <Mic size={20} className="mic-icon-svg" />}
              <span className="mic-voice-tag">{isListening ? 'REC' : 'VOICE'}</span>
            </button>

            {/* Send Button */}
            <button 
              type="submit" 
              className="btn btn-accent ai-send-btn" 
              disabled={!inputVal.trim()}
              title="Send query"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FLIGHT TICKET BOOKING & DIGITAL BOARDING PASS MODAL */}
      {/* ========================================================= */}
      {selectedFlightForBooking && (
        <div className="modal-overlay flight-booking-overlay" onClick={() => setSelectedFlightForBooking(null)}>
          <div className="modal-content flight-booking-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div className="modal-icon-badge bg-primary-subtle text-primary">
                  <Plane size={22} className="text-accent" />
                </div>
                <div>
                  <h3>Airlines Ticket Reservation & Boarding Pass</h3>
                  <p className="text-xs text-muted">
                    {selectedFlightForBooking.airline} • Flight {selectedFlightForBooking.flightNumber} • {selectedFlightForBooking.aircraft}
                  </p>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedFlightForBooking(null)}>
                <X size={20} />
              </button>
            </div>

            {!issuedTicket ? (
              <form onSubmit={handleConfirmFlightTicket} className="modal-body">
                {/* Flight Route Summary Box */}
                <div className="flight-summary-banner">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase text-muted font-bold tracking-wider">Origin</span>
                      <h4 className="text-lg font-bold">{selectedFlightForBooking.from}</h4>
                      <span className="text-sm font-semibold text-primary">{selectedFlightForBooking.departureTime}</span>
                    </div>
                    <div className="flex flex-col items-center px-4">
                      <span className="text-xs text-muted font-medium">{selectedFlightForBooking.duration}</span>
                      <div className="flight-airplane-path">
                        <div className="path-dot"></div>
                        <div className="path-line"></div>
                        <Plane size={16} className="text-accent" />
                        <div className="path-line"></div>
                        <div className="path-dot"></div>
                      </div>
                      <span className="text-xs text-success font-semibold">Direct VIP Route</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase text-muted font-bold tracking-wider">Destination</span>
                      <h4 className="text-lg font-bold">{selectedFlightForBooking.to}</h4>
                      <span className="text-sm font-semibold text-primary">{selectedFlightForBooking.arrivalTime}</span>
                    </div>
                  </div>
                </div>

                {/* Cabin Class Selection */}
                <div className="form-section-header mt-4">
                  <Award size={15} /> Select Cabin Class
                </div>
                <div className="cabin-classes-grid">
                  <label className={`cabin-option-card ${selectedClass === 'economy' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="cabinClass" 
                      value="economy" 
                      checked={selectedClass === 'economy'} 
                      onChange={() => { setSelectedClass('economy'); setSeatNumber('18F'); }}
                    />
                    <div>
                      <strong>Economy Class</strong>
                      <span>30kg Baggage • Standard Meals</span>
                      <div className="cabin-price">${selectedFlightForBooking.prices.economy}</div>
                    </div>
                  </label>

                  <label className={`cabin-option-card ${selectedClass === 'business' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="cabinClass" 
                      value="business" 
                      checked={selectedClass === 'business'} 
                      onChange={() => { setSelectedClass('business'); setSeatNumber('3A'); }}
                    />
                    <div>
                      <strong className="text-primary">Business Class</strong>
                      <span>40kg • Lie-Flat Bed • VIP Lounge</span>
                      <div className="cabin-price">${selectedFlightForBooking.prices.business}</div>
                    </div>
                  </label>

                  <label className={`cabin-option-card ${selectedClass === 'firstSuite' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="cabinClass" 
                      value="firstSuite" 
                      checked={selectedClass === 'firstSuite'} 
                      onChange={() => { setSelectedClass('firstSuite'); setSeatNumber('1A'); }}
                    />
                    <div>
                      <strong className="text-accent">First Class Suite</strong>
                      <span>50kg • Private Cabin • Chauffeur</span>
                      <div className="cabin-price">${selectedFlightForBooking.prices.firstSuite}</div>
                    </div>
                  </label>
                </div>

                {/* Passenger Information */}
                <div className="form-section-header mt-4">
                  <User size={15} /> Primary Passenger Details
                </div>
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label>Passenger Full Legal Name (as in Passport) *</label>
                    <input 
                      type="text" 
                      required 
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label>Passport Number *</label>
                    <input 
                      type="text" 
                      required 
                      value={passengerPassport}
                      onChange={(e) => setPassengerPassport(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label>Seat Preference</label>
                    <input 
                      type="text" 
                      value={seatNumber}
                      onChange={(e) => setSeatNumber(e.target.value)}
                      placeholder="e.g. 1A, 3K, 12F" 
                      className="form-control"
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label>Payment Channel</label>
                    <select 
                      value={flightPaymentMethod}
                      onChange={(e) => setFlightPaymentMethod(e.target.value)}
                      className="form-control"
                    >
                      <option value="Credit Card (Visa/Mastercard/Amex)">Credit Card (Visa / Mastercard / Amex)</option>
                      <option value="bKash Digital Wallet">bKash Instant Mobile Payment</option>
                      <option value="Nagad Digital Banking">Nagad Digital Wallet</option>
                      <option value="Corporate Bill Account">Grand Aurelia Corporate Folio</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer mt-4">
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedFlightForBooking(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-accent btn-lg">
                    <Check size={18} /> Confirm Ticket & Issue Boarding Pass
                  </button>
                </div>
              </form>
            ) : (
              /* Digital Boarding Pass View */
              <div className="modal-body boarding-pass-container animate-fade-in">
                <div className="boarding-pass-card">
                  <div className="boarding-pass-top">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Plane size={20} className="text-white" />
                        <span className="font-bold tracking-wider">{issuedTicket.airline}</span>
                      </div>
                      <span className="boarding-pass-badge">{issuedTicket.cabinClass}</span>
                    </div>
                  </div>

                  <div className="boarding-pass-body">
                    <div className="pass-route-row">
                      <div className="route-col">
                        <span className="route-city">{issuedTicket.from.split(' ')[0]}</span>
                        <span className="route-airport">{issuedTicket.from}</span>
                        <span className="route-time">{issuedTicket.departure}</span>
                      </div>
                      <div className="route-mid">
                        <Plane size={22} className="text-accent" />
                        <span className="flight-id-tag">{issuedTicket.flightNumber}</span>
                        <span className="flight-nonstop">{issuedTicket.duration}</span>
                      </div>
                      <div className="route-col text-right">
                        <span className="route-city">{issuedTicket.to.split(' ')[0]}</span>
                        <span className="route-airport">{issuedTicket.to}</span>
                        <span className="route-time">{issuedTicket.arrival}</span>
                      </div>
                    </div>

                    <div className="pass-details-grid">
                      <div className="pass-detail-item">
                        <span className="label">Passenger</span>
                        <strong>{issuedTicket.passengerName}</strong>
                      </div>
                      <div className="pass-detail-item">
                        <span className="label">Passport #</span>
                        <strong>{issuedTicket.passport}</strong>
                      </div>
                      <div className="pass-detail-item">
                        <span className="label">Date</span>
                        <strong>{issuedTicket.date}</strong>
                      </div>
                      <div className="pass-detail-item">
                        <span className="label">Seat</span>
                        <strong className="text-accent text-lg">{issuedTicket.seat}</strong>
                      </div>
                      <div className="pass-detail-item">
                        <span className="label">Gate</span>
                        <strong>{issuedTicket.gate}</strong>
                      </div>
                      <div className="pass-detail-item">
                        <span className="label">Terminal</span>
                        <strong>{issuedTicket.terminal}</strong>
                      </div>
                      <div className="pass-detail-item">
                        <span className="label">e-Ticket Ref</span>
                        <strong>{issuedTicket.ticketNumber}</strong>
                      </div>
                      <div className="pass-detail-item">
                        <span className="label">Total Paid</span>
                        <strong className="text-success">${issuedTicket.totalAmount}</strong>
                      </div>
                    </div>

                    <div className="pass-barcode-row">
                      <div className="barcode-mock"></div>
                      <div className="flex items-center gap-2">
                        <QrCode size={44} className="text-primary" />
                        <span className="text-xs text-muted">Scan at VIP Gate & Lounge</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer mt-4">
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={() => {
                      window.print();
                    }}
                  >
                    <Printer size={16} /> Print Boarding Pass
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedFlightForBooking(null);
                      setIssuedTicket(null);
                    }}
                  >
                    <Check size={16} /> Done (Ticket Added to Profile)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
