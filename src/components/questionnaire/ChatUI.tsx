import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { ChatMessage, type ChatMessageData } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { ProgressBar } from './ProgressBar';
import { PriceReveal } from './PriceReveal';
import { QuestionnaireEngine, engineResponseToChatMessage } from '../../lib/questionnaireEngine';
import { QUESTIONNAIRE_SYSTEM_PROMPT } from '../../lib/prompts/questionnaireSystemPrompt';
import { QuestionnaireAnalytics } from '../../lib/questionnaireAnalytics';

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
  const [showPriceReveal, setShowPriceReveal] = useState(false);
  const [showSessionRecovery, setShowSessionRecovery] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const engine = useMemo(() => new QuestionnaireEngine(QUESTIONNAIRE_SYSTEM_PROMPT), []);

  // Check for pending session on load
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // If a previous completed session is still in localStorage, reset it.
    // Otherwise engine.isComplete=true would permanently disable the input.
    if (engine.isComplete) {
      engine.reset();
    }

    const pendingSession = QuestionnaireAnalytics.getPendingSession();
    if (pendingSession) {
      setShowSessionRecovery(true);
    } else {
      showWelcomeSequence();
    }

    // Cleanup any truly abandoned sessions in the background
    QuestionnaireAnalytics.cleanupAbandonedSessions();
  }, [engine]);

  const handleRecoverSession = (recover: boolean) => {
    setShowSessionRecovery(false);

    if (recover) {
      const pendingSession = QuestionnaireAnalytics.getPendingSession();
      // Engine state uses `history` (ConversationMessage[]), not `messages`
      if (pendingSession && Array.isArray(pendingSession.history) && pendingSession.history.length > 0) {
        // Convert engine ConversationMessage[] → ChatMessageData[] for display
        const restored: ChatMessageData[] = pendingSession.history.map(
          (m: { role: 'user' | 'model'; parts: { text: string }[] }, i: number) => ({
            id: `recovered-${i}`,
            role: m.role === 'user' ? 'user' : 'bot',
            content: m.parts?.[0]?.text ?? '',
            timestamp: Date.now() - (pendingSession.history.length - i) * 1000,
          })
        );
        setMessages(restored);
        setProgress(pendingSession.progress ?? 0);
        return;
      }
    }

    // If not recovering (or no valid session), reset engine and start welcome sequence
    engine.reset();
    showWelcomeSequence();
  };

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
    try {
      for (let i = 0; i < WELCOME_MESSAGES.length; i++) {
        await delay(800 + i * 400);
        setMessages((prev) => [...prev, WELCOME_MESSAGES[i]]);
      }
    } finally {
      setIsTyping(false);
    }
  }

  /** Handle component completion — mark as completed and treat result as a user response */
  const handleComponentComplete = useCallback((messageId: string, data: unknown) => {
    // Mark the component as completed (greyed out)
    setMessages((prev) =>
      prev.map((m) => m.id === messageId ? { ...m, componentCompleted: true } : m)
    );
    const text = data === null ? '' : (typeof data === 'string' ? data : JSON.stringify(data));
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
      if (response.isComplete) {
        // Short delay so the user reads the final summary, then show price reveal
        setTimeout(() => setShowPriceReveal(true), 2000);
      }
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

  if (showPriceReveal && engine.extractedData) {
    return (
      <div className="flex flex-col h-full">
        <ProgressBar progress={100} />
        <PriceReveal
          extractedData={engine.extractedData}
          onGoBack={() => setShowPriceReveal(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      <ProgressBar progress={progress} />

      {/* Session Recovery Modal */}
      {showSessionRecovery && (
        <div className="absolute inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-lg font-medium text-white mb-2">Conversación pausada</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Tienes una consulta sin terminar. ¿Quieres continuar donde lo dejaste o empezar una nueva consulta?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleRecoverSession(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-medium transition-colors"
              >
                Continuar consulta
              </button>
              <button 
                onClick={() => handleRecoverSession(false)}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-lg font-medium transition-colors"
              >
                Empezar de nuevo
              </button>
            </div>
          </div>
        </div>
      )}

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
