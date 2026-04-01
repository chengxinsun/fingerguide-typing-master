import React from 'react';
import { motion } from 'motion/react';
import { KEYBOARD_ROWS } from '../constants';
import { getHeatmapColor, getMaxMistakeCount } from '../utils/heatmapColors';

interface HeatmapKeyboardProps {
  keyMistakes: Record<string, number>;
  mini?: boolean;
}

export const HeatmapKeyboard: React.FC<HeatmapKeyboardProps> = ({
  keyMistakes,
  mini = false,
}) => {
  const maxCount = getMaxMistakeCount(keyMistakes);

  const getKeyWidth = (key: string) => {
    if (mini) {
      switch (key) {
        case 'Backspace': return 'w-8';
        case 'Tab': return 'w-6';
        case 'Caps': return 'w-8';
        case 'Enter': return 'w-10';
        case 'Shift': return 'w-12';
        case 'Space': return 'w-24';
        default: return 'w-5';
      }
    }
    switch (key) {
      case 'Backspace': return 'w-20';
      case 'Tab': return 'w-16';
      case 'Caps': return 'w-20';
      case 'Enter': return 'w-24';
      case 'Shift': return 'w-28';
      case 'Space': return 'w-[400px]';
      default: return 'w-10';
    }
  };

  const getKeyHeight = () => (mini ? 'h-6' : 'h-12');

  return (
    <div className={`flex flex-col gap-1 ${mini ? 'p-2' : 'p-6'} bg-[#E5E7EB] rounded-2xl border-[3px] border-[#5D4037] shadow-lg max-w-fit mx-auto`}>
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center">
          {row.map((key, keyIndex) => {
            const keyLower = key.toLowerCase();
            const count = keyMistakes[keyLower] || 0;
            const bgColor = getHeatmapColor(count, maxCount);

            return (
              <motion.div
                key={keyIndex}
                className={`
                  ${getKeyWidth(key)} ${getKeyHeight()}
                  flex items-center justify-center rounded-lg
                  ${mini ? 'text-[8px]' : 'text-[11px]'} font-black border-[2.5px] border-[#5D4037]
                  transition-colors duration-200
                `}
                style={{ backgroundColor: bgColor }}
                title={count > 0 ? `${key}: ${count} errors` : key}
              >
                {key === 'Space' ? '' : key}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
