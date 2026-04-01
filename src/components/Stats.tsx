import React from 'react';
import { motion } from 'motion/react';
import { Zap, Target, Timer, BarChart3, Keyboard, TrendingUp } from 'lucide-react';
import { HeatmapKeyboard } from './HeatmapKeyboard';
import { ProgressChart } from './ProgressChart';
import { DailyRecord } from '../constants';

interface PracticeSession {
  wpm: number;
  accuracy: number;
  timestamp: number;
}

interface StatsProps {
  totalWpm: number;
  totalAccuracy: number;
  totalTime: number;
  sessionCount: number;
  recentSessions?: PracticeSession[];
  keyMistakes?: Record<string, number>;
  dailyRecords?: DailyRecord[];
  onOpenHeatmap?: () => void;
  onOpenProgress?: () => void;
}

export const Stats: React.FC<StatsProps> = ({ 
  totalWpm, 
  totalAccuracy, 
  totalTime, 
  sessionCount, 
  recentSessions,
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

  const formatDistanceToNow = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center"
        >
          <div className="text-blue-600 mb-2"><Zap size={20} /></div>
          <div className="text-2xl font-mono font-bold text-gray-800">{avgWpm}</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Avg WPM</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center"
        >
          <div className="text-green-600 mb-2"><Target size={20} /></div>
          <div className="text-2xl font-mono font-bold text-gray-800">{avgAccuracy}%</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Avg Accuracy</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center"
        >
          <div className="text-orange-600 mb-2"><Timer size={20} /></div>
          <div className="text-2xl font-mono font-bold text-gray-800">{timeInMinutes}m</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total Time</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center"
        >
          <div className="text-purple-600 mb-2"><BarChart3 size={20} /></div>
          <div className="text-2xl font-mono font-bold text-gray-800">{sessionCount}</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Sessions</div>
        </motion.div>
      </div>

      {/* Analytics Cards */}
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

      {recentSessions && recentSessions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100"
        >
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 px-2">Recent Sessions</h3>
          <div className="flex flex-col gap-3">
            {recentSessions.map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">WPM</span>
                    <span className="text-lg font-mono font-bold text-blue-600">{session.wpm}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Accuracy</span>
                    <span className="text-lg font-mono font-bold text-green-600">{session.accuracy}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-400">{formatDistanceToNow(session.timestamp)}</div>
                  <div className="text-[9px] text-gray-300">{new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
