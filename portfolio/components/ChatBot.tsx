"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, GripHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
// import { getChatResponse } from '../services/geminiServices';
import { soundManager } from '../lib/soundManager';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('brickbot_history');
    return saved ? JSON.parse(saved) : [
      { role: 'model', text: "Hi there! I'm BrickBot. Ask me anything about Nishant's work or how to find those hidden golden bricks!" }
    ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    localStorage.setItem('brickbot_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    soundManager.play('click');

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    // const response = await getChatResponse(userMessage, history);
    
    // setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
    soundManager.play('snap');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            data-cursor="default"
            className="absolute bottom-20 right-0 w-[350px] min-w-[280px] min-h-[400px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-10rem)] bg-white dark:bg-card border-4 border-black dark:border-white lego-shadow flex flex-col overflow-hidden resize both cursor-auto"
            style={{ 
              resize: 'both',
              overflow: 'hidden'
            }}
          >
            {/* Header / Drag Handle */}
            <div 
              onPointerDown={(e) => dragControls.start(e)}
              className="bg-[#E3000B] p-3 flex justify-between items-center border-b-4 border-black dark:border-white cursor-move active:cursor-grabbing select-none"
            >
              <div className="flex items-center gap-2 text-white">
                <Bot className="w-5 h-5" />
                <span className="font-black uppercase tracking-tighter text-sm">BrickBot AI</span>
              </div>
              <div className="flex items-center gap-1">
                <GripHorizontal className="w-4 h-4 text-white/50" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-black/20 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F5F0] dark:bg-black/20 custom-scrollbar"
              style={{ height: '100%' }}
            >
              <div ref={scrollRef} className="space-y-4 pb-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 lego-border-sm ${
                      m.role === 'user' 
                        ? 'bg-[#0055BF] text-white' 
                        : 'bg-white dark:bg-muted text-black dark:text-white'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                          {m.role === 'user' ? 'You' : 'BrickBot'}
                        </span>
                      </div>
                      <p className="text-sm font-bold leading-relaxed break-words">{m.text}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-muted p-3 lego-border-sm animate-pulse">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#E3000B] rounded-full" />
                        <div className="w-2 h-2 bg-[#FFD500] rounded-full" />
                        <div className="w-2 h-2 bg-[#0055BF] rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-card border-t-4 border-black dark:border-white flex gap-2 mt-auto cursor-auto">
              <Input 
                placeholder="Ask about Nishant..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="lego-border font-bold h-10 cursor-text"
              />
              <Button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-[#009639] hover:bg-[#009639]/90 text-white lego-border lego-shadow-sm h-10 px-3 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Resize Handle Visual */}
            <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-0.5 pointer-events-none">
              <div className="w-2 h-2 border-r-2 border-b-2 border-black/20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(!isOpen);
          soundManager.play('click');
        }}
        className="w-16 h-16 bg-[#E3000B] text-white lego-border lego-shadow flex items-center justify-center relative group"
      >
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#E3000B] lego-border rounded-full group-hover:scale-125 transition-transform" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#E3000B] lego-border rounded-full group-hover:scale-125 transition-transform" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#E3000B] lego-border rounded-full group-hover:scale-125 transition-transform" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#E3000B] lego-border rounded-full group-hover:scale-125 transition-transform" />
        
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        
        {!isOpen && (
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-4 h-4 text-[#FFD500] animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
