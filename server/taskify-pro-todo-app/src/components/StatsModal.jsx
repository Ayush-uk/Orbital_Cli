import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, ListTodo, AlertCircle, TrendingUp, Award } from 'lucide-react';

export const StatsModal = ({ isOpen, onClose, taskStats }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-slate-800 dark:text-slate-100 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Productivity Insights</h3>
              <p className="text-xs text-slate-400 font-medium">Your task stats overview</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
              <ListTodo className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total</span>
            </div>
            <div className="text-2xl font-extrabold">{taskStats.total}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Completed</span>
            </div>
            <div className="text-2xl font-extrabold">{taskStats.completed}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pending</span>
            </div>
            <div className="text-2xl font-extrabold">{taskStats.total - taskStats.completed}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-rose-500 mb-1">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Overdue</span>
            </div>
            <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{taskStats.overdue}</div>
          </div>
        </div>

        {/* Completion Rate Progress */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-200 dark:border-indigo-800/40">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
              Completion Rate
            </span>
            <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
              {taskStats.completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden border border-indigo-200/50 dark:border-indigo-800/30">
            <div
              className="bg-gradient-to-r from-indigo-600 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${taskStats.completionPercentage}%` }}
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs transition-colors"
        >
          Close Insights
        </button>
      </motion.div>
    </div>
  );
};