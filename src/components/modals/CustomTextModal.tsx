import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, FileText } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';

interface CustomTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (text: string) => void;
}

const MAX_LENGTH = 5000;
const MIN_LENGTH = 10;

export const CustomTextModal: React.FC<CustomTextModalProps> = ({
  isOpen,
  onClose,
  onStart,
}) => {
  const { t } = useI18n();
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const isValid = text.length >= MIN_LENGTH && text.length <= MAX_LENGTH;

  const handleStart = () => {
    if (isValid) {
      onStart(text.trim());
      setText('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t.mode?.customTitle || 'Practice Your Own Text'}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
            onKeyDown={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.stopPropagation()}
            placeholder={t.mode?.customPlaceholder || 'Paste or type your text here...'}
            className="w-full h-64 p-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none resize-none font-mono text-sm"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span className={text.length < MIN_LENGTH ? 'text-red-500' : 'text-gray-400'}>
              {text.length < MIN_LENGTH && (t.mode?.customMinLength || 'Text must be at least 10 characters')}
            </span>
            <span className="text-gray-400">
              {text.length} / {MAX_LENGTH}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all"
          >
            {t.mode?.cancel || 'Cancel'}
          </button>
          <button
            onClick={handleStart}
            disabled={!isValid}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              isValid
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {t.mode?.customStart || 'Start Practice'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
