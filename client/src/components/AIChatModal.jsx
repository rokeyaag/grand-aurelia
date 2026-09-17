import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  X, 
  Building, 
  Utensils, 
  ArrowRight,
  Check
} from 'lucide-react';

export default function AIChatModal({ isOpen, onClose, onNavigate, onAddToCart }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Welcome to International Hospitality Group! I am your 24/7 AI Concierge. How may I elevate your stay today?',
      recommendations: [
        { title: 'Prime Wagyu Ribeye Steak', subtitle: 'Chef Special • $42.00', action: 'NAVIGATE', target: 'delivery' },
        { title: 'Deluxe Ocean Suite', subtitle: 'Panoramic View • $180/night', action: 'NAVIGATE', target: 'hotel' }
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Show available luxury suites',
    'Recommend chef dinner specials',
    'Need fresh towels in Room 101',
    'Book table at Terrace Garden'
  ];

  const handleSendMessage = async (customText) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setInputVal('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend })
      });
      const data = await res.json();

      setIsTyping(false);
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: data.reply,
          recommendations: data.recommendations || [],
          suggestedAction: data.suggestedAction
        }
      ]);
    } catch (err) {
      setIsTyping(false);
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: 'I apologize, I am temporarily having trouble reaching our concierge services. Please feel free to navigate directly through the top menu.'
        }
      ]);
    }
  };

  return (
    <div className="modal-overlay ai-chat-overlay">
      <div className="modal-content ai-chat-modal">
        {/* Header */}
        <div className="ai-chat-header">
          <div className="flex items-center gap-2">
            <div className="ai-avatar-badge">
              <Sparkles size={18} />
            </div>
            <div>
              <h3>IHG AI Smart Concierge</h3>
              <span className="text-xs text-white opacity-80">24/7 AI-Powered Hospitality Intelligence</span>
            </div>
          </div>
          <button className="btn-ghost text-white" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="ai-chat-body">
          {messages.map((m, idx) => (
            <div key={idx} className={`ai-message-row ${m.sender}`}>
              <div className="ai-message-avatar">
                {m.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="ai-message-bubble">
                <p>{m.text}</p>

                {/* Recommendations Cards */}
                {m.recommendations && m.recommendations.length > 0 && (
                  <div className="ai-rec-cards-list mt-2">
                    {m.recommendations.map((rec, rIdx) => (
                      <div key={rIdx} className="ai-rec-card">
                        <div className="ai-rec-info">
                          <strong>{rec.title}</strong>
                          <span className="text-xs text-muted block">{rec.subtitle}</span>
                        </div>
                        <button 
                          className="btn btn-accent btn-sm"
                          onClick={() => {
                            if (rec.action === 'NAVIGATE' || rec.action === 'VIEW_ROOM') {
                              onNavigate(rec.target || 'hotel');
                              onClose();
                            } else if (rec.action === 'ORDER_FOOD') {
                              onNavigate('delivery');
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
                  <div className="mt-2">
                    <button 
                      className="btn btn-primary btn-sm w-full"
                      onClick={() => {
                        if (m.suggestedAction.target === 'hotel-rooms') onNavigate('hotel');
                        else if (m.suggestedAction.target === 'restaurant-menu') onNavigate('delivery');
                        else if (m.suggestedAction.target === 'table-reservations') onNavigate('restaurant');
                        else onNavigate('hotel');
                        onClose();
                      }}
                    >
                      <Sparkles size={14} /> {m.suggestedAction.label}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="ai-message-row bot">
              <div className="ai-message-avatar"><Bot size={16} /></div>
              <div className="ai-message-bubble typing-bubble">
                <span>AI Concierge is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="ai-quick-prompts">
          {quickPrompts.map((prompt, pIdx) => (
            <button 
              key={pIdx} 
              className="quick-prompt-pill"
              onClick={() => handleSendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }} 
          className="ai-chat-input-bar"
        >
          <input 
            type="text" 
            placeholder="Ask AI about rooms, menu recommendations, housekeeping..." 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="ai-input"
          />
          <button type="submit" className="btn btn-accent ai-send-btn">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
