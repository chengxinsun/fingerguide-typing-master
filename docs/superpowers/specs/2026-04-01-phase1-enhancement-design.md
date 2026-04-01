# FingerGuide Typing Master - Phase 1 Enhancement Design

**Date:** 2026-04-01
**Phase:** 1 of 3
**Status:** Design Complete, Pending Implementation

---

## Overview

This document outlines the Phase 1 enhancements to the FingerGuide Typing Master application. Phase 1 focuses on adding new practice modes and basic data analytics features.

### Goals
- Provide users with more diverse practice options
- Give users insight into their typing performance and weaknesses
- Maintain the existing clean UI/UX while adding new functionality

### Non-Goals
- Backend/cloud storage (remain local-first)
- Multiplayer or online features
- Mobile app version

---

## Features

### 1. Practice Modes

#### 1.1 Time Challenge Mode
**Description:** Users type as much as they can within a fixed time limit.

**Specifications:**
- Time options: 1 minute, 3 minutes, 5 minutes
- Countdown timer displayed prominently
- When time ends: show final WPM, accuracy, and characters typed
- Text is randomly selected from the chosen category (same as normal mode)
- Spacebar to continue to next challenge

**UI Changes:**
- Add mode selector buttons in header: [Normal | Time Challenge | Custom Text]
- When "Time Challenge" selected: show time option dropdown (1/3/5 min)
- Display countdown timer in stats area (e.g., "⏱️ 2:34 remaining")
- End screen shows: "Time's Up!" with results summary

**Data to Track:**
```typescript
interface TimeChallengeSession {
  id: string;
  userId: string;
  duration: 60 | 180 | 300; // seconds
  wpm: number;
  accuracy: number;
  charsTyped: number;
  mistakes: number;
  timestamp: number;
}
```

#### 1.2 Custom Text Mode
**Description:** Users can paste their own text to practice typing.

**Specifications:**
- Modal dialog with multi-line text input
- Minimum 10 characters, maximum 5000 characters
- Support basic punctuation and spaces
- Text is saved to localStorage for the session
- Cancel button to return to normal mode

**UI Changes:**
- "Custom Text" button in mode selector
- Modal with:
  - Title: "Practice Your Own Text"
  - Textarea placeholder: "Paste or type your text here..."
  - Character counter: "0 / 5000"
  - "Start Practice" button (disabled if < 10 chars)
  - "Cancel" button
- During practice: show "Custom Text" label in header instead of category

**Data Handling:**
- Custom text is NOT persisted across app restarts
- Practice stats are saved normally to user history

---

### 2. Data Analytics

#### 2.1 Typing Heatmap
**Description:** Visual representation of which keys the user mistypes most frequently.

**Specifications:**
- Aggregate mistake data from all practice sessions
- Color scale: white (no errors) → yellow → orange → red (most errors)
- Show percentage or count on hover
- Reset button to clear heatmap data (with confirmation)
- Mini heatmap in stats panel, expandable to fullscreen

**Data Structure:**
```typescript
// Added to UserStats
keyMistakes: Record<string, number> // key: 'a', 'shift', etc.

// Per-session tracking
mistakeKeys: Record<string, number> // tracked per session, merged into keyMistakes
```

**Color Calculation:**
```typescript
// Normalize error count to 0-1 range
const maxErrors = Math.max(...Object.values(keyMistakes));
const intensity = maxErrors > 0 ? count / maxErrors : 0;
// Map to color: hsl(0, intensity * 100%, 90% - intensity * 40%)
```

**UI Components:**
- `HeatmapKeyboard` - extends existing Keyboard component
- Stats panel card: "Error Heatmap" with mini preview
- Fullscreen modal on click with "Reset Data" button

#### 2.2 Progress Chart
**Description:** Line chart showing WPM and accuracy trends over time.

**Specifications:**
- Show last 30 days of data
- Two lines: WPM (blue) and Accuracy % (green, secondary axis)
- X-axis: dates (MM-DD format)
- Y-axis: WPM 0-150, Accuracy 0-100%
- Hover tooltip showing exact values
- If no data for a day, show dotted line or skip

**Data Structure:**
```typescript
// Added to UserStats
dailyRecords: Array<{
  date: string; // "2026-04-01"
  avgWpm: number;
  avgAccuracy: number;
  sessionCount: number;
}>

// Auto-cleanup: keep only last 90 days
```

**Daily Aggregation Logic:**
```typescript
// At end of each session
const today = new Date().toISOString().split('T')[0];
const existing = dailyRecords.find(r => r.date === today);
if (existing) {
  // Weighted average based on session count
  const totalSessions = existing.sessionCount + 1;
  existing.avgWpm = Math.round(
    (existing.avgWpm * existing.sessionCount + currentWpm) / totalSessions
  );
  existing.avgAccuracy = Math.round(
    (existing.avgAccuracy * existing.sessionCount + currentAccuracy) / totalSessions
  );
  existing.sessionCount = totalSessions;
} else {
  dailyRecords.push({ date: today, avgWpm: currentWpm, avgAccuracy: currentAccuracy, sessionCount: 1 });
}
```

**UI Components:**
- Use `recharts` library (LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis)
- Stats panel card: "Progress Trend" with mini chart
- Fullscreen modal on click with 30-day view

