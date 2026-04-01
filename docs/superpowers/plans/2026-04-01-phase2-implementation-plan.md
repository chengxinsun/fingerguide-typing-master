# Phase 2 功能增强实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现多语言系统、XP/等级系统、成就系统、宠物系统、主题系统

**Architecture:** 使用 React Context 管理全局状态，localStorage 持久化，按功能模块逐步实施

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion, Context API

---

## 文件结构规划

### 新增文件
- `src/i18n/index.ts` - 国际化配置
- `src/i18n/translations/zh.ts` - 中文翻译
- `src/i18n/translations/en.ts` - 英文翻译
- `src/contexts/I18nContext.tsx` - 语言状态管理
- `src/contexts/ProgressContext.tsx` - 等级/XP/成就状态
- `src/contexts/ThemeContext.tsx` - 主题状态
- `src/constants/achievements.ts` - 成就定义
- `src/constants/levels.ts` - 等级定义
- `src/constants/pets.ts` - 宠物定义
- `src/constants/themes.ts` - 主题定义
- `src/utils/xpCalculator.ts` - XP计算工具
- `src/utils/achievementChecker.ts` - 成就检查工具
- `src/utils/levelCalculator.ts` - 等级计算工具
- `src/components/PetDisplay.tsx` - 宠物展示组件
- `src/components/LevelProgress.tsx` - 等级进度条
- `src/components/AchievementCard.tsx` - 成就卡片
- `src/components/AchievementUnlockModal.tsx` - 成就解锁弹窗
- `src/components/modals/SettingsModal.tsx` - 设置页面
- `src/components/modals/AchievementsModal.tsx` - 成就页面
- `src/components/modals/PetDetailModal.tsx` - 宠物详情

### 修改文件
- `src/App.tsx` - 添加 Context Provider，集成新功能
- `src/constants.ts` - 扩展 User 类型
- `src/components/Stats.tsx` - 添加等级/成就/宠物卡片

---

## Task 1: 多语言系统基础架构

**Files:**
- Create: `src/i18n/translations/zh.ts`
- Create: `src/i18n/translations/en.ts`
- Create: `src/i18n/index.ts`
- Create: `src/contexts/I18nContext.tsx`
- Modify: `src/App.tsx` (添加 Provider)

- [ ] **Step 1: Create Chinese translations**

```typescript
// src/i18n/translations/zh.ts
export const zhTranslations = {
  app: {
    name: 'FingerGuide',
    tagline: '打字练习大师',
  },
  nav: {
    practice: '练习',
    stats: '统计',
    achievements: '成就',
    settings: '设置',
  },
  practice: {
    wpm: '速度',
    accuracy: '准确率',
    time: '时间',
    completed: '练习完成！',
    continuePrompt: '按空格键或点击按钮继续',
    totalTime: '总时长',
    sessions: '练习次数',
  },
  mode: {
    normal: '普通模式',
    timeChallenge: '倒计时模式',
    custom: '自定义文本',
    selectDuration: '选择时长',
    start: '开始',
    cancel: '取消',
  },
  user: {
    createAccount: '创建账户',
    selectAccount: '选择账户',
    localAccount: '本地账户',
    switchAccount: '切换账户',
    enterName: '输入您的名字',
  },
  stats: {
    avgWpm: '平均速度',
    avgAccuracy: '平均准确率',
    recentSessions: '最近练习',
    errorHeatmap: '错误热力图',
    progressTrend: '进度趋势',
    clickToExpand: '点击展开',
    noHeatmapData: '完成练习查看错误模式',
    noProgressData: '每日练习查看进度',
  },
  settings: {
    title: '设置',
    language: '语言',
    theme: '主题',
    pet: '宠物',
    selectPet: '选择宠物',
    selectLanguage: '选择语言',
    chinese: '中文',
    english: 'English',
  },
  achievements: {
    title: '成就',
    unlocked: '已解锁',
    locked: '未解锁',
    reward: '奖励',
    xp: 'XP',
    first_try: {
      name: '初次尝试',
      description: '完成第1次练习',
    },
    centurion: {
      name: '百字先锋',
      description: '累计输入100字符',
    },
    thousand_master: {
      name: '千字达人',
      description: '累计输入1,000字符',
    },
    ten_king: {
      name: '万字王者',
      description: '累计输入10,000字符',
    },
    speed_star: {
      name: '速度之星',
      description: 'WPM首次突破50',
    },
    speed_master: {
      name: '极速高手',
      description: 'WPM首次突破80',
    },
    perfect_accuracy: {
      name: '百发百中',
      description: '单次准确率100%',
    },
    persistent: {
      name: '持之以恒',
      description: '累计练习30分钟',
    },
    streak_3: {
      name: '三日连击',
      description: '连续3天练习',
    },
    streak_7: {
      name: '七日达人',
      description: '连续7天练习',
    },
    streak_30: {
      name: '月度王者',
      description: '连续30天练习',
    },
    accuracy_streak_5: {
      name: '精准大师',
      description: '连续5次准确率>95%',
    },
  },
  level: {
    title: '等级',
    current: '当前等级',
    nextLevel: '下一级',
    level_1: '打字小蜗牛',
    level_6: '打字小兔子',
    level_11: '打字小狐狸',
    level_16: '打字小猎豹',
    level_21: '打字老鹰',
    level_26: '打字巨龙',
  },
  pet: {
    title: '宠物',
    growth: '成长值',
    stage_baby: '幼年',
    stage_teen: '少年',
    stage_adult: '成年',
    unlocked_at: '解锁等级',
    snail: {
      name: '蜗牛小慢',
      description: '稳重踏实的初学者伙伴',
    },
    rabbit: {
      name: '兔子小跳',
      description: '灵活敏捷的速度型伙伴',
    },
    fox: {
      name: '狐狸小智',
      description: '聪明机灵的技巧型伙伴',
    },
    cheetah: {
      name: '猎豹小快',
      description: '极速如风的高手伙伴',
    },
    eagle: {
      name: '老鹰小高',
      description: '翱翔天际的大师伙伴',
    },
    dragon: {
      name: '巨龙小飞',
      description: '至高无上的王者伙伴',
    },
  },
};

export type Translations = typeof zhTranslations;
```

- [ ] **Step 2: Create English translations**

