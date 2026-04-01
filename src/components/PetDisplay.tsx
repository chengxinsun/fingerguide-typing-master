import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../contexts/I18nContext';
import { getPetById, getPetStage, PetStage } from '../constants/pets';

interface PetDisplayProps {
  petId: string;
  growth: number;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

const sizeClasses = {
  small: {
    container: 'w-12 h-12',
    emoji: 'text-2xl',
    dot: 'w-2 h-2',
  },
  medium: {
    container: 'w-20 h-20',
    emoji: 'text-4xl',
    dot: 'w-3 h-3',
  },
  large: {
    container: 'w-32 h-32',
    emoji: 'text-6xl',
    dot: 'w-4 h-4',
  },
};

const stageColors: Record<PetStage, string> = {
  baby: 'bg-green-500',
  teen: 'bg-blue-500',
  adult: 'bg-pink-500',
};

const stageKeyMap: Record<PetStage, string> = {
  baby: 'stage_baby',
  teen: 'stage_teen',
  adult: 'stage_adult',
};

export const PetDisplay: React.FC<PetDisplayProps> = ({
  petId,
  growth,
  onClick,
  size = 'medium',
  animated = true,
}) => {
  const { t } = useI18n();
  const [showTooltip, setShowTooltip] = useState(false);

  const pet = getPetById(petId);
  const stage = getPetStage(growth);
  const sizeClass = sizeClasses[size];

  if (!pet) {
    return null;
  }

  // Get translated pet name and description
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const petTranslations = t.pet as Record<string, any>;
  const petName = petTranslations?.[pet.id]?.name || pet.id;
  const petDescription = petTranslations?.[pet.id]?.description || '';
  const stageName = petTranslations?.[stageKeyMap[stage]] || stage;

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`${sizeClass.container} relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 hover:border-purple-300 transition-colors cursor-pointer`}
        animate={
          animated
            ? {
                y: [0, -4, 0],
              }
            : {}
        }
        transition={
          animated
            ? {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {}
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={sizeClass.emoji}>{pet.emoji}</span>

        {/* Stage indicator dot */}
        <div
          className={`absolute -top-1 -right-1 ${sizeClass.dot} ${stageColors[stage]} rounded-full border-2 border-white shadow-sm`}
        />
      </motion.button>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100 whitespace-nowrap z-50"
        >
          <div className="flex flex-col gap-1">
            <div className="font-bold text-gray-800">{petName}</div>
            <div className="text-xs text-gray-500">{petDescription}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">{t.pet?.growth || 'Growth'}:</span>
              <span className="text-xs font-mono font-bold text-purple-600">{growth}</span>
              <span className="text-xs text-gray-300">/</span>
              <span className="text-xs font-mono text-gray-400">{pet.maxGrowth}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{t.pet?.title || 'Stage'}:</span>
              <span className={`text-xs font-bold ${
                stage === 'baby' ? 'text-green-500' :
                stage === 'teen' ? 'text-blue-500' :
                'text-pink-500'
              }`}>
                {stageName}
              </span>
            </div>
          </div>

          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-white border-r border-b border-gray-100 rotate-45" />
          </div>
        </motion.div>
      )}
    </div>
  );
};
