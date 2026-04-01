import React from 'react';
import { motion } from 'motion/react';
import { Lock, Unlock, Trophy, Star } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { AchievementRecord } from '../utils/achievementChecker';
import { getAchievementById, AchievementDefinition } from '../constants/achievements';

interface AchievementCardProps {
  achievement: AchievementRecord;
  size?: 'small' | 'medium' | 'large';
  showProgress?: boolean;
}

const sizeClasses = {
  small: {
    container: 'p-3 gap-2',
    icon: 'w-8 h-8',
    iconSize: 16,
    title: 'text-sm',
    description: 'text-xs',
    xp: 'text-xs',
  },
  medium: {
    container: 'p-4 gap-3',
    icon: 'w-12 h-12',
    iconSize: 24,
    title: 'text-base',
    description: 'text-sm',
    xp: 'text-sm',
  },
  large: {
    container: 'p-6 gap-4',
    icon: 'w-16 h-16',
    iconSize: 32,
    title: 'text-lg',
    description: 'text-base',
    xp: 'text-base',
  },
};

const typeIcons: Record<string, React.ReactNode> = {
  milestone: <Trophy className="text-yellow-500" />,
  streak: <Star className="text-orange-500" />,
  accuracy: <Star className="text-blue-500" />,
};

const typeColors: Record<string, string> = {
  milestone: 'bg-yellow-50 border-yellow-200',
  streak: 'bg-orange-50 border-orange-200',
  accuracy: 'bg-blue-50 border-blue-200',
};

const lockedColors: Record<string, string> = {
  milestone: 'bg-gray-50 border-gray-200',
  streak: 'bg-gray-50 border-gray-200',
  accuracy: 'bg-gray-50 border-gray-200',
};

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  size = 'medium',
  showProgress = true,
}) => {
  const { t } = useI18n();
  const definition = getAchievementById(achievement.id);
  const sizeClass = sizeClasses[size];

  if (!definition) {
    return null;
  }

  const isUnlocked = achievement.unlockedAt > 0;
  const progress = achievement.progress;

  // Get translated achievement name and description
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const achievementTranslations = t.achievements as Record<string, any>;
  const name = achievementTranslations?.[achievement.id]?.name || achievement.id;
  const description = achievementTranslations?.[achievement.id]?.description || '';

  return (
    <motion.div
      className={`relative rounded-xl border-2 transition-all ${
        isUnlocked ? typeColors[definition.type] : lockedColors[definition.type]
      } ${sizeClass.container}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Status Badge */}
      <div className="absolute top-2 right-2">
        {isUnlocked ? (
          <div className="flex items-center gap-1 text-green-600">
            <Unlock size={14} />
            <span className="text-xs font-medium">{t.achievements?.unlocked || 'Unlocked'}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-gray-400">
            <Lock size={14} />
            <span className="text-xs font-medium">{t.achievements?.locked || 'Locked'}</span>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`${sizeClass.icon} rounded-xl flex items-center justify-center ${
            isUnlocked ? 'bg-white shadow-sm' : 'bg-gray-100'
          }`}
        >
          {isUnlocked ? (
            typeIcons[definition.type]
          ) : (
            <Lock size={sizeClass.iconSize} className="text-gray-400" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-gray-800 ${sizeClass.title} truncate`}>
            {name}
          </h3>
          <p className={`text-gray-500 ${sizeClass.description} line-clamp-2`}>
            {description}
          </p>

          {/* XP Reward */}
          <div className={`flex items-center gap-1 mt-2 ${sizeClass.xp}`}>
            <Star size={14} className="text-yellow-500" />
            <span className="font-medium text-yellow-600">
              +{definition.xpReward} {t.achievements?.xp || 'XP'}
            </span>
          </div>

          {/* Progress Bar (for locked achievements) */}
          {showProgress && !isUnlocked && progress > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">{t.achievements?.progress || 'Progress'}</span>
                <span className="text-gray-500">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {/* Unlocked Date */}
          {isUnlocked && achievement.unlockedAt > 0 && (
            <div className="mt-2 text-xs text-gray-400">
              {new Date(achievement.unlockedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
