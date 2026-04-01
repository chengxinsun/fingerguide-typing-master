# Phase 1 Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add time challenge mode, custom text mode, typing heatmap, and progress chart to the FingerGuide Typing Master application.

**Architecture:** Extend existing React components with new practice modes and analytics features. Use recharts for data visualization. Maintain localStorage-based persistence with data migration for new fields.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion, recharts

---

## File Structure Overview

### New Files to Create
- `src/components/ModeSelector.tsx` - Practice mode dropdown
- `src/components/ProgressChart.tsx` - Line chart for WPM/accuracy trends
- `src/components/HeatmapKeyboard.tsx` - Keyboard with error heatmap overlay
- `src/components/modals/TimeChallengeModal.tsx` - Time selection modal
- `src/components/modals/CustomTextModal.tsx` - Custom text input modal
- `src/components/modals/HeatmapModal.tsx` - Fullscreen heatmap view
- `src/components/modals/ProgressModal.tsx` - Fullscreen progress chart
- `src/utils/heatmapColors.ts` - Heatmap color calculation utilities
- `src/utils/dateUtils.ts` - Date formatting utilities

### Files to Modify
- `src/constants.ts` - Add new types and interfaces
- `src/App.tsx` - Add mode state, timer logic, data tracking
- `src/components/Stats.tsx` - Add heatmap and chart cards
- `src/components/Keyboard.tsx` - Optional heatmap support
- `package.json` - Add recharts dependency

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install recharts**

```bash
npm install recharts
```

- [ ] **Step 2: Verify installation**

```bash
npm list recharts
```

Expected: `recharts@^2.15.0` (or similar version)

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add recharts for data visualization"
```

---

## Task 2: Update Types and Constants

**Files:**
- Modify: `src/constants.ts`

- [ ] **Step 1: Add new types after existing types**

Add to `src/constants.ts` after line 41 (after `PracticeItem` interface):

```typescript
export type PracticeMode = 'normal' | 'time-challenge' | 'custom';

export interface DailyRecord {
  date: string;
  avgWpm: number;
  avgAccuracy: number;
  sessionCount: number;
}

export interface ExtendedUserStats {
  keyMistakes: Record<string, number>;
  dailyRecords: DailyRecord[];
}

export const TIME_CHALLENGE_OPTIONS = [
  { value: 60, label: '1 Minute' },
  { value: 180, label: '3 Minutes' },
  { value: 300, label: '5 Minutes' },
] as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/constants.ts
git commit -m "types: add practice modes, daily records, and heatmap types"
```

---

## Task 3: Create Utility Functions

**Files:**
- Create: `src/utils/heatmapColors.ts`
- Create: `src/utils/dateUtils.ts`

- [ ] **Step 1: Create heatmapColors.ts**

```typescript
export function getHeatmapColor(count: number, maxCount: number): string {
  if (maxCount === 0) return 'hsl(0, 0%, 95%)';

  const intensity = count / maxCount;
  // White -> Yellow -> Orange -> Red
  const hue = 60 - (intensity * 60); // 60 (yellow) to 0 (red)
  const saturation = intensity * 100;
  const lightness = 95 - (intensity * 45); // 95% to 50%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function getMaxMistakeCount(keyMistakes: Record<string, number>): number {
  const values = Object.values(keyMistakes);
  return values.length > 0 ? Math.max(...values) : 0;
}
```

- [ ] **Step 2: Create dateUtils.ts**

```typescript
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDateForChart(dateStr: string): string {
  const [_, month, day] = dateStr.split('-');
  return `${month}-${day}`;
}

export function getLastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/
git commit -m "utils: add heatmap color and date formatting utilities"
```

---

## Task 4: Create Mode Selector Component

**Files:**
- Create: `src/components/ModeSelector.tsx`

- [ ] **Step 1: Create the component**

```typescript
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PracticeMode } from '../constants';

interface ModeSelectorProps {
  currentMode: PracticeMode;
  onModeChange: (mode: PracticeMode) => void;
}

