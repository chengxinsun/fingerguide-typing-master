import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../contexts/I18nContext';
import { useProgress } from '../contexts/ProgressContext';
import { useTheme } from '../contexts/ThemeContext';

interface LevelProgressProps {
  showDetails?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small: {
    container: 'gap-2',
    emoji: 'text-2xl',
    levelText: 'text-sm',
    xpText: 'text-xs',
    barHeight: 'h-2',
    barWidth: 'w-32',
  },
  medium: {
    container: 'gap-3',
    emoji: 'text-4xl',
    levelText: 'text-lg',
    xpText: 'text-sm',
    barHeight: 'h-3',
    barWidth: 'w-48',
  },
  large: {
    container: 'gap-4',
    emoji: 'text-6xl',
    levelText: 'text-2xl',
    xpText: 'text-base',
    barHeight: 'h-4',
    barWidth: 'w-64',
  },
};

export const LevelProgress: React.FC<LevelProgressProps> = ({
  showDetails = true,
  size = 'medium',
}) => {
  const { t } = useI18n();
  const { currentLevel, xpProgress, progress } = useProgress();
  const { theme } = useTheme();

  const sizeClass = sizeClasses[size];

  // Get translated level title
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const levelTranslations = t.level as Record<string, any>;
  const levelTitle = levelTranslations?.[currentLevel.titleKey] || currentLevel.titleKey;

  // Extract color from theme gradient for the progress bar
  const getThemeColor = () => {
    const gradientMap: Record<string, string> = {
      'from-green-500 to-emerald-600': 'bg-green-500',
      'from-pink-400 to-rose-500': 'bg-pink-500',
      'from-orange-400 to-amber-500': 'bg-orange-500',
      'from-yellow-400 to-amber-500': 'bg-yellow-500',
      'from-blue-400 to-indigo-500': 'bg-blue-500',
      'from-violet-500 to-purple-600': 'bg-violet-500',
    };
    return gradientMap[theme.gradient] || 'bg-blue-500';
  };

  return (
    <div className={`flex items-center ${sizeClass.container}`}>
      {/* Level Emoji */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className={sizeClass.emoji}>{currentLevel.emoji}</span>
      </motion.div>

      {/* Progress Info */}
      {showDetails && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className={`font-bold text-gray-800 ${sizeClass.levelText}`}>
              {t.level?.title || 'Level'} {currentLevel.level}
            </span>
            <span className="text-gray-400">·</span>
            <span className={`text-gray-600 ${sizeClass.levelText}`}>{levelTitle}</span>
          </div>

          {/* XP Progress Bar */}
          <div className={`${sizeClass.barWidth} ${sizeClass.barHeight} bg-gray-100 rounded-full overflow-hidden`}>
            <motion.div
              className={`${sizeClass.barHeight} ${getThemeColor()} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress.percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          {/* XP Text */}
          <div className={`flex items-center justify-between ${sizeClass.xpText}`}>
            <span className="text-gray-500">
              {xpProgress.current} / {xpProgress.required} XP
            </span>
            <span className="text-gray-400">
              {xpProgress.percentage}%
            </span>
          </div>
        </div>
      )}

      {/* Compact view - just show level number */}
      {!showDetails && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-800 ${sizeClass.levelText}`}>
            Lv.{currentLevel.level}
          </span>
          <div className={`${sizeClass.barWidth} ${sizeClass.barHeight} bg-gray-100 rounded-full overflow-hidden`}>
            <motion.div
              className={`${sizeClass.barHeight} ${getThemeColor()} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress.percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
