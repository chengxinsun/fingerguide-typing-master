import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, TrendingUp } from 'lucide-react';
import { ProgressChart } from '../ProgressChart';
import { DailyRecord } from '../../constants';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyRecords: DailyRecord[];
}

const DAYS_OPTIONS = [
  { value: 7, label: '7 Days' },
  { value: 30, label: '30 Days' },
  { value: 90, label: '90 Days' },
];

export const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  onClose,
  dailyRecords,
}) => {
  const [selectedDays, setSelectedDays] = useState(30);

  if (!isOpen) return null;

  const hasData = dailyRecords.length > 0;

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
        className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Progress Trend</h2>
              <p className="text-sm text-gray-500">Track your typing speed and accuracy over time</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {hasData ? (
          <>
            <div className="flex justify-center gap-2 mb-6">
              {DAYS_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDays(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDays === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="h-80">
              <ProgressChart data={dailyRecords} days={selectedDays} />
            </div>

            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-blue-500 rounded" />
                <span className="text-sm text-gray-600">WPM (Speed)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-green-500 rounded" />
                <span className="text-sm text-gray-600">Accuracy %</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No history yet. Your progress will appear here after a few sessions.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
