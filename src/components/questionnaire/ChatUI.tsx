import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { ChatMessage, type ChatMessageData } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { ProgressBar } from './ProgressBar';

const STORAGE_KEY = 'tb_questionnaire_chat';

const WELCOME_MESSAGES: ChatMessageData[] = [
  {
    id: 'welcome-1',
    role: 'bot',
    content: '¡Hola! 👋 Soy el asistente de Think Better. Estoy aquí para entender tu proyecto y ayudarte a obtener una propuesta personalizada.',
    timestamp: Date.now(),
  },
  {
    id: 'welcome-2',
    role: 'bot',
    content: 'Te haré una serie de preguntas sobre tu idea, necesidades y preferencias. No te preocupes, puedes tomarte tu tiempo — la conversación se guarda automáticamente.',
    timestamp: Date.now() + 100,
  },
  {
    id: 'welcome-3',
    role: 'bot',
    content: 'Para empezar, ¿cómo te llamas y cuál es el nombre de tu empresa o proyecto?',
    timestamp: Date.now() + 200,
  },
];

export function ChatUI() {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Load from localStorage or show welcome
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          setMessages(parsed.messages);
          setProgress(parsed.progress ?? 0);
          return;
        }
      } catch { /* ignore corrupt data */ }
    }

    // Show welcome with staggered typing effect
    showWelcomeSequence();
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, progress }));
    }
  }, [messages, progress]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  async function showWelcomeSequence() {
    setIsTyping(true);
    for (let i = 0; i < WELCOME_MESSAGES.length; i++) {
      await delay(800 + i * 400);
      setMessages((prev) => [...prev, WELCOME_MESSAGES[i]]);
    }
    setIsTyping(false);
  }

  const handleSend = useCallback((text: string) => {
    const userMsg: ChatMessageData = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate bot response (will be replaced by real Gemini API in #202)
    setIsTyping(true);
    const userMsgCount = messages.filter((m) => m.role === 'user').length + 1;
    const newProgress = Math.min(95, userMsgCount * 5);
    setProgress(newProgress);

    setTimeout(() => {
      const botReply: ChatMessageData = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        content: getBotReply(userMsgCount),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <ProgressBar progress={progress} />

      {/* Messages area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Temporary bot replies until Gemini integration (#202) */
function getBotReply(questionNumber: number): string {
  const replies: Record<number, string> = {
    1: '¡Encantado de conocerte! 🙌\n\n¿Qué tipo de proyecto tienes en mente? Por ejemplo: página web, aplicación móvil, plataforma SaaS, e-commerce, automatización...',
    2: 'Muy interesante. ¿Podrías contarme un poco más sobre tu negocio? ¿A qué se dedica y quién es tu público objetivo?',
    3: '¿Tienes alguna referencia visual o web que te inspire? Pueden ser competidores, webs que te gustan, o incluso capturas de pantalla.',
    4: '¿Cuáles son las funcionalidades principales que necesitas? Por ejemplo: registro de usuarios, pagos, panel de administración, chat, etc.',
    5: '¿Tienes ya una identidad visual (logo, colores, tipografía) o necesitas que la creemos?',
    6: '¿Cuál es tu presupuesto aproximado y en qué plazo te gustaría tener el proyecto listo?',
    7: '¿Hay algo más que quieras contarme sobre el proyecto? Cualquier detalle nos ayuda a preparar una propuesta más precisa.',
  };
  return replies[questionNumber] ?? 'Gracias por la información. Déjame anotar eso. ¿Hay algo más que quieras añadir?';
}
