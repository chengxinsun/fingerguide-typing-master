import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, Palette, Heart, Lock, Check } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useProgress } from '../../contexts/ProgressContext';
import { THEMES, ThemeDefinition } from '../../constants/themes';
import { PETS, PetDefinition } from '../../constants/pets';
import { Language } from '../../i18n';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, language, setLanguage } = useI18n();
  const { theme, setTheme, availableThemes } = useTheme();
  const { progress, currentLevel, setActivePet } = useProgress();

  if (!isOpen) return null;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
  };

  const handlePetChange = (petId: string) => {
    setActivePet(petId);
  };

  // Check if pet is unlocked - use currentLevel from context which is computed from XP
  const isPetUnlocked = (pet: PetDefinition) => {
    // First check if pet is already in unlockedPets array
    if (progress.unlockedPets.includes(pet.id)) {
      return true;
    }
    // Also check if pet should be unlocked based on current level
    return pet.unlockLevel <= currentLevel.level;
  };

  // Check if theme is unlocked - use currentLevel from context which is computed from XP
  const isThemeUnlocked = (themeDef: ThemeDefinition) => {
    return themeDef.unlockLevel <= currentLevel.level;
  };

  // Get theme color class
  const getThemeColorClass = (gradient: string) => {
    const colorMap: Record<string, string> = {
      'from-green-500 to-emerald-600': 'bg-green-500',
      'from-pink-400 to-rose-500': 'bg-pink-500',
      'from-orange-400 to-amber-500': 'bg-orange-500',
      'from-yellow-400 to-amber-500': 'bg-yellow-500',
      'from-blue-400 to-indigo-500': 'bg-blue-500',
      'from-violet-500 to-purple-600': 'bg-violet-500',
    };
    return colorMap[gradient] || 'bg-gray-500';
  };

  // Get translated theme name
  const getThemeName = (themeDef: ThemeDefinition) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const themeTranslations = t as Record<string, any>;
    return themeTranslations[themeDef.nameKey] || themeDef.id;
  };

  // Get translated pet name
  const getPetName = (pet: PetDefinition) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const petTranslations = t.pet as Record<string, any>;
    return petTranslations?.[pet.id]?.name || pet.id;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <Palette size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t.settings?.title || 'Settings'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Language Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={20} className="text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.settings?.language || 'Language'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleLanguageChange('zh')}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      language === 'zh'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <span className="font-medium text-gray-800">
                      {t.settings?.chinese || '中文'}
                    </span>
                    {language === 'zh' && (
                      <Check size={20} className="text-purple-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      language === 'en'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <span className="font-medium text-gray-800">
                      {t.settings?.english || 'English'}
                    </span>
                    {language === 'en' && (
                      <Check size={20} className="text-purple-500" />
                    )}
                  </button>
                </div>
              </section>

              {/* Theme Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Palette size={20} className="text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.settings?.theme || 'Theme'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {THEMES.map((themeDef) => {
                    const unlocked = isThemeUnlocked(themeDef);
                    const isSelected = theme.id === themeDef.id;

                    return (
                      <motion.button
                        key={themeDef.id}
                        onClick={() => unlocked && handleThemeChange(themeDef.id)}
                        disabled={!unlocked}
                        whileHover={unlocked ? { scale: 1.02 } : {}}
                        whileTap={unlocked ? { scale: 0.98 } : {}}
                        className={`relative p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50'
                            : unlocked
                              ? 'border-gray-100 hover:border-gray-200 bg-white'
                              : 'border-gray-100 bg-gray-50 opacity-60'
                        }`}
                      >
                        {/* Theme Color Preview */}
                        <div
                          className={`w-full h-12 rounded-lg mb-3 ${getThemeColorClass(
                            themeDef.gradient
                          )}`}
                          style={{ background: themeDef.background }}
                        />

                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800 text-sm">
                            {getThemeName(themeDef)}
                          </span>
                          {isSelected && (
                            <Check size={16} className="text-purple-500" />
                          )}
                          {!unlocked && (
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Lock size={12} />
                              <span>Lv.{themeDef.unlockLevel}</span>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </section>

              {/* Pet Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Heart size={20} className="text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.settings?.pet || 'Pet'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PETS.map((pet) => {
                    const unlocked = isPetUnlocked(pet);
                    const isSelected = progress.activePet === pet.id;

                    return (
                      <motion.button
                        key={pet.id}
                        onClick={() => unlocked && handlePetChange(pet.id)}
                        disabled={!unlocked}
                        whileHover={unlocked ? { scale: 1.02 } : {}}
                        whileTap={unlocked ? { scale: 0.98 } : {}}
                        className={`relative p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50'
                            : unlocked
                              ? 'border-gray-100 hover:border-gray-200 bg-white'
                              : 'border-gray-100 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{pet.emoji}</span>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-800 text-sm">
                              {getPetName(pet)}
                            </div>
                            {unlocked ? (
                              <div className="text-xs text-green-600">
                                {t.achievements?.unlocked || 'Unlocked'}
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Lock size={10} />
                                <span>Lv.{pet.unlockLevel}</span>
                              </div>
                            )}
                          </div>
                          {isSelected && (
                            <Check size={16} className="text-purple-500" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