const MODES: { value: PracticeMode; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'time-challenge', label: 'Time Challenge' },
  { value: 'custom', label: 'Custom Text' },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600">
        Mode: {MODES.find(m => m.value === currentMode)?.label} <ChevronDown size={14} />
      </button>
      <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-1 z-50">
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ModeSelector.tsx
git commit -m "feat: add ModeSelector component for practice mode switching"
```

---

## Task 5: Create Time Challenge Modal

**Files:**
- Create: `src/components/modals/TimeChallengeModal.tsx`

- [ ] **Step 1: Create the modal component**

```typescript
import React from 'react';
import { motion } from 'motion/react';
import { X, Clock } from 'lucide-react';
import { TIME_CHALLENGE_OPTIONS } from '../../constants';

interface TimeChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (duration: 60 | 180 | 300) => void;
}

export const TimeChallengeModal: React.FC<TimeChallengeModalProps> = ({
  isOpen,
  onClose,
  onStart,
}) => {
  const [selectedDuration, setSelectedDuration] = React.useState<60 | 180 | 300>(60);

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
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Clock size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Time Challenge</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-4">Type as much as you can before time runs out!</p>

        <div className="space-y-2 mb-6">
          {TIME_CHALLENGE_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedDuration(option.value)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedDuration === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="font-bold text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-500">
                {option.value === 60 ? 'Quick sprint' : option.value === 180 ? 'Standard challenge' : 'Endurance test'}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onStart(selectedDuration)}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all"
          >
            Start Challenge
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/modals/TimeChallengeModal.tsx
git commit -m "feat: add TimeChallengeModal for selecting challenge duration"
```

---

## Task 6: Create Custom Text Modal

**Files:**
- Create: `src/components/modals/CustomTextModal.tsx`

- [ ] **Step 1: Create the modal component**

```typescript
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, FileText } from 'lucide-react';

interface CustomTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (text: string) => void;
}

const MAX_LENGTH = 5000;
const MIN_LENGTH = 10;

export const CustomTextModal: React.FC<CustomTextModalProps> = ({
  isOpen,
  onClose,
  onStart,
}) => {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const isValid = text.length >= MIN_LENGTH && text.length <= MAX_LENGTH;

  const handleStart = () => {
    if (isValid) {
      onStart(text.trim());
      setText('');
    }
  };

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
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Practice Your Own Text</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
            placeholder="Paste or type your text here..."
            className="w-full h-64 p-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none resize-none font-mono text-sm"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span className={text.length < MIN_LENGTH ? 'text-red-500' : 'text-gray-400'}>
              {text.length < MIN_LENGTH && 'Text must be at least 10 characters'}
            </span>
            <span className="text-gray-400">
              {text.length} / {MAX_LENGTH}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleStart}
            disabled={!isValid}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              isValid
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Start Practice
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/modals/CustomTextModal.tsx
git commit -m "feat: add CustomTextModal for user-provided practice text"
```

---

## Task 7: Create Progress Chart Component

**Files:**
- Create: `src/components/ProgressChart.tsx`

- [ ] **Step 1: Create the chart component**

```typescript
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DailyRecord } from '../constants';
import { formatDateForChart } from '../utils/dateUtils';

