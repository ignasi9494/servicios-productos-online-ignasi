import React, { Fragment } from 'react';
import { motion } from 'motion/react';
import { Bot } from 'lucide-react';
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

/** Parse basic markdown: **bold**, *italic*, [links](url), `code` */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Regex for **bold**, *italic*, [text](url), `code`
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)|`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={match.index} className="font-semibold">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={match.index}>{match[3]}</em>);
    } else if (match[4] && match[5]) {
      parts.push(
        <a key={match.index} href={match[5]} target="_blank" rel="noopener noreferrer"
          className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300">
          {match[4]}
        </a>
      );
    } else if (match[6]) {
      parts.push(
        <code key={match.index} className="bg-zinc-800 px-1.5 py-0.5 rounded text-xs">{match[6]}</code>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

/** Render a line, detecting list items (- or *) */
function renderLine(line: string, index: number): React.ReactNode {
  const trimmed = line.trimStart();
  const isList = trimmed.startsWith('- ') || trimmed.startsWith('* ');
  if (isList) {
    return (
      <li key={index} className="ml-4 list-disc">
        {renderInlineMarkdown(trimmed.slice(2))}
      </li>
    );
  }
  return (
    <p key={index} className={index > 0 ? 'mt-2' : ''}>
      {renderInlineMarkdown(line)}
    </p>
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
          {(message.content ?? '').split('\n').map((line, i) => renderLine(line, i))}
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
