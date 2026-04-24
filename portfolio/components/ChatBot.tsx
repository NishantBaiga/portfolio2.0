"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  GripHorizontal,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { soundManager } from "../lib/soundManager";

interface Message {
  role: "user" | "model";
  text: string;
}

export function ChatBot() {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [input, setInput] = useState("");
  //   const [messages, setMessages] = useState<Message[]>([
  //     {
  //       role: "model",
  //       text: "Hi there! I'm BrickBot. Ask me anything about Nishant's work or hunt for golden bricks 🧱✨",
  //     },
  //   ]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [sessionId, setSessionId] = useState<string | null>(null);

  //   const scrollRef = useRef<HTMLDivElement>(null);
  //   const dragControls = useDragControls();

  //   // Auto scroll
  //   useEffect(() => {
  //     if (scrollRef.current) {
  //       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //     }
  //   }, [messages, isOpen]);

  //   useEffect(() => {
  //   let existing = localStorage.getItem("chat_session_id");

  //   if (!existing) {
  //     existing = crypto.randomUUID(); // 🔥 generate unique session
  //     localStorage.setItem("chat_session_id", existing);
  //   }

  //   setSessionId(existing);
  // }, []);

  //   // Send message
  //   const handleSend = async () => {
  //     // if (!input.trim() || isLoading) return;
  //     if (!input.trim() || isLoading || !sessionId) return;

  //     const userMessage = input.trim();
  //     setInput("");
  //     setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
  //     setIsLoading(true);
  //     soundManager.play("click");

  //     try {
  //       const res = await fetch("/api/chat", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           message: userMessage,
  //           sessionId,
  //         }),
  //       });

  //       const data = await res.json();

  //       if (data.success) {
  //         setMessages((prev) => [
  //           ...prev,
  //           { role: "model", text: data.message },
  //         ]);
  //         setSessionId(data.sessionId);
  //         soundManager.play("snap");
  //       } else {
  //         setMessages((prev) => [
  //           ...prev,
  //           {
  //             role: "model",
  //             text: "Something broke in the brick factory 🧱 Try again!",
  //           },
  //         ]);
  //       }
  //     } catch (error) {
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           role: "model",
  //           text: "Server is sleeping 😴 Try again later!",
  //         },
  //       ]);
  //     }

  //     setIsLoading(false);
  //   };

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi there! I'm BrickBot. Ask me anything about Nishant's work or hunt for golden bricks 🧱✨",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // ✅ Generate / restore sessionId
  useEffect(() => {
    let existing = localStorage.getItem("chat_session_id");

    if (!existing) {
      existing = crypto.randomUUID(); // unique session
      localStorage.setItem("chat_session_id", existing);
    }

    setSessionId(existing);
  }, []);

  // ✅ Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // ✅ Send message
  const handleSend = async () => {
    if (!input.trim() || isLoading || !sessionId) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);
    soundManager.play("click");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "model", text: data.message }]);
        soundManager.play("snap");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "Something broke in the brick factory 🧱 Try again!",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Server is sleeping 😴 Try again later!",
        },
      ]);
    }

    setIsLoading(false);
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
            className="absolute bottom-20 right-0 w-[350px] min-w-[280px] min-h-[400px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-10rem)] bg-white border-4 border-black lego-shadow flex flex-col overflow-hidden resize both"
          >
            {/* Header */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="bg-[#E3000B] p-3 flex justify-between items-center border-b-4 border-black cursor-move"
            >
              <div className="flex items-center gap-2 text-white">
                <Bot className="w-5 h-5" />
                <span className="font-black text-sm uppercase">
                  BrickBot AI
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsOpen(false);
                  soundManager.play("click");
                }}
                className="text-white hover:bg-black/20 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#F5F5F0]">
              <div ref={scrollRef} className="space-y-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 lego-border-sm ${
                        m.role === "user"
                          ? "bg-[#0055BF] text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <p className="text-sm font-bold">{m.text}</p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 lego-border-sm animate-pulse">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t-4 border-black flex gap-2">
              <Input
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="lego-border font-bold"
              />

              <Button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-[#009639] text-white lego-border"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(!isOpen);
          soundManager.play("click");
        }}
        className="w-16 h-16 bg-[#E3000B] text-white lego-border lego-shadow flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <MessageSquare className="w-8 h-8" />
        )}

        {!isOpen && (
          <Sparkles className="absolute top-1 right-1 w-4 h-4 text-yellow-400 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
