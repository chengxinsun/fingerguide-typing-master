import React from 'react';
import { motion } from 'motion/react';
import { X, Clock } from 'lucide-react';
import { TIME_CHALLENGE_OPTIONS } from '../../constants';

interface TimeChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (duration: 60 | 180 | 300) => void;
}

export const TimeChallengeModal: React.FC<TimeChallengeModalProps> = ({
  isOpen,
  onClose,
  onStart,
}) => {
  const [selectedDuration, setSelectedDuration] = React.useState<60 | 180 | 300>(60);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Clock size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Time Challenge</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-4">Type as much as you can before time runs out!</p>

        <div className="space-y-2 mb-6">
          {TIME_CHALLENGE_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedDuration(option.value)}
              className={"w-full p-4 rounded-xl border-2 text-left transition-all " +
                (selectedDuration === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-100 hover:border-gray-200'
                )
              }
            >
              <div className="font-bold text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-500">
                {option.value === 60 ? 'Quick sprint' : option.value === 180 ? 'Standard challenge' : 'Endurance test'}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onStart(selectedDuration)}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all"
          >
            Start Challenge
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
