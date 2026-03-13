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
}

interface ChatMessageProps {
  message: ChatMessageData;
}

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  CardSelector,
  MultiSelectChips,
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
          {message.content.split('\n').map((line, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>
              {line}
            </p>
          ))}
        </div>

        {EmbeddedComponent && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3">
            <EmbeddedComponent
              {...(message.componentProps ?? {})}
              onComplete={message.onComponentComplete ?? (() => {})}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