---

## UI/UX Specifications

### Header Changes
```
Current:  [Logo] [Category Dropdown] -------- [Stats] [User]
New:      [Logo] [Mode: Normal ▼] [Category ▼] -------- [Stats] [User]
```

Mode dropdown options:
- Normal Mode (current behavior)
- Time Challenge → shows time selector (1/3/5 min)
- Custom Text → opens input modal

### Stats Panel Expansion
Current stats panel shows 4 cards: Avg WPM, Avg Accuracy, Total Time, Sessions

Add 2 new cards below (2x2 grid):
- Error Heatmap (mini keyboard with color overlay)
- Progress Trend (mini line chart, last 7 days)

Both cards are clickable to open fullscreen detailed view.

### New Modals

1. **TimeChallengeModal**
   - Simple dropdown for time selection
   - "Start Challenge" button
   - Cancel option

2. **CustomTextModal**
   - Large textarea (400px height)
   - Character counter
   - Validation: minimum 10 chars
   - Start/Cancel buttons

3. **HeatmapModal** (fullscreen)
   - Full-size heatmap keyboard
   - Legend explaining colors
   - "Reset Heatmap Data" button with confirm dialog
   - Close button

4. **ProgressModal** (fullscreen)
   - Full-width line chart
   - Toggle WPM/Accuracy visibility
   - Date range selector (7/30/90 days)
   - Close button

---

## Technical Specifications

### Dependencies to Add
```json
{
  "dependencies": {
    "recharts": "^2.15.0"
  }
}
```

### State Management Updates

**New State in App.tsx:**
```typescript
const [practiceMode, setPracticeMode] = useState<'normal' | 'time-challenge' | 'custom'>('normal');
const [timeChallengeDuration, setTimeChallengeDuration] = useState<60 | 180 | 300>(60);
const [customText, setCustomText] = useState<string>('');
const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
```

**Timer Logic for Time Challenge:**
```typescript
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

### Data Persistence Updates

**localStorage Keys:**
- `typing_users` - existing, extended with new fields
- `typing_sessions` - NEW: array of all practice sessions (for history)

**Migration Strategy:**
When loading existing user data without new fields, initialize with defaults:
```typescript
const migrateUserData = (user: LocalUser): LocalUser => ({
  ...user,
  keyMistakes: user.keyMistakes || {},
  dailyRecords: user.dailyRecords || []
});
```

### Component Architecture

```
src/
├── components/
│   ├── Keyboard.tsx (update to support heatmap mode)
│   ├── Stats.tsx (update to include new cards)
│   ├── ProgressChart.tsx (NEW - line chart using recharts)
│   ├── HeatmapKeyboard.tsx (NEW - keyboard with heatmap overlay)
│   ├── modals/
│   │   ├── TimeChallengeModal.tsx (NEW)
│   │   ├── CustomTextModal.tsx (NEW)
│   │   ├── HeatmapModal.tsx (NEW)
│   │   └── ProgressModal.tsx (NEW)
│   └── ModeSelector.tsx (NEW - mode dropdown component)
├── hooks/
│   └── useTypingStats.ts (NEW - consolidate stats logic)
├── utils/
│   ├── heatmapColors.ts (NEW - color calculation utilities)
│   └── dateUtils.ts (NEW - date formatting for charts)
└── constants.ts (add mode configurations)
```

---

## Performance Considerations

1. **Chart Rendering:** Use `ResponsiveContainer` from recharts to handle window resizing efficiently
2. **Data Aggregation:** Calculate daily averages at session end, not during render
3. **Heatmap Updates:** Batch key mistake updates, update state once per session (not per keystroke)
4. **Storage:** Limit `dailyRecords` to 90 days; auto-cleanup on app load

---

## Error Handling

1. **Custom Text Validation:**
   - Too short (< 10 chars): disable start button, show "Text must be at least 10 characters"
   - Too long (> 5000 chars): truncate with warning message

2. **Empty Data States:**
   - Heatmap: "No data yet. Complete some practice sessions to see your error patterns!"
   - Progress Chart: "No history yet. Your progress will appear here after a few sessions."

3. **Timer Edge Cases:**
   - User switches tabs: timer continues (document.visibilityState check optional)
   - Browser refresh: session lost (acceptable for time challenge)

---

## Testing Checklist

- [ ] Time challenge countdown displays correctly
- [ ] Time challenge ends automatically at 0
- [ ] Custom text modal validates length correctly
- [ ] Custom text appears correctly in practice area
- [ ] Heatmap colors correspond to error frequency
- [ ] Heatmap reset clears data
- [ ] Progress chart shows correct date range
- [ ] Daily aggregation calculates averages correctly
- [ ] Mode switching preserves user progress
- [ ] All new features work with multiple user accounts

---

## Future Phases Preview

**Phase 2:** Gamification
- Achievement badge system
- Experience points and leveling
- Error correction practice mode (smart weak point detection)

**Phase 3:** Advanced Analytics
- Per-finger speed statistics
- Error word tracking
- Progress milestones and goals
- Word mode (practice common words only)

---

## Open Questions

None. Design is ready for implementation.

---

**Next Step:** Create implementation plan using `superpowers:writing-plans` skill.
