import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Star, Sparkles } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { AchievementRecord } from '../utils/achievementChecker';
import { getAchievementById } from '../constants/achievements';

interface AchievementUnlockModalProps {
  achievement: AchievementRecord | null;
  isOpen: boolean;
  onClose: () => void;
  autoDismissDelay?: number;
}

export const AchievementUnlockModal: React.FC<AchievementUnlockModalProps> = ({
  achievement,
  isOpen,
  onClose,
  autoDismissDelay = 5000,
}) => {
  const { t } = useI18n();

  // Auto-dismiss after specified delay
  useEffect(() => {
    if (isOpen && autoDismissDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoDismissDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoDismissDelay, onClose]);

  if (!achievement || !isOpen) return null;

  const definition = getAchievementById(achievement.id);
  if (!definition) return null;

  // Get translated achievement name and description
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const achievementTranslations = t.achievements as Record<string, any>;
  const name = achievementTranslations?.[achievement.id]?.name || achievement.id;
  const description = achievementTranslations?.[achievement.id]?.description || '';

  // Get type-specific icon and colors
  const getTypeStyles = () => {
    switch (definition.type) {
      case 'milestone':
        return {
          icon: <Trophy size={48} className="text-yellow-500" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          glowColor: 'shadow-yellow-200',
        };
      case 'streak':
        return {
          icon: <Star size={48} className="text-orange-500" />,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          glowColor: 'shadow-orange-200',
        };
      case 'accuracy':
        return {
          icon: <Star size={48} className="text-blue-500" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          glowColor: 'shadow-blue-200',
        };
      default:
        return {
          icon: <Trophy size={48} className="text-purple-500" />,
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          glowColor: 'shadow-purple-200',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4"
          onClick={onClose}
        >
          {/* Confetti/Sparkles Background Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
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
                  x: `${50 + (Math.random() - 0.5) * 80}%`,
                  y: `${50 + (Math.random() - 0.5) * 80}%`,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
                className="absolute"
              >
                <Sparkles
                  size={24}
                  className={
                    definition.type === 'milestone'
                      ? 'text-yellow-400'
                      : definition.type === 'streak'
                        ? 'text-orange-400'
                        : 'text-blue-400'
                  }
                />
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
            className={`relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 ${styles.borderColor} ${styles.glowColor}`}
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
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${styles.bgColor} mb-4`}
              >
                {styles.icon}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-800 mb-2"
              >
                {t.achievements?.unlocked || 'Achievement Unlocked!'}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500"
              >
                {t.achievements?.congrats || 'Congratulations!'}
              </motion.p>
            </div>

            {/* Achievement Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`${styles.bgColor} rounded-2xl p-6 mb-6`}
            >
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                {name}
              </h3>
              <p className="text-gray-600 text-center text-sm mb-4">
                {description}
              </p>

              {/* XP Reward */}
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Star size={20} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-800">
                    +{definition.xpReward} {t.achievements?.xp || 'XP'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Auto-dismiss indicator */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: autoDismissDelay / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-500 rounded-b-3xl origin-left"
            />

            {/* Dismiss hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-xs text-gray-400 mt-4"
            >
              {t.achievements?.autoDismiss || 'Auto-closing in a few seconds...'}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
