import React from 'react';
import { motion } from 'motion/react';
import { Zap, Target, Timer, BarChart3 } from 'lucide-react';

interface StatsProps {
  totalWpm: number;
  totalAccuracy: number;
  totalTime: number;
  sessionCount: number;
}

export const Stats: React.FC<StatsProps> = ({ totalWpm, totalAccuracy, totalTime, sessionCount }) => {
  const avgWpm = sessionCount > 0 ? Math.round(totalWpm / sessionCount) : 0;
  const avgAccuracy = sessionCount > 0 ? Math.round(totalAccuracy / sessionCount) : 0;
  const timeInMinutes = Math.round(totalTime / 60);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
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
  );
};
