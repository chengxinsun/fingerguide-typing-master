import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard } from './components/Keyboard';
import { Stats } from './components/Stats';
import { KEY_MAP, PRACTICE_TEXTS, Finger, Category, PracticeItem } from './constants';
import { Keyboard as KeyboardIcon, RefreshCw, Zap, Target, Timer, LogIn, LogOut, User as UserIcon, ChevronDown, BarChart3, UserPlus, Users } from 'lucide-react';
import { ModeSelector } from './components/ModeSelector';
import { TimeChallengeModal } from './components/modals/TimeChallengeModal';
import { CustomTextModal } from './components/modals/CustomTextModal';
import { HeatmapModal } from './components/modals/HeatmapModal';
import { ProgressModal } from './components/modals/ProgressModal';
import { PracticeMode, DailyRecord } from './constants';
import { getTodayString } from './utils/dateUtils';

interface PracticeSession {
  wpm: number;
  accuracy: number;
  timestamp: number;
}

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
}

export default function App() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [currentUser, setCurrentUser] = useState<LocalUser | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState<Category>('Basic');
  const [currentTextIndex, setCurrentTextIndex] = useState(() => {
    const initialFiltered = PRACTICE_TEXTS.filter(t => t.category === 'Basic');
    return Math.floor(Math.random() * initialFiltered.length);
  });
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('normal');
  const [timeChallengeDuration, setTimeChallengeDuration] = useState<60 | 180 | 300>(60);
  const [customText, setCustomText] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showTimeChallengeModal, setShowTimeChallengeModal] = useState(false);
  const [showCustomTextModal, setShowCustomTextModal] = useState(false);
  const [showHeatmapModal, setShowHeatmapModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [mistakeKeys, setMistakeKeys] = useState<Record<string, number>>({});
  const [timeChallengeTotalChars, setTimeChallengeTotalChars] = useState(0);
  const [timeChallengeStartTime, setTimeChallengeStartTime] = useState<number | null>(null);
  const [cumulativeWpm, setCumulativeWpm] = useState(0);
  const timeChallengeTotalCharsRef = useRef(0);
  const userInputRef = useRef("");

  // Keep refs in sync with state
  useEffect(() => {
    timeChallengeTotalCharsRef.current = timeChallengeTotalChars;
  }, [timeChallengeTotalChars]);

  useEffect(() => {
    userInputRef.current = userInput;
  }, [userInput]);

  const filteredTexts = PRACTICE_TEXTS.filter(t => t.category === selectedCategory);
  const currentPractice = practiceMode === 'custom' && customText
    ? { en: customText, zh: 'Custom text practice', category: 'Custom' as const }
    : filteredTexts[currentTextIndex] || filteredTexts[0];
  const text = currentPractice.en;
  const translation = currentPractice.zh;

  const currentTargetChar = text[userInput.length] || null;
  const activeFinger: Finger | null = currentTargetChar ? KEY_MAP[currentTargetChar.toLowerCase()] || null : null;

  // Load users from localStorage
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
        const lastUser = migrated.find((u: LocalUser) => u.id === lastUserId);
        if (lastUser) {
          setCurrentUser(lastUser);
          setMistakeKeys(lastUser.keyMistakes || {});
        }
      }
    }
  }, []);

  // Save users to localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('typing_users', JSON.stringify(users));
    }
  }, [users]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    
    const newUser: LocalUser = {
      id: Date.now().toString(),
      name: newUserName.trim(),
      totalWpm: 0,
      totalAccuracy: 0,
      totalTime: 0,
      sessionCount: 0
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    localStorage.setItem('last_user_id', newUser.id);
    setNewUserName("");
    setIsCreatingUser(false);
  };

  const handleSelectUser = (user: LocalUser) => {
    setCurrentUser(user);
    localStorage.setItem('last_user_id', user.id);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('last_user_id');
  };

  const reset = useCallback(() => {
    if (practiceMode === 'custom' && customText) {
      setUserInput('');
      setStartTime(null);
      setWpm(0);
      setAccuracy(100);
      setIsFinished(false);
      setMistakes(0);
      setMistakeKeys({});
      setTimeRemaining(null);
    } else if (practiceMode === 'time-challenge') {
      // In time challenge mode, only switch to next text without resetting timer
      const nextIndex = Math.floor(Math.random() * filteredTexts.length);
      setCurrentTextIndex(nextIndex);
      setUserInput('');
      setStartTime(Date.now()); // Reset start time for accuracy calculation of new text
      setWpm(0); // Reset current text WPM, cumulative is tracked separately
      setAccuracy(100);
      setIsFinished(false);
      setMistakes(0);
      setMistakeKeys({});
      // Note: timeRemaining is NOT reset here - timer continues running
    } else {
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

  const saveSession = () => {
    if (!currentUser || !startTime) return;
    const timeElapsed = (Date.now() - startTime) / 1000;

    // In time challenge mode, use cumulative WPM for the session record
    const sessionWpm = practiceMode === 'time-challenge' ? cumulativeWpm || wpm : wpm;

    const today = getTodayString();
    const existingRecord = currentUser.dailyRecords?.find((r: DailyRecord) => r.date === today);

    let updatedDailyRecords: DailyRecord[] = currentUser.dailyRecords || [];
    if (existingRecord) {
      const totalSessions = existingRecord.sessionCount + 1;
      updatedDailyRecords = updatedDailyRecords.map((r: DailyRecord) =>
        r.date === today
          ? {
              ...r,
              avgWpm: Math.round((r.avgWpm * r.sessionCount + sessionWpm) / totalSessions),
              avgAccuracy: Math.round((r.avgAccuracy * r.sessionCount + accuracy) / totalSessions),
              sessionCount: totalSessions,
            }
          : r
      );
    } else {
      updatedDailyRecords = [
        ...updatedDailyRecords,
        { date: today, avgWpm: sessionWpm, avgAccuracy: accuracy, sessionCount: 1 },
      ];
    }

    updatedDailyRecords = updatedDailyRecords.slice(-90);

    const updatedKeyMistakes = { ...(currentUser.keyMistakes || {}) };
    Object.entries(mistakeKeys).forEach(([key, count]) => {
      updatedKeyMistakes[key] = (updatedKeyMistakes[key] || 0) + count;
    });

    const newSession: PracticeSession = {
      wpm: sessionWpm,
      accuracy,
      timestamp: Date.now()
    };

    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        const recent = u.recentSessions || [];
        return {
          ...u,
          totalWpm: u.totalWpm + sessionWpm,
          totalAccuracy: u.totalAccuracy + accuracy,
          totalTime: u.totalTime + timeElapsed,
          sessionCount: u.sessionCount + 1,
          recentSessions: [newSession, ...recent].slice(0, 3),
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
      setMistakeKeys({});
    }
  };

  useEffect(() => {
    if (isFinished) {
      saveSession();
    }
  }, [isFinished]);

  const getAudioContext = useCallback(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    return audioContextRef.current;
  }, []);

  const playSound = useCallback(async (isCorrect: boolean) => {
    try {
      const audioCtx = getAudioContext();
      if (!audioCtx) return;

      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (isCorrect) {
        // High-pitched short click for correct key
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
      } else {
        // Low-pitched buzz for mistake
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      }
    } catch (e) {
      // Audio context might be blocked by browser policy until user interaction
      console.warn("Audio error:", e);
    }
  }, [getAudioContext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentUser) return;

      if (isFinished) {
        if (e.key === ' ') {
          e.preventDefault();
          if (practiceMode === 'time-challenge') {
            // In time challenge mode, space starts a completely new challenge
            const nextIndex = Math.floor(Math.random() * filteredTexts.length);
            setCurrentTextIndex(nextIndex);
            setUserInput('');
            setStartTime(Date.now());
            setWpm(0);
            setAccuracy(100);
            setIsFinished(false);
            setMistakes(0);
            setMistakeKeys({});
            setTimeRemaining(timeChallengeDuration);
            setTimeChallengeTotalChars(0); // Reset total chars counter
            setTimeChallengeStartTime(Date.now()); // Reset challenge start time
            setCumulativeWpm(0);
          } else {
            reset();
          }
        }
        return;
      }

      setPressedKey(e.key);

      if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
        return;
      }

      if (e.key === ' ') e.preventDefault();

      if (e.key.length === 1) {
        if (!startTime) setStartTime(Date.now());
        if (userInput.length < text.length) {
          const expectedChar = text[userInput.length];
          const isCorrect = e.key === expectedChar;
          playSound(isCorrect);
          
          if (!isCorrect) {
            setMistakes(prev => prev + 1);
            const key = e.key.toLowerCase();
            setMistakeKeys(prev => ({
              ...prev,
              [key]: (prev[key] || 0) + 1,
            }));
          }

          const newInput = userInput + e.key;
          setUserInput(newInput);
          if (newInput.length === text.length) {
            if (practiceMode === 'time-challenge') {
              // In time challenge, immediately load next text without showing completion screen
              const nextIndex = Math.floor(Math.random() * filteredTexts.length);
              setCurrentTextIndex(nextIndex);
              setUserInput('');
              setStartTime(Date.now()); // Reset for accuracy tracking of new text
              setWpm(0);
              setAccuracy(100);
              setMistakes(0);
              // Accumulate total characters typed
              setTimeChallengeTotalChars(prev => prev + newInput.length);
              // Note: Don't reset timer or timeChallengeStartTime here - they continue
            } else {
              setIsFinished(true);
            }
          }
        }
      }
    };

    const handleKeyUp = () => setPressedKey(null);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [userInput, text, startTime, isFinished, currentUser, playSound]);

  useEffect(() => {
    if (startTime && !isFinished) {
      const interval = setInterval(() => {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60;
        const wordsTyped = userInput.length / 5;
        setWpm(Math.round(wordsTyped / timeElapsed) || 0);

        const correctChars = userInput.split('').filter((char, i) => char === text[i]).length;
        const totalTyped = userInput.length;
        setAccuracy(totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [startTime, isFinished, userInput, text]);

  // Cumulative WPM calculation for time challenge mode
  useEffect(() => {
    if (practiceMode === 'time-challenge' && timeChallengeStartTime && !isFinished) {
      const interval = setInterval(() => {
        const totalElapsedMinutes = (Date.now() - timeChallengeStartTime) / 1000 / 60;
        // Use refs to get latest values
        const totalCharsTyped = timeChallengeTotalCharsRef.current + userInputRef.current.length;
        const newCumulativeWpm = totalElapsedMinutes > 0
          ? Math.round((totalCharsTyped / 5) / totalElapsedMinutes) || 0
          : 0;
        setCumulativeWpm(newCumulativeWpm);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [practiceMode, timeChallengeStartTime, isFinished]);

  // Time challenge countdown
  useEffect(() => {
    if (practiceMode === 'time-challenge' && timeChallengeStartTime && !isFinished) {
      const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - timeChallengeStartTime) / 1000);
        const remaining = timeChallengeDuration - elapsed;
        if (remaining <= 0) {
          // Calculate final WPM based on total characters typed during the challenge
          // Use refs to get latest values
          const totalChars = timeChallengeTotalCharsRef.current + userInputRef.current.length;
          const totalMinutes = timeChallengeDuration / 60;
          const finalWpm = Math.round((totalChars / 5) / totalMinutes) || 0;
          setCumulativeWpm(finalWpm);
          setWpm(finalWpm);
          setIsFinished(true);
          setTimeRemaining(0);
        } else {
          setTimeRemaining(remaining);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [practiceMode, timeChallengeStartTime, isFinished, timeChallengeDuration]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100 flex flex-col items-center max-w-md w-full text-center"
        >
          <div className="bg-blue-600 p-4 rounded-2xl text-white mb-6 shadow-lg shadow-blue-200">
            <KeyboardIcon size={48} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">FingerGuide</h1>
          <p className="text-gray-500 mb-10">Master your typing skills with real-time finger guidance and local progress tracking.</p>
          
          {isCreatingUser ? (
            <form onSubmit={handleCreateUser} className="w-full flex flex-col gap-4">
              <input 
                autoFocus
                type="text" 
                placeholder="Enter your name" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-all"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  Create Account
                </button>
                <button 
                  type="button"
                  onClick={() => setIsCreatingUser(false)}
                  className="px-4 py-3 rounded-xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="w-full flex flex-col gap-4">
              {users.length > 0 && (
                <div className="flex flex-col gap-2 mb-4">
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold text-left px-2">Select Account</div>
                  <div className="max-h-48 overflow-y-auto flex flex-col gap-2 p-1">
                    {users.map(u => (
                      <button 
                        key={u.id}
                        onClick={() => handleSelectUser(u)}
                        className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-50 hover:border-blue-100 hover:bg-blue-50 transition-all text-left"
                      >
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><UserIcon size={16} /></div>
                        <span className="font-bold text-gray-700">{u.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button 
                onClick={() => setIsCreatingUser(true)}
                className="w-full bg-white border-2 border-gray-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
              >
                <UserPlus size={20} className="text-blue-600" /> Create New Account
              </button>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white py-4 px-8 flex justify-between items-center sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <KeyboardIcon size={20} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 hidden sm:block">FingerGuide</h1>
          </div>
          
          <div className="h-6 w-px bg-gray-200 hidden sm:block" />

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

          {practiceMode !== 'custom' && (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600">
                {selectedCategory} <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-1 z-[110]">
                {(['Basic', 'KET', 'PET', 'FCE', 'Quotes', 'Classics'] as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      const newFiltered = PRACTICE_TEXTS.filter(t => t.category === cat);
                      const randomIndex = Math.floor(Math.random() * newFiltered.length);
                      setSelectedCategory(cat);
                      setCurrentTextIndex(randomIndex);
                      setUserInput("");
                      setStartTime(null);
                      setIsFinished(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
            {practiceMode === 'time-challenge' && timeRemaining !== null && (
              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Time</span>
                <span className={`text-lg font-mono font-bold ${timeRemaining < 10 ? 'text-red-600' : 'text-gray-700'}`}>
                  {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
                </span>
              </div>
            )}
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Speed</span>
              <span className="text-lg font-mono font-bold text-gray-700">
                {practiceMode === 'time-challenge' ? cumulativeWpm : wpm} <span className="text-[10px] font-normal text-gray-400">WPM</span>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Accuracy</span>
              <span className="text-lg font-mono font-bold text-gray-700">{accuracy}%</span>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowStats(!showStats)}
              className={`p-2 rounded-lg transition-colors ${showStats ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <BarChart3 size={20} />
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-gray-700">{currentUser.name}</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-tighter">Local Account</span>
              </div>
              <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Switch Account">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6 flex flex-col items-center gap-12">
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

        {/* Typing Area */}
        <div className="w-full bg-white rounded-[40px] p-12 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-20" />
          
          <div className="text-2xl leading-relaxed font-mono tracking-wide relative z-10 min-h-[4em]">
            {text.split('').map((char, index) => {
              let color = "text-gray-200";
              let isCurrent = index === userInput.length;
              let isMistake = false;

              if (index < userInput.length) {
                if (userInput[index] === char) {
                  color = "text-green-600";
                } else {
                  color = "text-red-600";
                  isMistake = true;
                }
              }

              return (
                <span key={index} className={`relative ${color} ${isCurrent ? 'bg-blue-50 rounded-sm' : ''}`}>
                  {char}
                  {isMistake && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 opacity-50" />
                  )}
                  {isCurrent && (
                    <motion.span 
                      layoutId="cursor"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </span>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-50">
            <p className="text-gray-400 text-sm italic font-sans">
              {translation}
            </p>
          </div>

          <AnimatePresence>
            {isFinished && (
              <motion.div 
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-40 p-8 text-center"
              >
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="bg-green-100 text-green-600 p-6 rounded-full mb-8 shadow-inner"
                >
                  <Target size={64} strokeWidth={2.5} />
                </motion.div>
                
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-black text-gray-900 mb-3 tracking-tight"
                >
                  练习完成！
                </motion.h2>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-500 mb-4 font-medium"
                >
                  您的进步已成功保存至本地账户。
                </motion.p>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="text-sm text-blue-600 mb-12 font-bold tracking-wide"
                >
                  按空格键或点击按钮，继续当前分类的随机练习
                </motion.p>
                
                <div className="flex gap-20 mb-16">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-6xl font-mono font-black text-blue-600 tabular-nums">{practiceMode === 'time-challenge' ? cumulativeWpm : wpm}</div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mt-3 font-black">WPM</div>
                  </motion.div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <div className="text-6xl font-mono font-black text-blue-600 tabular-nums">{accuracy}%</div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mt-3 font-black">准确率</div>
                  </motion.div>
                </div>
                
                <motion.button 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center gap-4 text-lg"
                >
                  <RefreshCw size={24} /> 继续练习
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visual Guide Section */}
        <div className="w-full flex flex-col items-center gap-8">
          <div className="flex flex-col items-center relative">
            <div className="text-[9px] uppercase tracking-[0.4em] text-gray-300 font-black mb-4">Target Key Hint</div>
            <Keyboard activeKey={currentTargetChar} pressedKey={pressedKey} activeFinger={activeFinger} />
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto py-16 px-6 border-t border-gray-100 mt-12 flex flex-col items-center gap-8">
        <div className="flex items-center gap-3 opacity-30">
          <KeyboardIcon size={20} />
          <span className="text-sm font-bold tracking-widest uppercase">FingerGuide Typing Master</span>
        </div>
        <div className="flex gap-12 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          <span>Focus on Accuracy</span>
          <span>Build Muscle Memory</span>
          <span>Daily Practice</span>
        </div>
      </footer>

      {/* Modals */}
      <TimeChallengeModal
        isOpen={showTimeChallengeModal}
        onClose={() => setShowTimeChallengeModal(false)}
        onStart={(duration) => {
          setPracticeMode('time-challenge');
          setTimeChallengeDuration(duration);
          setTimeRemaining(duration);
          setTimeChallengeTotalChars(0); // Reset total chars counter when starting new challenge
          setTimeChallengeStartTime(Date.now()); // Set the challenge start time
          setCumulativeWpm(0);
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
    </div>
  );
}
