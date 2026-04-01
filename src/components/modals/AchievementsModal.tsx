import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Target, Star } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';
import { useAchievements } from '../../contexts/AchievementContext';
import { AchievementCard } from '../AchievementCard';
import { ACHIEVEMENTS, AchievementType } from '../../constants/achievements';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeFilters: { type: AchievementType | 'all'; icon: React.ReactNode; labelKey: string }[] = [
  { type: 'all', icon: <Trophy size={16} />, labelKey: 'all' },
  { type: 'milestone', icon: <Target size={16} />, labelKey: 'milestone' },
  { type: 'streak', icon: <Star size={16} />, labelKey: 'streak' },
  { type: 'accuracy', icon: <Star size={16} />, labelKey: 'accuracy' },
];

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useI18n();
  const { achievements } = useAchievements();
  const [filter, setFilter] = React.useState<AchievementType | 'all'>('all');

  if (!isOpen) return null;

  // Calculate overall progress
  const totalAchievements = ACHIEVEMENTS.length;
  const unlockedCount = achievements.filter((a) => a.unlockedAt > 0).length;
  const progressPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  // Filter achievements
  const filteredAchievements = useMemo(() => {
    if (filter === 'all') return achievements;
    return achievements.filter((a) => {
      const def = ACHIEVEMENTS.find((ad) => ad.id === a.id);
      return def?.type === filter;
    });
  }, [achievements, filter]);

  // Get type label
  const getTypeLabel = (type: AchievementType | 'all') => {
    if (type === 'all') return t.achievements?.all || 'All';
    const typeMap: Record<string, string> = {
      milestone: t.achievements?.milestone || 'Milestones',
      streak: t.achievements?.streak || 'Streaks',
      accuracy: t.achievements?.accuracy || 'Accuracy',
    };
    return typeMap[type] || type;
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-2xl p-6 max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                  <Trophy size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t.achievements?.title || 'Achievements'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {unlockedCount} / {totalAchievements} {t.achievements?.unlocked || 'unlocked'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Overall Progress */}
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-800">
                  {t.achievements?.overallProgress || 'Overall Progress'}
                </span>
                <span className="text-2xl font-bold text-purple-600">
                  {progressPercentage}%
                </span>
              </div>
              <div className="h-4 bg-white rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>
                  {t.achievements?.unlocked || 'Unlocked'}: {unlockedCount}
                </span>
                <span>
                  {t.achievements?.locked || 'Locked'}: {totalAchievements - unlockedCount}
                </span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {typeFilters.map(({ type, icon }) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    filter === type
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {icon}
                  <span>{getTypeLabel(type)}</span>
                  {type === 'all' && (
                    <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {achievements.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AchievementCard achievement={achievement} size="medium" showProgress />
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredAchievements.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500">
                  {t.achievements?.noAchievements || 'No achievements found'}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
