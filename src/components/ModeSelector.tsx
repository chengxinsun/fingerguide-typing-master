import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PracticeMode } from '../constants';
import { useI18n } from '../contexts/I18nContext';

interface ModeSelectorProps {
  currentMode: PracticeMode;
  onModeChange: (mode: PracticeMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onModeChange,
}) => {
  const { t } = useI18n();

  const MODES: { value: PracticeMode; label: string }[] = [
    { value: 'normal', label: t.mode?.normal || 'Normal' },
    { value: 'time-challenge', label: t.mode?.timeChallenge || 'Time Challenge' },
    { value: 'custom', label: t.mode?.custom || 'Custom Text' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600">
        {t.nav?.practice || 'Practice'}: {MODES.find(m => m.value === currentMode)?.label} <ChevronDown size={14} />
      </button>
      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-1 z-50">
        {MODES.map(mode => (
          <button
            key={mode.value}
            onClick={() => onModeChange(mode.value)}
            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
              currentMode === mode.value
                ? 'bg-blue-50 text-blue-600 font-bold'
                : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
};
