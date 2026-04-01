import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KEYBOARD_ROWS, Finger } from '../constants';

interface KeyboardProps {
  activeKey: string | null;
  pressedKey: string | null;
  activeFinger: Finger | null;
}

export const Keyboard: React.FC<KeyboardProps> = ({ activeKey, pressedKey, activeFinger }) => {
  const getKeyWidth = (key: string) => {
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

  const isKeyActive = (key: string) => {
    if (!activeKey) return false;
    if (key === 'Space' && activeKey === ' ') return true;
    return key.toLowerCase() === activeKey.toLowerCase();
  };

  const isKeyPressed = (key: string) => {
    if (!pressedKey) return false;
    if (key === 'Space' && pressedKey === ' ') return true;
    return key.toLowerCase() === pressedKey.toLowerCase();
  };

  const getFingerName = (finger: Finger | null): string => {
    if (!finger) return '';
    const [hand, part] = finger.split('-');
    const handName = hand === 'left' ? '左手' : '右手';
    const fingerNames: Record<string, string> = {
      pinky: '小指',
      ring: '无名指',
      middle: '中指',
      index: '食指',
      thumb: '大拇指'
    };
    return `${handName}${fingerNames[part]}`;
  };

  return (
    <div className="flex flex-col gap-1.5 p-6 bg-[#E5E7EB] rounded-2xl border-[3px] border-[#5D4037] shadow-lg max-w-fit mx-auto relative transform perspective-[1000px] rotateX-[10deg]">
      {/* Decorative cable from the image */}
      <div className="absolute -top-12 left-8 w-16 h-12 border-l-[5px] border-t-[5px] border-[#5D4037] rounded-tl-3xl opacity-50" />
      
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 justify-center">
          {row.map((key, keyIndex) => (
            <motion.div
              key={keyIndex}
              animate={{
                backgroundColor: isKeyPressed(key) 
                  ? '#3B82F6' 
                  : isKeyActive(key) 
                    ? '#EBF8FF' 
                    : '#F3F4F6',
                scale: isKeyPressed(key) ? 0.94 : isKeyActive(key) ? 1.05 : 1,
                color: isKeyPressed(key) ? '#FFFFFF' : isKeyActive(key) ? '#3182CE' : '#5D4037',
                translateY: isKeyPressed(key) ? 2 : isKeyActive(key) ? -6 : 0,
                borderColor: isKeyActive(key) ? '#3182CE' : '#5D4037',
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                translateY: isKeyActive(key) ? {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.6,
                  ease: "easeInOut"
                } : { type: 'spring', stiffness: 400, damping: 25 }
              }}
              className={`
                ${getKeyWidth(key)} h-12 flex items-center justify-center rounded-lg text-[11px] font-black border-[2.5px]
                ${isKeyActive(key) ? 'ring-4 ring-blue-200/60' : ''}
                transition-all duration-75 relative
              `}
              style={{
                boxShadow: isKeyPressed(key) ? 'none' : isKeyActive(key) ? '0px 8px 0px #3182CE' : '0px 4px 0px #5D4037',
              }}
            >
              {key === 'Space' ? '' : key}
              
              {/* Finger Hint Label */}
              <AnimatePresence>
                {isKeyActive(key) && activeFinger && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute whitespace-nowrap bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-lg z-30"
                  >
                    {getFingerName(activeFinger)}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Key side for 3D effect */}
              {!isKeyPressed(key) && (
                <div className="absolute -bottom-[6px] left-0 w-full h-[4px] bg-[#9CA3AF] rounded-b-lg border-x-[2.5px] border-b-[2.5px] border-[#5D4037] -z-10" />
              )}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};
