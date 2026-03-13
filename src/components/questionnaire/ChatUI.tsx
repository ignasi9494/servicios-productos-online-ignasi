import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { ChatMessage, type ChatMessageData } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { ProgressBar } from './ProgressBar';
import { QuestionnaireEngine, engineResponseToChatMessage } from '../../lib/questionnaireEngine';
import { QUESTIONNAIRE_SYSTEM_PROMPT } from '../../lib/prompts/questionnaireSystemPrompt';

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

  const engine = useMemo(() => new QuestionnaireEngine(QUESTIONNAIRE_SYSTEM_PROMPT), []);

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

  /** Handle component completion — treat the result as a user response */
  const handleComponentComplete = useCallback((data: unknown) => {
    const text = typeof data === 'string' ? data : JSON.stringify(data);
    sendToEngine({
      text,
      selectedOption: typeof data === 'string' ? data : Array.isArray(data) ? data : undefined,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Core send function — talks to the engine */
  const sendToEngine = useCallback(async (params: {
    text?: string;
    selectedOption?: string | string[];
    uploadedFiles?: { name: string; size: number; type: string }[];
  }) => {
    const displayText = params.text ?? '';
    if (displayText) {
      const userMsg: ChatMessageData = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: displayText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
    }

    setIsTyping(true);

    try {
      const response = await engine.sendMessage(params);
      const botMsg = engineResponseToChatMessage(response, handleComponentComplete);
      setMessages((prev) => [...prev, botMsg]);
      setProgress(response.progressPercent);
    } catch (err) {
      console.error('[ChatUI] Engine error:', err);
      const errorMsg: ChatMessageData = {
        id: `bot-error-${Date.now()}`,
        role: 'bot',
        content: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [engine, handleComponentComplete]);

  const handleSend = useCallback((text: string) => {
    sendToEngine({ text });
  }, [sendToEngine]);

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
      <ChatInput onSend={handleSend} disabled={isTyping || engine.isComplete} />
    </div>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
