import React from 'react';
import { motion } from 'motion/react';
import { Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  CardSelector, MultiSelectChips, FileUploadZone, URLInputField,
  ColorPickerField, SliderField, RatingScale, AudioRecorderField, TextAreaField,
} from './inputs';

export type MessageRole = 'bot' | 'user';

export interface ChatMessageData {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  /** Embedded component type to render below the message */
  component?: string;
  componentProps?: Record<string, unknown>;
  /** Called when an embedded component is completed */
  onComponentComplete?: (data: unknown) => void;
  /** Whether the embedded component has already been answered */
  componentCompleted?: boolean;
}

interface ChatMessageProps {
  message: ChatMessageData;
}

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  CardSelector,
  MultiSelectChips,
  MultiSelect: MultiSelectChips,
  FileUpload: FileUploadZone,
  FileUploadZone,
  URLInput: URLInputField,
  URLInputField,
  ColorPicker: ColorPickerField,
  ColorPickerField,
  Slider: SliderField,
  SliderField,
  RatingScale,
  AudioRecorder: AudioRecorderField,
  AudioRecorderField,
  TextArea: TextAreaField,
  TextAreaField,
};

/** Render bot message content using react-markdown with dark theme styles */
function BotMessageContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-emerald-400">{children}</strong>,
        em: ({ children }) => <em className="italic text-zinc-300">{children}</em>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300">
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
        ),
        ul: ({ children }) => <ul className="mt-1 mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="mt-1 mb-2 space-y-1 list-decimal">{children}</ol>,
        li: ({ children }) => (
          <li className="ml-4 text-zinc-300 flex gap-2">
            <span className="text-zinc-500 shrink-0">•</span>
            <span>{children}</span>
          </li>
        ),
        h1: ({ children }) => <h1 className="text-base font-semibold text-white mb-1">{children}</h1>,
        h2: ({ children }) => <h2 className="text-sm font-semibold text-white mb-1">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-medium text-zinc-200 mb-1">{children}</h3>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'bot';
  const EmbeddedComponent = message.component ? COMPONENT_MAP[message.component] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {/* Bot avatar */}
      {isBot && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mt-1">
          <Bot className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Message bubble + optional embedded component */}
      <div className={`max-w-[80%] sm:max-w-[70%] space-y-3`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isBot
              ? 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-md'
              : 'bg-emerald-600 text-white rounded-tr-md'
          }`}
        >
          {isBot
            ? <BotMessageContent content={message.content ?? ''} />
            : (message.content ?? '')
          }
        </div>

        {EmbeddedComponent && (
          <div className={`mt-2 ${
            message.componentCompleted ? 'opacity-60 pointer-events-none' : ''
          }`}>
            <EmbeddedComponent
              {...(message.componentProps || {})}
              onComplete={message.onComponentComplete ?? (() => {})}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