```typescript
// src/i18n/translations/en.ts
import { Translations } from './zh';

export const enTranslations: Translations = {
  app: {
    name: 'FingerGuide',
    tagline: 'Typing Master',
  },
  nav: {
    practice: 'Practice',
    stats: 'Stats',
    achievements: 'Achievements',
    settings: 'Settings',
  },
  practice: {
    wpm: 'Speed',
    accuracy: 'Accuracy',
    time: 'Time',
    completed: 'Practice Complete!',
    continuePrompt: 'Press space or click to continue',
    totalTime: 'Total Time',
    sessions: 'Sessions',
  },
  mode: {
    normal: 'Normal Mode',
    timeChallenge: 'Time Challenge',
    custom: 'Custom Text',
    selectDuration: 'Select Duration',
    start: 'Start',
    cancel: 'Cancel',
  },
  user: {
    createAccount: 'Create Account',
    selectAccount: 'Select Account',
    localAccount: 'Local Account',
    switchAccount: 'Switch Account',
    enterName: 'Enter your name',
  },
  stats: {
    avgWpm: 'Avg Speed',
    avgAccuracy: 'Avg Accuracy',
    recentSessions: 'Recent Sessions',
    errorHeatmap: 'Error Heatmap',
    progressTrend: 'Progress Trend',
    clickToExpand: 'Click to expand',
    noHeatmapData: 'Complete sessions to see error patterns',
    noProgressData: 'Practice daily to see your progress',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    theme: 'Theme',
    pet: 'Pet',
    selectPet: 'Select Pet',
    selectLanguage: 'Select Language',
    chinese: '中文',
    english: 'English',
  },
  achievements: {
    title: 'Achievements',
    unlocked: 'Unlocked',
    locked: 'Locked',
    reward: 'Reward',
    xp: 'XP',
    first_try: {
      name: 'First Try',
      description: 'Complete your first practice session',
    },
    centurion: {
      name: 'Centurion',
      description: 'Type 100 characters in total',
    },
    thousand_master: {
      name: 'Thousand Master',
      description: 'Type 1,000 characters in total',
    },
    ten_king: {
      name: 'Ten Thousand King',
      description: 'Type 10,000 characters in total',
    },
    speed_star: {
      name: 'Speed Star',
      description: 'Reach 50 WPM for the first time',
    },
    speed_master: {
      name: 'Speed Master',
      description: 'Reach 80 WPM for the first time',
    },
    perfect_accuracy: {
      name: 'Perfect Accuracy',
      description: 'Achieve 100% accuracy in a session',
    },
    persistent: {
      name: 'Persistent',
      description: 'Practice for 30 minutes in total',
    },
    streak_3: {
      name: '3-Day Streak',
      description: 'Practice for 3 consecutive days',
    },
    streak_7: {
      name: '7-Day Streak',
      description: 'Practice for 7 consecutive days',
    },
    streak_30: {
      name: '30-Day Streak',
      description: 'Practice for 30 consecutive days',
    },
    accuracy_streak_5: {
      name: 'Accuracy Master',
      description: 'Achieve >95% accuracy 5 times in a row',
    },
  },
  level: {
    title: 'Level',
    current: 'Current Level',
    nextLevel: 'Next Level',
    level_1: 'Typing Snail',
    level_6: 'Typing Rabbit',
    level_11: 'Typing Fox',
    level_16: 'Typing Cheetah',
    level_21: 'Typing Eagle',
    level_26: 'Typing Dragon',
  },
  pet: {
    title: 'Pet',
    growth: 'Growth',
    stage_baby: 'Baby',
    stage_teen: 'Teen',
    stage_adult: 'Adult',
    unlocked_at: 'Unlock at Level',
    snail: {
      name: 'Slowy the Snail',
      description: 'A steady companion for beginners',
    },
    rabbit: {
      name: 'Hoppy the Rabbit',
      description: 'An agile speed-focused companion',
    },
    fox: {
      name: 'Clever the Fox',
      description: 'A smart technique-focused companion',
    },
    cheetah: {
      name: 'Speedy the Cheetah',
      description: 'A lightning-fast expert companion',
    },
    eagle: {
      name: 'Soar the Eagle',
      description: 'A master companion soaring high',
    },
    dragon: {
      name: 'Mighty the Dragon',
      description: 'The supreme king of all companions',
    },
  },
};
```

- [ ] **Step 3: Create i18n index file**

```typescript
// src/i18n/index.ts
import { zhTranslations } from './translations/zh';
import { enTranslations } from './translations/en';

export const translations = {
  zh: zhTranslations,
  en: enTranslations,
};

export type Language = 'zh' | 'en';
export type TranslationKey = keyof typeof zhTranslations;

export function getTranslation(lang: Language) {
  return translations[lang];
}
```

- [ ] **Step 4: Create I18nContext**

```typescript
// src/contexts/I18nContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, getTranslation, Translations } from '../i18n';

interface I18nContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'typing_language';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'zh' || saved === 'en') return saved;
    // Auto-detect from browser
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('zh') ? 'zh' : 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = getTranslation(language);

  return (
    <I18nContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
```

- [ ] **Step 5: Add I18nProvider to App.tsx**

在 App.tsx 中添加 Provider 包裹（后续步骤会完成完整集成）

```typescript
// 在 App.tsx 顶部导入
import { I18nProvider } from './contexts/I18nContext';

// 在 render 部分包裹
<I18nProvider>
  <AppContent />
</I18nProvider>
```

- [ ] **Step 6: Commit**

```bash
git add src/i18n/ src/contexts/I18nContext.tsx
git commit -m "feat: add i18n infrastructure with zh/en translations

- Add Chinese and English translation files
- Create I18nContext for language state management
- Auto-detect browser language on first visit
- Persist language preference to localStorage

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: XP/等级系统核心逻辑

**Files:**
- Create: `src/constants/levels.ts`
- Create: `src/utils/xpCalculator.ts`
- Create: `src/utils/levelCalculator.ts`
- Create: `src/contexts/ProgressContext.tsx`

- [ ] **Step 1: Create level definitions**

```typescript
// src/constants/levels.ts
export interface LevelDefinition {
  level: number;
  minXP: number;
  maxXP: number;
  titleKey: string;
  emoji: string;
  themeId: string;
  unlockedPetIds: string[];
}

// XP required for each level (cumulative)
// Level 1: 0, Level 2: 100, Level 3: 250, Level 4: 450, Level 5: 700...
function calculateXPForLevel(level: number): number {
  if (level <= 1) return 0;
  // Formula: each level requires 50 more XP than previous
  // Level 2: 100, Level 3: 150 (total 250), Level 4: 200 (total 450)...
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += 50 + (i - 2) * 50; // 100, 150, 200, 250...
  }
  return total;
}

