export const enTranslations = {
  app: { name: 'FingerGuide', tagline: 'Typing Practice Master', subtitle: 'Master your typing skills with real-time finger guidance and local progress tracking' },
  nav: { practice: 'Practice', stats: 'Statistics', achievements: 'Achievements', settings: 'Settings' },
  practice: { wpm: 'Speed', accuracy: 'Accuracy', time: 'Time', completed: 'Practice Completed!', continuePrompt: 'Press space or click button to continue', totalTime: 'Total Time', sessions: 'Sessions', speed: 'Speed' },
  fingers: { left: 'Left', right: 'Right', pinky: 'Pinky', ring: 'Ring', middle: 'Middle', index: 'Index', thumb: 'Thumb' },
  completion: { title: 'Practice Complete!', saved: 'Your progress has been saved.', continue: 'Press space or click to continue', continueButton: 'Continue' },
  mode: { normal: 'Normal Mode', timeChallenge: 'Time Challenge', custom: 'Custom Text', selectDuration: 'Select Duration', start: 'Start', cancel: 'Cancel', customTitle: 'Practice Your Own Text', customPlaceholder: 'Paste or type your text here...', customMinLength: 'Text must be at least 10 characters', customStart: 'Start Practice' },
  user: { createAccount: 'Create Account', selectAccount: 'Select Account', localAccount: 'Local Account', switchAccount: 'Switch Account', enterName: 'Enter your name', createNewAccount: 'Create New Account' },
  account: { localAccount: 'Local Account' },
  footer: { title: 'FingerGuide Typing Master', focusOnAccuracy: 'Focus on Accuracy', buildMuscleMemory: 'Build Muscle Memory', dailyPractice: 'Daily Practice' },
  stats: { avgWpm: 'Average Speed', avgAccuracy: 'Average Accuracy', accuracy: 'Accuracy', recentSessions: 'Recent Sessions', errorHeatmap: 'Error Heatmap', progressTrend: 'Progress Trend', clickToExpand: 'Click to expand', noHeatmapData: 'Complete practice to view error patterns', noProgressData: 'Practice daily to view progress', justNow: 'Just now', ago: 'ago', charsTyped: 'chars typed', currentStreak: 'Day Streak', bestStreak: 'Best Streak' },
  heatmap: { title: 'Error Heatmap', subtitle: 'Visualize which keys you mistype most often', reset: 'Reset', resetConfirm: 'Are you sure you want to reset your heatmap data? This cannot be undone.', lessErrors: 'Less errors', moreErrors: 'More errors', noData: 'No data yet. Complete some practice sessions to see your error patterns!' },
  progress: { title: 'Progress Trend', subtitle: 'Track your typing speed and accuracy over time', days7: '7 Days', days30: '30 Days', days90: '90 Days', wpmLegend: 'WPM (Speed)', accuracyLegend: 'Accuracy %', noData: 'No history yet. Your progress will appear here after a few sessions.' },
  settings: { title: 'Settings', language: 'Language', theme: 'Theme', pet: 'Pet', selectPet: 'Select Pet', selectLanguage: 'Select Language', chinese: '中文', english: 'English' },
  'theme.forest': 'Forest', 'theme.meadow': 'Meadow', 'theme.desert': 'Desert', 'theme.savanna': 'Savanna', 'theme.sky': 'Sky', 'theme.volcano': 'Volcano',
  achievements: {
    title: 'Achievements', unlocked: 'Unlocked', locked: 'Locked', reward: 'Reward', xp: 'XP', progress: 'Progress', congrats: 'Congratulations!', autoDismiss: 'Auto-closing in a few seconds...',
    all: 'All', milestone: 'Milestones', streak: 'Streaks', accuracy: 'Accuracy', overallProgress: 'Overall Progress', noAchievements: 'No achievements found',
    first_try: { name: 'First Try', description: 'Complete your first practice session' },
    centurion: { name: 'Centurion', description: 'Type 100 characters in total' },
    thousand_master: { name: 'Thousand Master', description: 'Type 1,000 characters in total' },
    ten_king: { name: 'Ten Thousand King', description: 'Type 10,000 characters in total' },
    speed_star: { name: 'Speed Star', description: 'Reach 50 WPM for the first time' },
    speed_master: { name: 'Speed Master', description: 'Reach 80 WPM for the first time' },
    perfect_accuracy: { name: 'Perfect Accuracy', description: 'Achieve 100% accuracy in a single session' },
    persistent: { name: 'Persistent', description: 'Practice for a total of 30 minutes' },
    streak_3: { name: '3-Day Streak', description: 'Practice for 3 consecutive days' },
    streak_7: { name: '7-Day Master', description: 'Practice for 7 consecutive days' },
    streak_30: { name: '30-Day Champion', description: 'Practice for 30 consecutive days' },
    accuracy_streak_5: { name: 'Accuracy Master', description: 'Achieve >95% accuracy for 5 consecutive sessions' }
  },
  level: { title: 'Level', current: 'Current Level', nextLevel: 'Next Level', level_1: 'Typing Snail', level_6: 'Typing Rabbit', level_11: 'Typing Fox', level_16: 'Typing Cheetah', level_21: 'Typing Eagle', level_26: 'Typing Dragon' },
  pet: { title: 'Pet', growth: 'Growth', stage_baby: 'Baby', stage_teen: 'Teen', stage_adult: 'Adult', unlocked_at: 'Unlocked at Level', snail: { name: 'Slowy the Snail', description: 'Steady and reliable companion for beginners' }, rabbit: { name: 'Hoppy the Rabbit', description: 'Agile and fast speed-type companion' }, fox: { name: 'Witty the Fox', description: 'Clever and skillful technique companion' }, cheetah: { name: 'Speedy the Cheetah', description: 'Lightning-fast companion for experts' }, eagle: { name: 'Soar the Eagle', description: 'Majestic master-level companion' }, dragon: { name: 'Blaze the Dragon', description: 'Supreme king-level companion' } }
};

export type Translations = typeof enTranslations;
