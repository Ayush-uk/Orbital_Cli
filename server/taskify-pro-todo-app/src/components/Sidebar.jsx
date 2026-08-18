import React from 'react';
import { 
  Layers, Briefcase, User, BookOpen, Heart, 
  Calendar, AlertCircle, CheckCircle, Flame, Trash2, Filter
} from 'lucide-react';

const CATEGORY_ICONS = {
  All: Layers,
  Work: Briefcase,
  Personal: User,
  Learning: BookOpen,
  Health: Heart
};

export const Sidebar = ({
  activeCategory,
  setActiveCategory,
  activeFilter,
  setActiveFilter,
  taskStats,
  categories,
  onClearCompleted
}) => {
  const filters = [
    { id: 'all', label: 'All Tasks', icon: Layers, count: taskStats.total },
    { id: 'today', label: 'Today', icon: Calendar, count: taskStats.today },
    { id: 'overdue', label: 'Overdue', icon: AlertCircle, count: taskStats.overdue, color: 'text-rose-500' },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: taskStats.completed }
  ];

  return (
    <aside className="w-full lg:w-64 flex flex-col gap-6 shrink-0">
      {/* Main Filter Nav */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800/80 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2 flex items-center justify-between">
          <span>Overview</span>
          <Filter className="w-3.5 h-3.5" />
        </h3>
        <nav className="space-y-1">
          {filters.map((f) => {
            const Icon = f.icon;
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  if (activeCategory !== 'All') setActiveCategory('All');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/50 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${f.color || ''}`} />
                  <span>{f.label}</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Category List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800/80 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
          Categories
        </h3>
        <nav className="space-y-1">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.name] || Layers;
            const isActive = activeCategory === cat.name && activeFilter === 'all';
            const count = taskStats.byCategory[cat.name] || 0;

            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setActiveFilter('all');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/50 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-indigo-500" />
                  <span>{cat.name}</span>
                </div>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Streak & Quick Action Card */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-4 shadow-md border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Flame className="w-6 h-6 stroke-[2.5] animate-bounce" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Completion Rate
            </div>
            <div className="text-2xl font-extrabold">
              {taskStats.completionPercentage}%
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden border border-slate-700/50">
          <div
            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${taskStats.completionPercentage}%` }}
          />
        </div>

        {taskStats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Completed ({taskStats.completed})
          </button>
        )}
      </div>
    </aside>
  );
};