export const LEVELS: LevelDefinition[] = [
  // Level 1-5: Snail
  { level: 1, minXP: calculateXPForLevel(1), maxXP: calculateXPForLevel(2), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: ['snail'] },
  { level: 2, minXP: calculateXPForLevel(2), maxXP: calculateXPForLevel(3), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: [] },
  { level: 3, minXP: calculateXPForLevel(3), maxXP: calculateXPForLevel(4), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: [] },
  { level: 4, minXP: calculateXPForLevel(4), maxXP: calculateXPForLevel(5), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: [] },
  { level: 5, minXP: calculateXPForLevel(5), maxXP: calculateXPForLevel(6), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: [] },
  // Level 6-10: Rabbit
  { level: 6, minXP: calculateXPForLevel(6), maxXP: calculateXPForLevel(7), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: ['rabbit'] },
  { level: 7, minXP: calculateXPForLevel(7), maxXP: calculateXPForLevel(8), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: [] },
  { level: 8, minXP: calculateXPForLevel(8), maxXP: calculateXPForLevel(9), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: [] },
  { level: 9, minXP: calculateXPForLevel(9), maxXP: calculateXPForLevel(10), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: [] },
  { level: 10, minXP: calculateXPForLevel(10), maxXP: calculateXPForLevel(11), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: [] },
  // Level 11-15: Fox
  { level: 11, minXP: calculateXPForLevel(11), maxXP: calculateXPForLevel(12), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: ['fox'] },
  { level: 12, minXP: calculateXPForLevel(12), maxXP: calculateXPForLevel(13), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: [] },
  { level: 13, minXP: calculateXPForLevel(13), maxXP: calculateXPForLevel(14), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: [] },
  { level: 14, minXP: calculateXPForLevel(14), maxXP: calculateXPForLevel(15), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: [] },
  { level: 15, minXP: calculateXPForLevel(15), maxXP: calculateXPForLevel(16), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: [] },
  // Level 16-20: Cheetah
  { level: 16, minXP: calculateXPForLevel(16), maxXP: calculateXPForLevel(17), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: ['cheetah'] },
  { level: 17, minXP: calculateXPForLevel(17), maxXP: calculateXPForLevel(18), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: [] },
  { level: 18, minXP: calculateXPForLevel(18), maxXP: calculateXPForLevel(19), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: [] },
  { level: 19, minXP: calculateXPForLevel(19), maxXP: calculateXPForLevel(20), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: [] },
  { level: 20, minXP: calculateXPForLevel(20), maxXP: calculateXPForLevel(21), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: [] },
  // Level 21-25: Eagle
  { level: 21, minXP: calculateXPForLevel(21), maxXP: calculateXPForLevel(22), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: ['eagle'] },
  { level: 22, minXP: calculateXPForLevel(22), maxXP: calculateXPForLevel(23), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: [] },
  { level: 23, minXP: calculateXPForLevel(23), maxXP: calculateXPForLevel(24), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: [] },
  { level: 24, minXP: calculateXPForLevel(24), maxXP: calculateXPForLevel(25), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: [] },
  { level: 25, minXP: calculateXPForLevel(25), maxXP: calculateXPForLevel(26), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: [] },
  // Level 26+: Dragon
  { level: 26, minXP: calculateXPForLevel(26), maxXP: Infinity, titleKey: 'level.level_26', emoji: '🐉', themeId: 'volcano', unlockedPetIds: ['dragon'] },
];