interface ProgressChartProps {
  data: DailyRecord[];
  days?: number;
  mini?: boolean;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  days = 30,
  mini = false,
}) => {
  // Fill in missing days with null values for the chart
  const chartData = React.useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days + 1);

    const filled: Array<{
      date: string;
      displayDate: string;
      wpm: number | null;
      accuracy: number | null;
    }> = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const record = data.find(r => r.date === dateStr);
      filled.push({
        date: dateStr,
        displayDate: formatDateForChart(dateStr),
        wpm: record ? record.avgWpm : null,
        accuracy: record ? record.avgAccuracy : null,
      });
    }

    return filled;
  }, [data, days]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={mini ? 100 : 300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="displayDate"
          tick={{ fontSize: 10 }}
          interval={mini ? 6 : 2}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="wpm"
          domain={[0, 150]}
          tick={{ fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <YAxis
          yAxisId="accuracy"
          orientation="right"
          domain={[0, 100]}
          tick={{ fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        {!mini && (
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value: number, name: string) => [
              name === 'wpm' ? `${value} WPM` : `${value}%`,
              name === 'wpm' ? 'Speed' : 'Accuracy',
            ]}
          />
        )}
        <Line
          yAxisId="wpm"
          type="monotone"
          dataKey="wpm"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
        <Line
          yAxisId="accuracy"
          type="monotone"
          dataKey="accuracy"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProgressChart.tsx
git commit -m "feat: add ProgressChart component for WPM/accuracy trends"
```

---

## Task 8: Create Heatmap Keyboard Component

**Files:**
- Create: `src/components/HeatmapKeyboard.tsx`

- [ ] **Step 1: Create the heatmap keyboard component**

```typescript
import React from 'react';
import { motion } from 'motion/react';
import { KEYBOARD_ROWS } from '../constants';
import { getHeatmapColor, getMaxMistakeCount } from '../utils/heatmapColors';

interface HeatmapKeyboardProps {
  keyMistakes: Record<string, number>;
  mini?: boolean;
}

export const HeatmapKeyboard: React.FC<HeatmapKeyboardProps> = ({
  keyMistakes,
  mini = false,
}) => {
  const maxCount = getMaxMistakeCount(keyMistakes);

  const getKeyWidth = (key: string) => {
    if (mini) {
      switch (key) {
        case 'Backspace': return 'w-8';
        case 'Tab': return 'w-6';
        case 'Caps': return 'w-8';
        case 'Enter': return 'w-10';
        case 'Shift': return 'w-12';
        case 'Space': return 'w-24';
        default: return 'w-5';
      }
    }
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

  const getKeyHeight = () => (mini ? 'h-6' : 'h-12');

  return (
    <div className={`flex flex-col gap-1 ${mini ? 'p-2' : 'p-6'} bg-[#E5E7EB] rounded-2xl border-[3px] border-[#5D4037] shadow-lg max-w-fit mx-auto`}>
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center">
          {row.map((key, keyIndex) => {
            const keyLower = key.toLowerCase();
            const count = keyMistakes[keyLower] || 0;
            const bgColor = getHeatmapColor(count, maxCount);

            return (
              <motion.div
                key={keyIndex}
                className={`
                  ${getKeyWidth(key)} ${getKeyHeight()}
                  flex items-center justify-center rounded-lg
                  ${mini ? 'text-[8px]' : 'text-[11px]'} font-black border-[2.5px] border-[#5D4037]
                  transition-colors duration-200
                `}
                style={{ backgroundColor: bgColor }}
                title={count > 0 ? `${key}: ${count} errors` : key}
              >
                {key === 'Space' ? '' : key}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeatmapKeyboard.tsx
git commit -m "feat: add HeatmapKeyboard component for visualizing typing errors"
```

---

## Task 9: Create Heatmap Modal

**Files:**
- Create: `src/components/modals/HeatmapModal.tsx`

- [ ] **Step 1: Create the heatmap modal**

```typescript
import React from 'react';
import { motion } from 'motion/react';
import { X, Keyboard, Trash2 } from 'lucide-react';
import { HeatmapKeyboard } from '../HeatmapKeyboard';

interface HeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyMistakes: Record<string, number>;
  onReset: () => void;
}

export const HeatmapModal: React.FC<HeatmapModalProps> = ({
  isOpen,
  onClose,
  keyMistakes,
  onReset,
}) => {
  if (!isOpen) return null;

  const hasData = Object.keys(keyMistakes).length > 0;

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
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
              <Keyboard size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Error Heatmap</h2>
              <p className="text-sm text-gray-500">Visualize which keys you mistype most often</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasData && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset your heatmap data? This cannot be undone.')) {
                    onReset();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
                <span className="font-medium">Reset</span>
              </button>
            )}
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
        </div>

        {hasData ? (
          <>
            <div className="flex justify-center mb-8">
              <HeatmapKeyboard keyMistakes={keyMistakes} />
            </div>

            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-500">Less errors</span>
              <div className="flex gap-1">
                {['hsl(0, 0%, 95%)', 'hsl(30, 50%, 80%)', 'hsl(15, 80%, 65%)', 'hsl(0, 100%, 50%)'].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-4 rounded border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-gray-500">More errors</span>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Keyboard size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No data yet. Complete some practice sessions to see your error patterns!</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/modals/HeatmapModal.tsx
git commit -m "feat: add HeatmapModal for fullscreen error visualization"
```

---

## Task 10: Create Progress Modal

**Files:**
- Create: `src/components/modals/ProgressModal.tsx`

- [ ] **Step 1: Create the progress modal**

```typescript
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, TrendingUp } from 'lucide-react';
import { ProgressChart } from '../ProgressChart';
import { DailyRecord } from '../../constants';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyRecords: DailyRecord[];
}

const DAYS_OPTIONS = [
  { value: 7, label: '7 Days' },
  { value: 30, label: '30 Days' },
  { value: 90, label: '90 Days' },
];

export const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  onClose,
  dailyRecords,
}) => {
  const [selectedDays, setSelectedDays] = useState(30);

  if (!isOpen) return null;

  const hasData = dailyRecords.length > 0;

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
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Progress Trend</h2>
              <p className="text-sm text-gray-500">Track your typing speed and accuracy over time</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {hasData ? (
          <>
            <div className="flex justify-center gap-2 mb-6">
              {DAYS_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDays(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDays === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="h-80">
              <ProgressChart data={dailyRecords} days={selectedDays} />
            </div>

            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-blue-500 rounded" />
                <span className="text-sm text-gray-600">WPM (Speed)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-green-500 rounded" />
                <span className="text-sm text-gray-600">Accuracy %</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No history yet. Your progress will appear here after a few sessions.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/modals/ProgressModal.tsx
git commit -m "feat: add ProgressModal for fullscreen progress chart"
```

---

## Task 11: Update Stats Component

**Files:**
- Modify: `src/components/Stats.tsx`

- [ ] **Step 1: Add imports and new props**

Add to imports:
```typescript
import { Keyboard, TrendingUp } from 'lucide-react';
import { HeatmapKeyboard } from './HeatmapKeyboard';
import { ProgressChart } from './ProgressChart';
import { DailyRecord } from '../constants';
```

Update interface:
```typescript
interface StatsProps {
  totalWpm: number;
  totalAccuracy: number;
  totalTime: number;
  sessionCount: number;
  keyMistakes?: Record<string, number>;
  dailyRecords?: DailyRecord[];
  onOpenHeatmap?: () => void;
  onOpenProgress?: () => void;
}
```

- [ ] **Step 2: Update component to accept new props and add new cards**

```typescript
export const Stats: React.FC<StatsProps> = ({
  totalWpm,
  totalAccuracy,
  totalTime,
  sessionCount,
  keyMistakes = {},
  dailyRecords = [],
  onOpenHeatmap,
  onOpenProgress,
}) => {
  const avgWpm = sessionCount > 0 ? Math.round(totalWpm / sessionCount) : 0;
  const avgAccuracy = sessionCount > 0 ? Math.round(totalAccuracy / sessionCount) : 0;
  const timeInMinutes = Math.round(totalTime / 60);

  const hasHeatmapData = Object.keys(keyMistakes).length > 0;
  const hasProgressData = dailyRecords.length > 0;

  return (
    <div className="w-full max-w-4xl">
      {/* Original 4 stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* ... existing 4 cards unchanged ... */}
      </div>

      {/* New analytics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Heatmap Card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onOpenHeatmap}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-orange-600"><Keyboard size={20} /></div>
            <span className="text-xs text-gray-400">Click to expand</span>
          </div>
          <div className="text-sm font-bold text-gray-800 mb-2">Error Heatmap</div>
          {hasHeatmapData ? (
            <div className="scale-75 origin-top-left -ml-4 -mt-2">
              <HeatmapKeyboard keyMistakes={keyMistakes} mini />
            </div>
          ) : (
            <p className="text-xs text-gray-400">Complete sessions to see error patterns</p>
          )}
        </motion.button>

        {/* Progress Card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onOpenProgress}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-blue-600"><TrendingUp size={20} /></div>
            <span className="text-xs text-gray-400">Click to expand</span>
          </div>
          <div className="text-sm font-bold text-gray-800 mb-2">Progress Trend</div>
          {hasProgressData ? (
            <div className="h-20">
              <ProgressChart data={dailyRecords} days={7} mini />
            </div>
          ) : (
            <p className="text-xs text-gray-400">Practice daily to see your progress</p>
          )}
        </motion.button>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Stats.tsx
git commit -m "feat: add heatmap and progress cards to Stats component"
```

---

## Task 12: Major Update - App.tsx

**Files:**
- Modify: `src/App.tsx`

This is a large task. We'll break it into sub-tasks.

### Task 12a: Add imports and new state

- [ ] **Step 1: Add new imports**

Add after existing imports:
```typescript
import { ModeSelector } from './components/ModeSelector';
import { TimeChallengeModal } from './components/modals/TimeChallengeModal';
import { CustomTextModal } from './components/modals/CustomTextModal';
import { HeatmapModal } from './components/modals/HeatmapModal';
import { ProgressModal } from './components/modals/ProgressModal';
import { PracticeMode, DailyRecord, ExtendedUserStats } from './constants';
import { getTodayString } from './utils/dateUtils';
```

- [ ] **Step 2: Add new state variables**

Add after existing state (around line 30):
```typescript
const [practiceMode, setPracticeMode] = useState<PracticeMode>('normal');
const [timeChallengeDuration, setTimeChallengeDuration] = useState<60 | 180 | 300>(60);
const [customText, setCustomText] = useState<string>('');
const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
const [showTimeChallengeModal, setShowTimeChallengeModal] = useState(false);
const [showCustomTextModal, setShowCustomTextModal] = useState(false);
const [showHeatmapModal, setShowHeatmapModal] = useState(false);
const [showProgressModal, setShowProgressModal] = useState(false);
const [mistakeKeys, setMistakeKeys] = useState<Record<string, number>>({});
```

- [ ] **Step 3: Commit partial changes**

```bash
git add src/App.tsx
git commit -m "feat: add new imports and state for practice modes and analytics"
```

### Task 12b: Add data migration and tracking

- [ ] **Step 4: Update user data loading with migration**

Update the useEffect that loads users (around line 44):
```typescript
useEffect(() => {
  const savedUsers = localStorage.getItem('typing_users');
  if (savedUsers) {
    const parsed = JSON.parse(savedUsers);
    // Migrate old data to include new fields
    const migrated = parsed.map((u: any) => ({
      ...u,
      keyMistakes: u.keyMistakes || {},
      dailyRecords: u.dailyRecords || [],
    }));
    setUsers(migrated);
    const lastUserId = localStorage.getItem('last_user_id');
    if (lastUserId) {
      const lastUser = migrated.find((u: any) => u.id === lastUserId);
      if (lastUser) {
        setCurrentUser(lastUser);
        setMistakeKeys(lastUser.keyMistakes || {});
      }
    }
  }
}, []);
```

- [ ] **Step 5: Add timer effect for time challenge**

Add new useEffect after existing effects:
```typescript
// Time challenge countdown
useEffect(() => {
  if (practiceMode === 'time-challenge' && startTime && !isFinished) {
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = timeChallengeDuration - elapsed;
      if (remaining <= 0) {
        setIsFinished(true);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);
    return () => clearInterval(timer);
  }
}, [practiceMode, startTime, isFinished, timeChallengeDuration]);
```

- [ ] **Step 6: Update saveSession to track mistakes and daily records**

Replace the existing saveSession function:
```typescript
const saveSession = () => {
  if (!currentUser || !startTime) return;
  const timeElapsed = (Date.now() - startTime) / 1000;

  // Update daily records
  const today = getTodayString();
  const existingRecord = currentUser.dailyRecords?.find((r: DailyRecord) => r.date === today);

  let updatedDailyRecords: DailyRecord[];
  if (existingRecord) {
    const totalSessions = existingRecord.sessionCount + 1;
    updatedDailyRecords = currentUser.dailyRecords.map((r: DailyRecord) =>
      r.date === today
        ? {
            ...r,
            avgWpm: Math.round((r.avgWpm * r.sessionCount + wpm) / totalSessions),
            avgAccuracy: Math.round((r.avgAccuracy * r.sessionCount + accuracy) / totalSessions),
            sessionCount: totalSessions,
          }
        : r
    );
  } else {
    updatedDailyRecords = [
      ...(currentUser.dailyRecords || []),
      { date: today, avgWpm: wpm, avgAccuracy: accuracy, sessionCount: 1 },
    ];
  }

  // Keep only last 90 days
  updatedDailyRecords = updatedDailyRecords.slice(-90);

  // Merge mistake keys
  const updatedKeyMistakes = { ...currentUser.keyMistakes };
  Object.entries(mistakeKeys).forEach(([key, count]) => {
    updatedKeyMistakes[key] = (updatedKeyMistakes[key] || 0) + count;
  });

  const updatedUsers = users.map(u => {
    if (u.id === currentUser.id) {
      return {
        ...u,
        totalWpm: u.totalWpm + wpm,
        totalAccuracy: u.totalAccuracy + accuracy,
        totalTime: u.totalTime + timeElapsed,
        sessionCount: u.sessionCount + 1,
        dailyRecords: updatedDailyRecords,
        keyMistakes: updatedKeyMistakes,
      };
    }
    return u;
  });

  setUsers(updatedUsers);
  const updatedUser = updatedUsers.find(u => u.id === currentUser.id);
  if (updatedUser) {
    setCurrentUser(updatedUser);
    setMistakeKeys(updatedUser.keyMistakes);
  }
};
```

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add data migration, timer logic, and enhanced session tracking"
```

### Task 12c: Update keyboard handler and reset function

- [ ] **Step 8: Update reset function to handle modes**

Replace the reset function:
```typescript
const reset = useCallback(() => {
  if (practiceMode === 'custom' && customText) {
    // Keep same custom text
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setMistakes(0);
    setMistakeKeys({});
    setTimeRemaining(null);
  } else if (practiceMode === 'time-challenge') {
    // Pick new random text for next challenge
    const nextIndex = Math.floor(Math.random() * filteredTexts.length);
    setCurrentTextIndex(nextIndex);
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setMistakes(0);
    setMistakeKeys({});
    setTimeRemaining(timeChallengeDuration);
  } else {
    // Normal mode
    const nextIndex = Math.floor(Math.random() * filteredTexts.length);
    setCurrentTextIndex(nextIndex);
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setMistakes(0);
    setMistakeKeys({});
    setTimeRemaining(null);
  }
}, [filteredTexts, practiceMode, customText, timeChallengeDuration]);
```

- [ ] **Step 9: Update keydown handler to track mistakes**

Update the handleKeyDown function inside the useEffect to track mistakes:
```typescript
if (e.key.length === 1) {
  if (!startTime) setStartTime(Date.now());
  if (userInput.length < text.length) {
    const expectedChar = text[userInput.length];
    const isCorrect = e.key === expectedChar;
    playSound(isCorrect);

    if (!isCorrect) {
      setMistakes(prev => prev + 1);
      // Track mistake key
      const key = e.key.toLowerCase();
      setMistakeKeys(prev => ({
        ...prev,
        [key]: (prev[key] || 0) + 1,
      }));
    }

    const newInput = userInput + e.key;
    setUserInput(newInput);
    if (newInput.length === text.length) setIsFinished(true);
  }
}
```

- [ ] **Step 10: Commit**

```bash
git add src/App.tsx
git commit -m "feat: update reset and keydown handlers for mode support and mistake tracking"
```

### Task 12d: Update UI components in App.tsx

- [ ] **Step 11: Update header to include mode selector**

Find the header section and update it to include ModeSelector:
```typescript
<header className="border-b border-gray-200 bg-white py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-3">
      <div className="bg-blue-600 p-2 rounded-lg text-white">
        <KeyboardIcon size={20} />
      </div>
      <h1 className="text-lg font-bold tracking-tight text-gray-900 hidden sm:block">FingerGuide</h1>
    </div>

    <div className="h-6 w-px bg-gray-200 hidden sm:block" />

    {/* Mode Selector */}
    <ModeSelector
      currentMode={practiceMode}
      onModeChange={(mode) => {
        if (mode === 'time-challenge') {
          setShowTimeChallengeModal(true);
        } else if (mode === 'custom') {
          setShowCustomTextModal(true);
        } else {
          setPracticeMode('normal');
          setCustomText('');
          reset();
        }
      }}
    />

    <div className="h-6 w-px bg-gray-200" />

    {/* Category selector - hide in custom mode */}
    {practiceMode !== 'custom' && (
      <div className="relative group">
        {/* existing category dropdown */}
      </div>
    )}
    {practiceMode === 'custom' && (
      <span className="text-sm font-medium text-gray-600">Custom Text</span>
    )}
  </div>

  {/* Stats section */}
  <div className="flex items-center gap-6">
    {/* Add time remaining display for time challenge */}
    {practiceMode === 'time-challenge' && timeRemaining !== null && (
      <div className="flex flex-col items-center">
        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Time</span>
        <span className={`text-lg font-mono font-bold ${timeRemaining < 10 ? 'text-red-600' : 'text-gray-700'}`}>
          {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
        </span>
      </div>
    )}

    {/* existing stats */}
  </div>
</header>
```

- [ ] **Step 12: Update Stats component usage**

Find where Stats is rendered and update it:
```typescript
<AnimatePresence>
  {showStats && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="w-full overflow-hidden"
    >
      <Stats
        {...currentUser}
        keyMistakes={currentUser.keyMistakes || {}}
        dailyRecords={currentUser.dailyRecords || []}
        onOpenHeatmap={() => setShowHeatmapModal(true)}
        onOpenProgress={() => setShowProgressModal(true)}
      />
      <div className="h-12" />
    </motion.div>
  )}
</AnimatePresence>
```

- [ ] **Step 13: Add modals at the end of the component**

Add before the closing `</div>` of the main return:
```typescript
{/* Modals */}
<TimeChallengeModal
  isOpen={showTimeChallengeModal}
  onClose={() => setShowTimeChallengeModal(false)}
  onStart={(duration) => {
    setPracticeMode('time-challenge');
    setTimeChallengeDuration(duration);
    setTimeRemaining(duration);
    setShowTimeChallengeModal(false);
    reset();
  }}
/>

<CustomTextModal
  isOpen={showCustomTextModal}
  onClose={() => setShowCustomTextModal(false)}
  onStart={(text) => {
    setPracticeMode('custom');
    setCustomText(text);
    setShowCustomTextModal(false);
    reset();
  }}
/>

<HeatmapModal
  isOpen={showHeatmapModal}
  onClose={() => setShowHeatmapModal(false)}
  keyMistakes={currentUser?.keyMistakes || {}}
  onReset={() => {
    const updatedUsers = users.map(u =>
      u.id === currentUser?.id ? { ...u, keyMistakes: {} } : u
    );
    setUsers(updatedUsers);
    const updatedUser = updatedUsers.find(u => u.id === currentUser?.id);
    if (updatedUser) {
      setCurrentUser(updatedUser);
      setMistakeKeys({});
    }
  }}
/>

<ProgressModal
  isOpen={showProgressModal}
  onClose={() => setShowProgressModal(false)}
  dailyRecords={currentUser?.dailyRecords || []}
/>
```

- [ ] **Step 14: Update text source for custom mode**

Update the text variable assignment to handle custom text:
```typescript
const filteredTexts = PRACTICE_TEXTS.filter(t => t.category === selectedCategory);
const currentPractice = practiceMode === 'custom'
  ? { en: customText, zh: 'Custom text practice', category: 'Custom' as const }
  : filteredTexts[currentTextIndex] || filteredTexts[0];
const text = currentPractice.en;
const translation = currentPractice.zh;
```

- [ ] **Step 15: Commit**

```bash
git add src/App.tsx
git commit -m "feat: complete App.tsx updates for modes, modals, and UI integration"
```

---

## Task 13: Final Integration and Testing

- [ ] **Step 1: Run type check**

```bash
npm run lint
```

Expected: No TypeScript errors

- [ ] **Step 2: Test development build**

```bash
npm run dev
```

Verify:
- Mode selector appears in header
- Time challenge modal opens
- Custom text modal opens
- Stats panel shows new cards
- Heatmap and progress modals open

- [ ] **Step 3: Build for production**

```bash
npm run build
```

Expected: Build succeeds without errors

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Phase 1 - time challenge, custom text, heatmap, and progress chart"
```

- [ ] **Step 5: Push to GitHub**

```bash
git push origin main
```

---

## Summary

This implementation plan adds:

1. **Time Challenge Mode** - 1/3/5 minute timed typing challenges
2. **Custom Text Mode** - Users can practice with their own text
3. **Typing Heatmap** - Visual representation of typing errors by key
4. **Progress Chart** - Line chart showing WPM and accuracy trends over time

All features are integrated into the existing React application with localStorage persistence.
