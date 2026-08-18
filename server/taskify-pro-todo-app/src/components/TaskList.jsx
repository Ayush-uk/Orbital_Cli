import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TaskItem } from './TaskItem';
import { CheckCircle2, Inbox, ArrowUpDown } from 'lucide-react';

export const TaskList = ({
  tasks,
  sortBy,
  setSortBy,
  onToggleComplete,
  onTogglePin,
  onDelete,
  onEdit,
  onToggleSubtask,
  onAddSubtask,
  onOpenTaskModal
}) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Pinned items always go first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const order = { urgent: 0, high: 1, medium: 2, low: 3 };
      return order[a.priority] - order[b.priority];
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    // Default: Created date descending
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-4">
      {/* Task Controls Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span>Tasks ({tasks.length})</span>
        </h2>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer"
          >
            <option value="createdAt">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Tasks Render */}
      {sortedTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center flex flex-col items-center justify-center shadow-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center mb-4 border border-indigo-100 dark:border-indigo-900/50">
            <Inbox className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
            No tasks found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
            You're all clear! Either create a new task or adjust your search filters to find what you're looking for.
          </p>
          <button
            onClick={onOpenTaskModal}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            Create New Task
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onTogglePin={onTogglePin}
                onDelete={onDelete}
                onEdit={onEdit}
                onToggleSubtask={onToggleSubtask}
                onAddSubtask={onAddSubtask}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};