export function getLevelByXP(xp: number): LevelDefinition {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevelXP(currentXP: number): number {
  const currentLevel = getLevelByXP(currentXP);
  return currentLevel.maxXP;
}

export function getXPProgress(currentXP: number): { current: number; required: number; percentage: number } {
  const currentLevel = getLevelByXP(currentXP);
  const nextLevelXP = currentLevel.maxXP;

  if (nextLevelXP === Infinity) {
    return { current: currentXP - currentLevel.minXP, required: 0, percentage: 100 };
  }

  const levelXP = currentXP - currentLevel.minXP;
  const requiredXP = nextLevelXP - currentLevel.minXP;
  const percentage = Math.min(100, Math.round((levelXP / requiredXP) * 100));

  return { current: levelXP, required: requiredXP, percentage };
}
```

- [ ] **Step 2: Create XP calculator**

```typescript
// src/utils/xpCalculator.ts
export interface XPCalculationInput {
  chars: number;
  durationMinutes: number;
  wpm: number;
}

export function calculateXP(input: XPCalculationInput): number {
  let xp = 0;

  // Base: 1 XP per character
  xp += input.chars * 1;

  // Time bonus: 10 XP per minute
  xp += Math.floor(input.durationMinutes * 10);

  // WPM bonus
  if (input.wpm > 60) {
    xp += 100; // Speed Master
  } else if (input.wpm > 30) {
    xp += 50;  // Speed Star
  }

  return Math.round(xp);
}

export function calculateSessionXP(
  chars: number,
  startTime: number,
  endTime: number,
  wpm: number
): number {
  const durationMinutes = (endTime - startTime) / 1000 / 60;
  return calculateXP({ chars, durationMinutes, wpm });
}
```

- [ ] **Step 3: Create ProgressContext**

```typescript
// src/contexts/ProgressContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LevelDefinition, getLevelByXP, getXPProgress } from '../constants/levels';

export interface UserProgress {
  totalXP: number;
  currentLevel: number;
  unlockedPets: string[];
  activePet: string | null;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  totalChars: number;
  totalPracticeTime: number; // in minutes
}

interface ProgressContextType {
  progress: UserProgress;
  currentLevel: LevelDefinition;
  xpProgress: { current: number; required: number; percentage: number };
  addXP: (amount: number) => void;
  addPracticeSession: (chars: number, durationMinutes: number) => void;
  updateStreak: () => void;
  unlockPet: (petId: string) => void;
  setActivePet: (petId: string | null) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const defaultProgress: UserProgress = {
  totalXP: 0,
  currentLevel: 1,
  unlockedPets: ['snail'],
  activePet: 'snail',
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  totalChars: 0,
  totalPracticeTime: 0,
};

export const ProgressProvider: React.FC<{
  children: React.ReactNode;
  initialProgress?: UserProgress;
  onProgressUpdate?: (progress: UserProgress) => void;
}> = ({ children, initialProgress, onProgressUpdate }) => {
  const [progress, setProgress] = useState<UserProgress>(initialProgress || defaultProgress);

  const currentLevel = getLevelByXP(progress.totalXP);
  const xpProgress = getXPProgress(progress.totalXP);

  // Update level when XP changes
  useEffect(() => {
    if (currentLevel.level !== progress.currentLevel) {
      setProgress(prev => ({
        ...prev,
        currentLevel: currentLevel.level,
        unlockedPets: [...new Set([...prev.unlockedPets, ...currentLevel.unlockedPetIds])],
      }));
    }
  }, [currentLevel, progress.currentLevel]);

  // Persist progress changes
  useEffect(() => {
    onProgressUpdate?.(progress);
  }, [progress, onProgressUpdate]);

  const addXP = useCallback((amount: number) => {
    setProgress(prev => ({
      ...prev,
      totalXP: prev.totalXP + amount,
    }));
  }, []);

  const addPracticeSession = useCallback((chars: number, durationMinutes: number) => {
    setProgress(prev => ({
      ...prev,
      totalChars: prev.totalChars + chars,
      totalPracticeTime: prev.totalPracticeTime + durationMinutes,
    }));
  }, []);

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = progress.lastPracticeDate;

    setProgress(prev => {
      let newStreak = prev.currentStreak;

      if (!lastDate) {
        // First practice ever
        newStreak = 1;
      } else {
        const last = new Date(lastDate);
        const today_date = new Date(today);
        const diffDays = Math.floor((today_date.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          // Already practiced today, keep streak
          newStreak = prev.currentStreak;
        } else if (diffDays === 1) {
          // Consecutive day
          newStreak = prev.currentStreak + 1;
        } else {
          // Streak broken
          newStreak = 1;
        }
      }

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastPracticeDate: today,
      };
    });
  }, [progress.lastPracticeDate]);

  const unlockPet = useCallback((petId: string) => {
    setProgress(prev => ({
      ...prev,
      unlockedPets: [...new Set([...prev.unlockedPets, petId])],
    }));
  }, []);

  const setActivePet = useCallback((petId: string | null) => {
    setProgress(prev => ({
      ...prev,
      activePet: petId,
    }));
  }, []);

  return (
    <ProgressContext.Provider value={{
      progress,
      currentLevel,
      xpProgress,
      addXP,
      addPracticeSession,
      updateStreak,
      unlockPet,
      setActivePet,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};
```

- [ ] **Step 4: Commit**

```bash
git add src/constants/levels.ts src/utils/xpCalculator.ts src/contexts/ProgressContext.tsx
git commit -m "feat: add XP and level system core logic

- Add level definitions with XP requirements
- Create XP calculator with char/time/WPM bonuses
- Create ProgressContext for state management
- Implement streak tracking

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: 成就系统

**Files:**
- Create: `src/constants/achievements.ts`
- Create: `src/utils/achievementChecker.ts`
- Create: `src/contexts/AchievementContext.tsx`

- [ ] **Step 1: Create achievement definitions**

```typescript
// src/constants/achievements.ts
export type AchievementType = 'milestone' | 'streak' | 'accuracy';

export interface AchievementDefinition {
  id: string;
  type: AchievementType;
  xpReward: number;
  checkCondition: (stats: UserStats) => boolean;
  getProgress?: (stats: UserStats) => number; // 0-100
}

export interface UserStats {
  totalSessions: number;
  totalChars: number;
  totalPracticeTime: number; // minutes
  currentStreak: number;
  bestWpm: number;
  lastSessionAccuracy: number;
  recentAccuracies: number[]; // last N sessions
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  // Milestone achievements
  {
    id: 'first_try',
    type: 'milestone',
    xpReward: 50,
    checkCondition: (stats) => stats.totalSessions >= 1,
  },
  {
    id: 'centurion',
    type: 'milestone',
    xpReward: 200,
    checkCondition: (stats) => stats.totalChars >= 100,
    getProgress: (stats) => Math.min(100, (stats.totalChars / 100) * 100),
  },
  {
    id: 'thousand_master',
    type: 'milestone',
    xpReward: 300,
    checkCondition: (stats) => stats.totalChars >= 1000,
    getProgress: (stats) => Math.min(100, (stats.totalChars / 1000) * 100),
  },
  {
    id: 'ten_king',
    type: 'milestone',
    xpReward: 1000,
    checkCondition: (stats) => stats.totalChars >= 10000,
    getProgress: (stats) => Math.min(100, (stats.totalChars / 10000) * 100),
  },
  {
    id: 'speed_star',
    type: 'milestone',
    xpReward: 200,
    checkCondition: (stats) => stats.bestWpm >= 50,
  },
  {
    id: 'speed_master',
    type: 'milestone',
    xpReward: 500,
    checkCondition: (stats) => stats.bestWpm >= 80,
  },
  {
    id: 'perfect_accuracy',
    type: 'milestone',
    xpReward: 300,
    checkCondition: (stats) => stats.lastSessionAccuracy === 100,
  },
  {
    id: 'persistent',
    type: 'milestone',
    xpReward: 200,
    checkCondition: (stats) => stats.totalPracticeTime >= 30,
    getProgress: (stats) => Math.min(100, (stats.totalPracticeTime / 30) * 100),
  },
  // Streak achievements
  {
    id: 'streak_3',
    type: 'streak',
    xpReward: 200,
    checkCondition: (stats) => stats.currentStreak >= 3,
    getProgress: (stats) => Math.min(100, (stats.currentStreak / 3) * 100),
  },
  {
    id: 'streak_7',
    type: 'streak',
    xpReward: 500,
    checkCondition: (stats) => stats.currentStreak >= 7,
    getProgress: (stats) => Math.min(100, (stats.currentStreak / 7) * 100),
  },
  {
    id: 'streak_30',
    type: 'streak',
    xpReward: 2000,
    checkCondition: (stats) => stats.currentStreak >= 30,
    getProgress: (stats) => Math.min(100, (stats.currentStreak / 30) * 100),
  },
  // Accuracy achievements
  {
    id: 'accuracy_streak_5',
    type: 'accuracy',
    xpReward: 300,
    checkCondition: (stats) => {
      const recent5 = stats.recentAccuracies.slice(-5);
      return recent5.length >= 5 && recent5.every(a => a > 95);
    },
    getProgress: (stats) => {
      const recentHighAccuracy = stats.recentAccuracies.filter(a => a > 95).length;
      return Math.min(100, (recentHighAccuracy / 5) * 100);
    },
  },
];

export function getAchievementById(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}
```

- [ ] **Step 2: Create achievement checker**

```typescript
// src/utils/achievementChecker.ts
import { ACHIEVEMENTS, AchievementDefinition, UserStats } from '../constants/achievements';

export interface AchievementRecord {
  id: string;
  unlockedAt: number;
  progress: number;
}

export interface AchievementCheckResult {
  newlyUnlocked: AchievementDefinition[];
  allAchievements: AchievementRecord[];
}

export function checkAchievements(
  userStats: UserStats,
  alreadyUnlocked: string[]
): AchievementCheckResult {
  const newlyUnlocked: AchievementDefinition[] = [];
  const allAchievements: AchievementRecord[] = [];

  for (const achievement of ACHIEVEMENTS) {
    const isUnlocked = alreadyUnlocked.includes(achievement.id);
    const canUnlock = achievement.checkCondition(userStats);
    const progress = achievement.getProgress ? achievement.getProgress(userStats) : (isUnlocked ? 100 : 0);

    if (!isUnlocked && canUnlock) {
      newlyUnlocked.push(achievement);
    }

    allAchievements.push({
      id: achievement.id,
      unlockedAt: isUnlocked || canUnlock ? Date.now() : 0,
      progress,
    });
  }

  return { newlyUnlocked, allAchievements };
}

export function calculateAchievementXP(achievements: AchievementDefinition[]): number {
  return achievements.reduce((total, a) => total + a.xpReward, 0);
}
```

- [ ] **Step 3: Create AchievementContext**

```typescript
// src/contexts/AchievementContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AchievementRecord, checkAchievements, calculateAchievementXP } from '../utils/achievementChecker';
import { UserStats } from '../constants/achievements';

interface AchievementContextType {
  achievements: AchievementRecord[];
  newlyUnlocked: AchievementRecord[];
  checkAndUnlock: (stats: UserStats) => number; // returns XP gained
  clearNewlyUnlocked: () => void;
  isUnlocked: (id: string) => boolean;
  getProgress: (id: string) => number;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider: React.FC<{
  children: React.ReactNode;
  initialAchievements?: AchievementRecord[];
  onAchievementsUpdate?: (achievements: AchievementRecord[]) => void;
  onXPGained?: (amount: number) => void;
}> = ({ children, initialAchievements = [], onAchievementsUpdate, onXPGained }) => {
  const [achievements, setAchievements] = useState<AchievementRecord[]>(initialAchievements);
  const [newlyUnlocked, setNewlyUnlocked] = useState<AchievementRecord[]>([]);

  const checkAndUnlock = useCallback((stats: UserStats): number => {
    const alreadyUnlocked = achievements.map(a => a.id);
    const result = checkAchievements(stats, alreadyUnlocked);

    if (result.newlyUnlocked.length > 0) {
      const xpGained = calculateAchievementXP(result.newlyUnlocked);

      setAchievements(result.allAchievements);
      setNewlyUnlocked(result.allAchievements.filter(a =>
        result.newlyUnlocked.some(n => n.id === a.id)
      ));

      onAchievementsUpdate?.(result.allAchievements);
      onXPGained?.(xpGained);

      return xpGained;
    }

    return 0;
  }, [achievements, onAchievementsUpdate, onXPGained]);

  const clearNewlyUnlocked = useCallback(() => {
    setNewlyUnlocked([]);
  }, []);

  const isUnlocked = useCallback((id: string): boolean => {
    const achievement = achievements.find(a => a.id === id);
    return achievement ? achievement.unlockedAt > 0 : false;
  }, [achievements]);

  const getProgress = useCallback((id: string): number => {
    const achievement = achievements.find(a => a.id === id);
    return achievement?.progress || 0;
  }, [achievements]);

  return (
    <AchievementContext.Provider value={{
      achievements,
      newlyUnlocked,
      checkAndUnlock,
      clearNewlyUnlocked,
      isUnlocked,
      getProgress,
    }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within AchievementProvider');
  }
  return context;
};
```

- [ ] **Step 4: Commit**

```bash
git add src/constants/achievements.ts src/utils/achievementChecker.ts src/contexts/AchievementContext.tsx
git commit -m "feat: add achievement system

- Add 12 achievement definitions (milestone, streak, accuracy)
- Create achievement checker with progress tracking
- Create AchievementContext for state management
- XP rewards for unlocking achievements

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: 宠物系统

**Files:**
- Create: `src/constants/pets.ts`
- Create: `src/components/PetDisplay.tsx`

- [ ] **Step 1: Create pet definitions**

```typescript
// src/constants/pets.ts
export type PetStage = 'baby' | 'teen' | 'adult';

export interface PetDefinition {
  id: string;
  emoji: string;
  nameKey: string;
  descriptionKey: string;
  unlockLevel: number;
  maxGrowth: number;
}

export const PETS: PetDefinition[] = [
  {
    id: 'snail',
    emoji: '🐌',
    nameKey: 'pet.snail.name',
    descriptionKey: 'pet.snail.description',
    unlockLevel: 1,
    maxGrowth: 100,
  },
  {
    id: 'rabbit',
    emoji: '🐰',
    nameKey: 'pet.rabbit.name',
    descriptionKey: 'pet.rabbit.description',
    unlockLevel: 6,
    maxGrowth: 100,
  },
  {
    id: 'fox',
    emoji: '🦊',
    nameKey: 'pet.fox.name',
    descriptionKey: 'pet.fox.description',
    unlockLevel: 11,
    maxGrowth: 100,
  },
  {
    id: 'cheetah',
    emoji: '🐆',
    nameKey: 'pet.cheetah.name',
    descriptionKey: 'pet.cheetah.description',
    unlockLevel: 16,
    maxGrowth: 100,
  },
  {
    id: 'eagle',
    emoji: '🦅',
    nameKey: 'pet.eagle.name',
    descriptionKey: 'pet.eagle.description',
    unlockLevel: 21,
    maxGrowth: 100,
  },
  {
    id: 'dragon',
    emoji: '🐉',
    nameKey: 'pet.dragon.name',
    descriptionKey: 'pet.dragon.description',
    unlockLevel: 26,
    maxGrowth: 100,
  },
];

export function getPetById(id: string): PetDefinition | undefined {
  return PETS.find(p => p.id === id);
}

export function getPetStage(growth: number): PetStage {
  if (growth < 20) return 'baby';
  if (growth < 50) return 'teen';
  return 'adult';
}

export function getStageMultiplier(stage: PetStage): number {
  switch (stage) {
    case 'baby': return 0.6;
    case 'teen': return 0.8;
    case 'adult': return 1.0;
  }
}

export function calculatePetGrowth(
  dailyPractice: boolean,
  streak: number,
  achievementsUnlocked: number
): number {
  let growth = 0;
  if (dailyPractice) growth += 1;
  if (streak >= 7) growth += 1;
  if (streak >= 30) growth += 2;
  growth += achievementsUnlocked * 2;
  return growth;
}
```

- [ ] **Step 2: Create PetDisplay component**

```typescript
// src/components/PetDisplay.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../contexts/I18nContext';
import { getPetById, getPetStage, getStageMultiplier, PetStage } from '../constants/pets';

interface PetDisplayProps {
  petId: string;
  growth: number;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export const PetDisplay: React.FC<PetDisplayProps> = ({
  petId,
  growth,
  onClick,
  size = 'medium',
  animated = true,
}) => {
  const { t } = useI18n();
  const pet = getPetById(petId);
  const stage = getPetStage(growth);
  const [isHovered, setIsHovered] = useState(false);

  if (!pet) return null;

  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl',
  };

  const stageMultiplier = getStageMultiplier(stage);

  return (
    <motion.div
      className={`relative cursor-pointer select-none ${onClick ? 'hover:scale-110' : ''} transition-transform`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={animated ? {
        y: [0, -5, 0],
        scale: [stageMultiplier, stageMultiplier * 1.05, stageMultiplier],
      } : {}}
      transition={animated ? {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      } : {}}
    >
      <span className={sizeClasses[size]}>{pet.emoji}</span>

      {/* Hover tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-50"
          >
            <div className="font-bold">{t.pets[petId as keyof typeof t.pets]?.name || petId}</div>
            <div className="text-gray-300">{t.pet.growth}: {growth}/100</div>
            <div className="text-gray-400 capitalize">{t.pet[`stage_${stage}` as keyof typeof t.pet]}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage indicator */}
      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
        style={{
          backgroundColor: stage === 'baby' ? '#86efac' : stage === 'teen' ? '#60a5fa' : '#f472b6',
        }}
      />
    </motion.div>
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add src/constants/pets.ts src/components/PetDisplay.tsx
git commit -m "feat: add pet system

- Add 6 pet definitions with unlock levels
- Create pet growth calculation
- Create PetDisplay component with animations
- Show growth stage and tooltip on hover

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: 主题系统

**Files:**
- Create: `src/constants/themes.ts`
- Create: `src/contexts/ThemeContext.tsx`

- [ ] **Step 1: Create theme definitions**

```typescript
// src/constants/themes.ts
export interface ThemeDefinition {
  id: string;
  nameKey: string;
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  gradient: string;
  unlockLevel: number;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'forest',
    nameKey: 'theme.forest',
    primary: '#22c55e',
    secondary: '#16a34a',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    accent: '#86efac',
    gradient: 'from-green-500 to-emerald-600',
    unlockLevel: 1,
  },
  {
    id: 'meadow',
    nameKey: 'theme.meadow',
    primary: '#f472b6',
    secondary: '#ec4899',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    accent: '#f9a8d4',
    gradient: 'from-pink-400 to-rose-500',
    unlockLevel: 6,
  },
  {
    id: 'desert',
    nameKey: 'theme.desert',
    primary: '#f97316',
    secondary: '#ea580c',
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    accent: '#fdba74',
    gradient: 'from-orange-400 to-amber-500',
    unlockLevel: 11,
  },
  {
    id: 'savanna',
    nameKey: 'theme.savanna',
    primary: '#eab308',
    secondary: '#ca8a04',
    background: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)',
    accent: '#fde047',
    gradient: 'from-yellow-400 to-amber-500',
    unlockLevel: 16,
  },
  {
    id: 'sky',
    nameKey: 'theme.sky',
    primary: '#3b82f6',
    secondary: '#2563eb',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    accent: '#93c5fd',
    gradient: 'from-blue-400 to-indigo-500',
    unlockLevel: 21,
  },
  {
    id: 'volcano',
    nameKey: 'theme.volcano',
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    accent: '#c4b5fd',
    gradient: 'from-violet-500 to-purple-600',
    unlockLevel: 26,
  },
];

export function getThemeById(id: string): ThemeDefinition | undefined {
  return THEMES.find(t => t.id === id);
}

export function getThemeByLevel(level: number): ThemeDefinition {
  // Find the highest theme unlocked at this level
  for (let i = THEMES.length - 1; i >= 0; i--) {
    if (level >= THEMES[i].unlockLevel) {
      return THEMES[i];
    }
  }
  return THEMES[0];
}
```

- [ ] **Step 2: Create ThemeContext**

```typescript
// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeDefinition, getThemeById, getThemeByLevel } from '../constants/themes';

interface ThemeContextType {
  theme: ThemeDefinition;
  setTheme: (themeId: string) => void;
  availableThemes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'typing_theme';

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  currentLevel: number;
}> = ({ children, currentLevel }) => {
  const [themeId, setThemeId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || 'forest';
  });

  const theme = getThemeById(themeId) || getThemeByLevel(currentLevel);

  // Auto-switch to newly unlocked theme
  useEffect(() => {
    const currentTheme = getThemeById(themeId);
    if (currentTheme && currentLevel < currentTheme.unlockLevel) {
      // Current theme is locked, switch to highest available
      const newTheme = getThemeByLevel(currentLevel);
      setThemeId(newTheme.id);
    }
  }, [currentLevel, themeId]);

  const setTheme = useCallback((id: string) => {
    const selected = getThemeById(id);
    if (selected && currentLevel >= selected.unlockLevel) {
      setThemeId(id);
      localStorage.setItem(STORAGE_KEY, id);
    }
  }, [currentLevel]);

  const availableThemes = THEMES.filter(t => currentLevel >= t.unlockLevel);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
      <div style={{ '--theme-primary': theme.primary, '--theme-secondary': theme.secondary } as React.CSSProperties}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

- [ ] **Step 3: Commit**

```bash
git add src/constants/themes.ts src/contexts/ThemeContext.tsx
git commit -m "feat: add theme system

- Add 6 theme definitions with unlock levels
- Create ThemeContext for theme state management
- Auto-switch to newly unlocked theme
- Persist theme preference to localStorage

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: UI 组件 - 等级进度条

**Files:**
- Create: `src/components/LevelProgress.tsx`

- [ ] **Step 1: Create LevelProgress component**

```typescript
// src/components/LevelProgress.tsx
import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../contexts/I18nContext';
import { useProgress } from '../contexts/ProgressContext';

export const LevelProgress: React.FC = () => {
  const { t } = useI18n();
  const { currentLevel, xpProgress } = useProgress();

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
      <div className="text-2xl">{currentLevel.emoji}</div>
      <div className="flex flex-col min-w-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-600">
            Lv.{currentLevel.level}
          </span>
          <span className="text-[10px] text-gray-400">
            {xpProgress.current}/{xpProgress.required} XP
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: currentLevel.themeId === 'forest' ? '#22c55e' :
                     currentLevel.themeId === 'meadow' ? '#f472b6' :
                     currentLevel.themeId === 'desert' ? '#f97316' :
                     currentLevel.themeId === 'savanna' ? '#eab308' :
                     currentLevel.themeId === 'sky' ? '#3b82f6' : '#8b5cf6' }}
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress.percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LevelProgress.tsx
git commit -m "feat: add LevelProgress component

- Display current level with emoji
- Show XP progress bar with animation
- Theme-colored progress indicator

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 7: UI 组件 - 成就卡片和弹窗

**Files:**
- Create: `src/components/AchievementCard.tsx`
- Create: `src/components/AchievementUnlockModal.tsx`

- [ ] **Step 1: Create AchievementCard component**

```typescript
// src/components/AchievementCard.tsx
import React from 'react';
import { motion } from 'motion/react';
import { Lock, Check } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { getAchievementById } from '../constants/achievements';

interface AchievementCardProps {
  achievementId: string;
  unlocked: boolean;
  progress: number;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievementId,
  unlocked,
  progress,
}) => {
  const { t } = useI18n();
  const achievement = getAchievementById(achievementId);

  if (!achievement) return null;

  const achievementTrans = t.achievements[achievementId as keyof typeof t.achievements] as { name: string; description: string } | undefined;

  return (
    <motion.div
      className={`relative p-4 rounded-xl border-2 transition-all ${
        unlocked
          ? 'bg-white border-yellow-400 shadow-md'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
          unlocked ? 'bg-yellow-100' : 'bg-gray-200'
        }`}>
          {unlocked ? '🏆' : '🔒'}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{achievementTrans?.name || achievementId}</h3>
          <p className="text-xs text-gray-500 mt-1">{achievementTrans?.description || ''}</p>

          {!unlocked && progress > 0 && (
            <div className="mt-2">
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400 mt-1">{Math.round(progress)}%</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-yellow-600">+{achievement.xpReward} XP</span>
          {unlocked && <Check size={16} className="text-green-500 mt-1 ml-auto" />}
        </div>
      </div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Create AchievementUnlockModal component**

```typescript
// src/components/AchievementUnlockModal.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { useAchievements } from '../contexts/AchievementContext';
import { getAchievementById } from '../constants/achievements';

export const AchievementUnlockModal: React.FC = () => {
  const { t } = useI18n();
  const { newlyUnlocked, clearNewlyUnlocked } = useAchievements();

  useEffect(() => {
    if (newlyUnlocked.length > 0) {
      const timer = setTimeout(() => {
        clearNewlyUnlocked();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newlyUnlocked, clearNewlyUnlocked]);

  if (newlyUnlocked.length === 0) return null;

  const current = newlyUnlocked[0];
  const achievement = getAchievementById(current.id);
  const achievementTrans = t.achievements[current.id as keyof typeof t.achievements] as { name: string; description: string } | undefined;

  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={clearNewlyUnlocked}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={clearNewlyUnlocked}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Trophy size={40} className="text-yellow-600" />
          </motion.div>

          <h2 className="text-2xl font-black text-gray-900 mb-2">
            {t.achievements.unlocked}!
          </h2>

          <h3 className="text-xl font-bold text-yellow-600 mb-2">
            {achievementTrans?.name || current.id}
          </h3>

          <p className="text-gray-500 mb-4">{achievementTrans?.description || ''}</p>

          <div className="bg-yellow-50 rounded-xl p-4">
            <span className="text-3xl font-black text-yellow-600">+{achievement.xpReward}</span>
            <span className="text-yellow-600 ml-2">XP</span>
          </div>

          {newlyUnlocked.length > 1 && (
            <p className="text-sm text-gray-400 mt-4">
              +{newlyUnlocked.length - 1} {t.achievements.title.toLowerCase()}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add src/components/AchievementCard.tsx src/components/AchievementUnlockModal.tsx
git commit -m "feat: add achievement UI components

- Create AchievementCard with locked/unlocked states
- Create AchievementUnlockModal with celebration animation
- Show progress for locked achievements
- Auto-dismiss after 5 seconds

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 8: 设置页面

**Files:**
- Create: `src/components/modals/SettingsModal.tsx`

- [ ] **Step 1: Create SettingsModal component**

```typescript
// src/components/modals/SettingsModal.tsx
import React from 'react';
import { motion } from 'motion/react';
import { X, Globe, Palette, Cat } from 'lucide-react';
import { useI18n, Language } from '../../contexts/I18nContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useProgress } from '../../contexts/ProgressContext';
import { PetDisplay } from '../PetDisplay';
import { THEMES } from '../../constants/themes';
import { PETS } from '../../constants/pets';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { t, language, setLanguage } = useI18n();
  const { theme, setTheme, availableThemes } = useTheme();
  const { progress, setActivePet } = useProgress();

  if (!isOpen) return null;

  return (
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
        className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{t.settings.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Language Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-800">{t.settings.language}</h3>
          </div>
          <div className="flex gap-3">
            {(['zh', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  language === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {lang === 'zh' ? t.settings.chinese : t.settings.english}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-800">{t.settings.theme}</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {THEMES.map((t) => {
              const isLocked = !availableThemes.some(at => at.id === t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => !isLocked && setTheme(t.id)}
                  disabled={isLocked}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    theme.id === t.id
                      ? 'border-blue-500 bg-blue-50'
                      : isLocked
                      ? 'border-gray-200 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-2"
                    style={{ background: t.primary }}
                  />
                  <span className="text-xs font-medium">{t.id}</span>
                  {isLocked && <span className="text-[10px] text-gray-400 block">Lv.{t.unlockLevel}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pet Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cat size={20} className="text-pink-600" />
            <h3 className="font-bold text-gray-800">{t.settings.pet}</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {PETS.map((pet) => {
              const isUnlocked = progress.unlockedPets.includes(pet.id);
              const isActive = progress.activePet === pet.id;
              return (
                <button
                  key={pet.id}
                  onClick={() => isUnlocked && setActivePet(pet.id)}
                  disabled={!isUnlocked}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isActive
                      ? 'border-pink-500 bg-pink-50'
                      : !isUnlocked
                      ? 'border-gray-200 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-1">{pet.emoji}</div>
                  <span className="text-xs font-medium">{pet.id}</span>
                  {!isUnlocked && <span className="text-[10px] text-gray-400 block">Lv.{pet.unlockLevel}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/modals/SettingsModal.tsx
git commit -m "feat: add SettingsModal component

- Language selection (Chinese/English)
- Theme selection with unlock levels
- Pet selection with unlock levels
- Responsive grid layout

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 9: 成就页面

**Files:**
- Create: `src/components/modals/AchievementsModal.tsx`

- [ ] **Step 1: Create AchievementsModal component**

```typescript
// src/components/modals/AchievementsModal.tsx
import React from 'react';
import { motion } from 'motion/react';
import { X, Trophy } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';
import { useAchievements } from '../../contexts/AchievementContext';
import { ACHIEVEMENTS } from '../../constants/achievements';
import { AchievementCard } from '../AchievementCard';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const { achievements, isUnlocked, getProgress } = useAchievements();

  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlockedAt > 0).length;
  const totalCount = ACHIEVEMENTS.length;

  return (
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
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Trophy size={24} className="text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t.achievements.title}</h2>
              <p className="text-sm text-gray-500">{unlockedCount}/{totalCount} {t.achievements.unlocked.toLowerCase()}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 rounded-full transition-all"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Achievement grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievementId={achievement.id}
              unlocked={isUnlocked(achievement.id)}
              progress={getProgress(achievement.id)}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/modals/AchievementsModal.tsx
git commit -m "feat: add AchievementsModal component

- Display all achievements in grid layout
- Show unlocked/locked status with progress
- Overall completion progress bar
- Responsive design

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 10: 集成所有功能到 App.tsx

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/constants.ts`

- [ ] **Step 1: Update User type in constants.ts**

```typescript
// Add to src/constants.ts

export interface UserProgress {
  totalXP: number;
  currentLevel: number;
  unlockedPets: string[];
  activePet: string | null;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  totalChars: number;
  totalPracticeTime: number;
}

export interface AchievementRecord {
  id: string;
  unlockedAt: number;
  progress: number;
}

export interface UserPreferences {
  language: 'zh' | 'en';
  theme: string;
  activePet: string | null;
}

// Extend LocalUser interface
export interface LocalUser {
  id: string;
  name: string;
  totalWpm: number;
  totalAccuracy: number;
  totalTime: number;
  sessionCount: number;
  recentSessions?: PracticeSession[];
  keyMistakes?: Record<string, number>;
  dailyRecords?: DailyRecord[];
  // Phase 2 additions
  progress?: UserProgress;
  achievements?: AchievementRecord[];
  preferences?: UserPreferences;
}
```

- [ ] **Step 2: Update App.tsx with all providers and integration**

```typescript
// Add imports at top of App.tsx
import { I18nProvider, useI18n } from './contexts/I18nContext';
import { ProgressProvider, useProgress } from './contexts/ProgressContext';
import { AchievementProvider, useAchievements } from './contexts/AchievementContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LevelProgress } from './components/LevelProgress';
import { PetDisplay } from './components/PetDisplay';
import { AchievementUnlockModal } from './components/AchievementUnlockModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { AchievementsModal } from './components/modals/AchievementsModal';
import { calculateSessionXP } from './utils/xpCalculator';
import { getPetStage, calculatePetGrowth } from './constants/pets';

// Wrap App with providers
function AppWithProviders() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

function AppContent() {
  const { t } = useI18n();
  // ... rest of App component becomes AppContent
}

// Inside AppContent, wrap with other providers
function AppContent() {
  const [currentUser, setCurrentUser] = useState<LocalUser | null>(null);
  // ... other state

  // Load user with migration
  useEffect(() => {
    const savedUsers = localStorage.getItem('typing_users');
    if (savedUsers) {
      const parsed = JSON.parse(savedUsers);
      const migrated = parsed.map((u: any) => ({
        ...u,
        keyMistakes: u.keyMistakes || {},
        dailyRecords: u.dailyRecords || [],
        // Phase 2 migration
        progress: u.progress || {
          totalXP: calculateInitialXP(u),
          currentLevel: 1,
          unlockedPets: ['snail'],
          activePet: 'snail',
          currentStreak: 0,
          longestStreak: 0,
          lastPracticeDate: null,
          totalChars: u.totalChars || 0,
          totalPracticeTime: Math.floor((u.totalTime || 0) / 60),
        },
        achievements: u.achievements || [],
        preferences: u.preferences || {
          language: 'zh',
          theme: 'forest',
          activePet: 'snail',
        },
      }));
      setUsers(migrated);
    }
  }, []);

  // Calculate initial XP from existing stats
  function calculateInitialXP(user: any): number {
    // Rough estimate based on existing data
    const charsXP = (user.totalChars || 0) * 1;
    const timeXP = Math.floor((user.totalTime || 0) / 60) * 10;
    return charsXP + timeXP;
  }

  // Render with providers
  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <ProgressProvider
      initialProgress={currentUser.progress}
      onProgressUpdate={(progress) => {
        const updated = users.map(u =>
          u.id === currentUser.id ? { ...u, progress } : u
        );
        setUsers(updated);
        localStorage.setItem('typing_users', JSON.stringify(updated));
      }}
    >
      <AchievementProvider
        initialAchievements={currentUser.achievements}
        onAchievementsUpdate={(achievements) => {
          const updated = users.map(u =>
            u.id === currentUser.id ? { ...u, achievements } : u
          );
          setUsers(updated);
        }}
        onXPGained={(xp) => {
          // XP will be added through ProgressProvider
        }}
      >
        <ThemeWrapper userId={currentUser.id}>
          <MainApp />
        </ThemeWrapper>
      </AchievementProvider>
    </ProgressProvider>
  );
}

function ThemeWrapper({ children, userId }: { children: React.ReactNode; userId: string }) {
  const { progress } = useProgress();
  return (
    <ThemeProvider currentLevel={progress.currentLevel}>
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 3: Add UI elements to header and practice page**

```typescript
// In MainApp component, add to header:
<header className="...">
  <div className="flex items-center gap-6">
    {/* Existing logo */}

    {/* Add Level Progress */}
    <LevelProgress />

    {/* Add Pet Display */}
    <div className="hidden md:block">
      <PetDisplay
        petId={progress.activePet || 'snail'}
        growth={calculatePetGrowth(
          progress.lastPracticeDate === new Date().toISOString().split('T')[0],
          progress.currentStreak,
          achievements.filter(a => a.unlockedAt > 0).length
        )}
        size="small"
        onClick={() => setShowPetModal(true)}
      />
    </div>

    {/* Add Settings button */}
    <button
      onClick={() => setShowSettings(true)}
      className="p-2 rounded-lg text-gray-400 hover:bg-gray-100"
    >
      <Settings size={20} />
    </button>
  </div>
</header>

// Add modals at the end:
<AchievementUnlockModal />
<SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
<AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} />
```

- [ ] **Step 4: Update saveSession to include XP and achievements**

```typescript
const saveSession = () => {
  if (!currentUser || !startTime) return;

  const timeElapsed = (Date.now() - startTime) / 1000;
  const durationMinutes = timeElapsed / 60;
  const charsTyped = userInput.length;

  // Calculate XP
  const sessionXP = calculateSessionXP(charsTyped, startTime, Date.now(), wpm);

  // Update progress
  addXP(sessionXP);
  addPracticeSession(charsTyped, durationMinutes);
  updateStreak();

  // Check achievements
  const stats = {
    totalSessions: currentUser.sessionCount + 1,
    totalChars: (currentUser.progress?.totalChars || 0) + charsTyped,
    totalPracticeTime: (currentUser.progress?.totalPracticeTime || 0) + durationMinutes,
    currentStreak: (currentUser.progress?.currentStreak || 0),
    bestWpm: Math.max(currentUser.recentSessions?.[0]?.wpm || 0, wpm),
    lastSessionAccuracy: accuracy,
    recentAccuracies: [...(currentUser.recentSessions?.map(s => s.accuracy) || []), accuracy].slice(-5),
  };
  checkAndUnlock(stats);

  // ... rest of save logic
};
```

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/constants.ts
git commit -m "feat: integrate all Phase 2 features into App

- Add all Context providers
- Migrate existing user data with XP calculation
- Add LevelProgress and PetDisplay to header
- Add Settings and Achievements modals
- Update saveSession with XP and achievement checking
- Apply theme-based styling

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 11: 更新 Stats 组件

**Files:**
- Modify: `src/components/Stats.tsx`

- [ ] **Step 1: Add Phase 2 info cards to Stats**

```typescript
// Add to Stats.tsx imports
import { useI18n } from '../contexts/I18nContext';
import { useProgress } from '../contexts/ProgressContext';
import { useAchievements } from '../contexts/AchievementContext';
import { LevelProgress } from './LevelProgress';
import { PetDisplay } from './PetDisplay';
import { Trophy, Star, Flame } from 'lucide-react';

// Add new props
interface StatsProps {
  // ... existing props
  onOpenAchievements?: () => void;
}

// Inside component:
const { t } = useI18n();
const { progress, currentLevel } = useProgress();
const { achievements } = useAchievements();

const unlockedAchievements = achievements.filter(a => a.unlockedAt > 0).length;
const totalAchievements = 12; // or import from constants

// Add new cards in the grid:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
>
  <div className="flex items-center justify-between mb-3">
    <div className="text-yellow-600"><Trophy size={20} /></div>
    <span className="text-xs text-gray-400">{unlockedAchievements}/{totalAchievements}</span>
  </div>
  <div className="text-2xl font-mono font-bold text-gray-800">{unlockedAchievements}</div>
  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t.achievements.title}</div>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
>
  <div className="flex items-center justify-between mb-3">
    <div className="text-orange-600"><Flame size={20} /></div>
    <span className="text-xs text-gray-400">{t.achievements.streak_7.name}</span>
  </div>
  <div className="text-2xl font-mono font-bold text-gray-800">{progress.currentStreak}</div>
  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t.level.title}</div>
</motion.div>

// Add Level and Pet section:
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="text-4xl">{currentLevel.emoji}</div>
      <div>
        <div className="text-sm font-bold text-gray-800">{t.level.current}</div>
        <div className="text-xs text-gray-500">Lv.{currentLevel.level}</div>
      </div>
    </div>
    <LevelProgress />
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
  >
    <div>
      <div className="text-sm font-bold text-gray-800 mb-1">{t.pet.title}</div>
      <div className="text-xs text-gray-500">{progress.unlockedPets.length} {t.pet.unlocked}</div>
    </div>
    {progress.activePet && (
      <PetDisplay
        petId={progress.activePet}
        growth={50} // Calculate actual growth
        size="large"
      />
    )}
  </motion.div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Stats.tsx
git commit -m "feat: update Stats component with Phase 2 info

- Add achievement count card
- Add streak display
- Add level progress section
- Add pet display section
- Use i18n translations

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 12: 替换所有硬编码文本为翻译

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Stats.tsx`
- Modify: `src/components/Keyboard.tsx`
- Modify: `src/components/modals/*.tsx`

- [ ] **Step 1: Replace text in App.tsx**

```typescript
// Replace hardcoded Chinese text with t. references
// Examples:

// Before:
<h1 className="...">FingerGuide</h1>
<p className="...">Master your typing skills...</p>

// After:
<h1 className="...">{t.app.name}</h1>
<p className="...">{t.app.tagline}</p>

// Before:
<div className="...">Avg WPM</div>

// After:
<div className="...">{t.practice.wpm}</div>

// Continue for all UI text...
```

- [ ] **Step 2: Update all components**

重复上述过程，将所有硬编码文本替换为 `t.` 引用。

- [ ] **Step 3: Commit**

```bash
git add src/
git commit -m "feat: internationalize all UI text

- Replace all hardcoded Chinese text with translation keys
- Update all components to use useI18n hook
- Ensure all text has zh/en translations

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## 最终测试清单

- [ ] 应用正常启动无错误
- [ ] 语言切换正常工作
- [ ] XP计算正确（字符+时长+WPM）
- [ ] 等级提升时解锁新宠物和主题
- [ ] 成就解锁时显示弹窗
- [ ] 宠物显示和成长值正确
- [ ] 主题随等级自动切换
- [ ] 设置页面可以切换语言/主题/宠物
- [ ] 统计数据正确显示
- [ ] 现有用户数据正确迁移

---

## 执行方式选择

**Plan complete and saved to `docs/superpowers/plans/2026-04-01-phase2-implementation-plan.md`.**

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
