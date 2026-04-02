import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Trophy, Crown } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { getPetById } from '../constants/pets';
import { getLevelByXP } from '../constants/levels';

interface LevelUpModalProps {
  newLevel: number;
  unlockedPetId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  newLevel,
  unlockedPetId,
  isOpen,
  onClose,
}) => {
  const { t } = useI18n();

  // Auto-dismiss after 6 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const levelInfo = getLevelByXP(0);
  const levelData = { ...levelInfo, level: newLevel };
  const pet = unlockedPetId ? getPetById(unlockedPetId) : null;

  // Get level title from translations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const levelTranslations = t.level as Record<string, any>;
  const levelTitleKey = `level_${newLevel}`;
  const levelTitle = levelTranslations?.[levelTitleKey] || `Level ${newLevel}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[300] p-4"
          onClick={onClose}
        >
          {/* Confetti Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: '50%',
                  y: '50%',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
                className="absolute"
              >
                <Sparkles size={24} className="text-yellow-400" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 200,
            }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-yellow-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Celebration Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  damping: 10,
                  stiffness: 200,
                  delay: 0.2,
                }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 mb-4"
              >
                <Crown size={48} className="text-yellow-500" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
                  {t.level?.title || 'Level Up!'}
                </span>
                <h2 className="text-4xl font-black text-gray-800 mt-2">
                  {levelTitle}
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 mt-2"
              >
                恭喜晋级！继续加油！
              </motion.p>
            </div>

            {/* New Pet Unlocked */}
            {pet && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-purple-100"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                    className="text-6xl"
                  >
                    {pet.emoji}
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-sm text-purple-600 font-bold uppercase tracking-wider">
                      {t.pet?.title || 'New Pet Unlocked!'}
                    </div>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <div className="text-xl font-bold text-gray-800">
                      {((t.pet as Record<string, any>)?.[pet.id]?.name) || pet.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      已自动切换为新宠物
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Auto-dismiss indicator */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 6, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-b-3xl origin-left"
            />

            {/* Dismiss hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center text-xs text-gray-400 mt-4"
            >
              点击任意位置关闭
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
