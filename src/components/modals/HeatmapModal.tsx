import React from 'react';
import { motion } from 'motion/react';
import { X, Keyboard, Trash2 } from 'lucide-react';
import { HeatmapKeyboard } from '../HeatmapKeyboard';
import { useI18n } from '../../contexts/I18nContext';

interface HeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyMistakes: Record<string, number>;
  onReset: () => void;
}

export const HeatmapModal: React.FC<HeatmapModalProps> = ({
  isOpen,
  onClose,
  keyMistakes,
  onReset,
}) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  const hasData = Object.keys(keyMistakes).length > 0;

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
        className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
              <Keyboard size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t.heatmap?.title || 'Error Heatmap'}</h2>
              <p className="text-sm text-gray-500">{t.heatmap?.subtitle || 'Visualize which keys you mistype most often'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasData && (
              <button
                onClick={() => {
                  if (confirm(t.heatmap?.resetConfirm || 'Are you sure you want to reset your heatmap data? This cannot be undone.')) {
                    onReset();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
                <span className="font-medium">{t.heatmap?.reset || 'Reset'}</span>
              </button>
            )}
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
        </div>

        {hasData ? (
          <>
            <div className="flex justify-center mb-8">
              <HeatmapKeyboard keyMistakes={keyMistakes} />
            </div>

            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-500">{t.heatmap?.lessErrors || 'Less errors'}</span>
              <div className="flex gap-1">
                {['hsl(0, 0%, 95%)', 'hsl(30, 50%, 80%)', 'hsl(15, 80%, 65%)', 'hsl(0, 100%, 50%)'].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-4 rounded border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-gray-500">{t.heatmap?.moreErrors || 'More errors'}</span>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Keyboard size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">{t.heatmap?.noData || 'No data yet. Complete some practice sessions to see your error patterns!'}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
