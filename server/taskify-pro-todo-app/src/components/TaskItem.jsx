import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Pin, Trash2, Edit3, Calendar, AlertTriangle, 
  ChevronDown, ChevronUp, Plus, Clock 
} from 'lucide-react';

const PRIORITY_BADGES = {
  urgent: { label: 'Urgent', bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50' },
  high: { label: 'High', bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50' },
  medium: { label: 'Medium', bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50' },
  low: { label: 'Low', bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800' }
};

export const TaskItem = ({
  task,
  onToggleComplete,
  onTogglePin,
  onDelete,
  onEdit,
  onToggleSubtask,
  onAddSubtask
}) => {
  const [expanded, setExpanded] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  const completedSubtasksCount = task.subtasks?.filter((s) => s.completed).length || 0;
  const totalSubtasksCount = task.subtasks?.length || 0;
  const subtaskProgress =
    totalSubtasksCount > 0 ? (completedSubtasksCount / totalSubtasksCount) * 100 : 0;

  const handleSubtaskSubmit = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    onAddSubtask(task.id, newSubtaskTitle.trim());
    setNewSubtaskTitle('');
    setIsAddingSubtask(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`group relative rounded-2xl border transition-all duration-200 ${
        task.completed
          ? 'bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60 opacity-80'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
      } ${task.pinned ? 'ring-2 ring-indigo-500/30 border-indigo-300 dark:border-indigo-800' : ''}`}
    >
      {/* Main Task Row */}
      <div className="p-4 flex items-start gap-3.5">
        {/* Custom Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all shadow-sm ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-slate-800'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
        </button>

        {/* Task Content Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {/* Priority Badge */}
            {task.priority && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                  PRIORITY_BADGES[task.priority]?.bg
                }`}
              >
                {PRIORITY_BADGES[task.priority]?.label}
              </span>
            )}

            {/* Category Tag */}
            {task.category && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {task.category}
              </span>
            )}

            {/* Due Date Indicator */}
            {task.dueDate && (
              <span
                className={`text-xs font-medium flex items-center gap-1 border px-2 py-0.5 rounded-md ${
                  isOverdue
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-500 dark:text-slate-400'
                }`}
              >
                {isOverdue ? <AlertTriangle className="w-3 h-3 text-rose-500" /> : <Calendar className="w-3 h-3" />}
                <span>{task.dueDate}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h4
            className={`text-base font-semibold leading-snug break-words transition-colors ${
              task.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {task.title}
          </h4>

          {/* Description if present */}
          {task.description && (
            <p
              className={`text-xs mt-1 line-clamp-2 ${'text-slate-500 dark:text-slate-400'}`}
            >
              {task.description}
            </p>
          )}

          {/* Subtask Progress Summary Bar */}
          {totalSubtasksCount > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                <div
                  className="bg-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${subtaskProgress}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                {completedSubtasksCount}/{totalSubtasksCount} subtasks
              </span>
            </div>
          )}
        </div>

        {/* Action Button Controls */}
        <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onTogglePin(task.id)}
            title={task.pinned ? 'Unpin Task' : 'Pin Task'}
            className={`p-1.5 rounded-lg transition-colors ${
              task.pinned
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Pin className={`w-4 h-4 ${task.pinned ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
          </button>

          <button
            onClick={() => onEdit(task)}
            title="Edit Task"
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            title="Delete Task"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            title={expanded ? 'Collapse' : 'Expand Subtasks'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Subtasks Drawer */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-2xl overflow-hidden"
          >
            <div className="space-y-2 mt-2">
              {task.subtasks?.map((sub) => (
                <div key={sub.id} className="flex items-center gap-2.5 text-xs group/sub">
                  <button
                    onClick={() => onToggleSubtask(task.id, sub.id)}
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      sub.completed
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {sub.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <span
                    className={`flex-1 ${'font-medium'} ${
                      sub.completed
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {sub.title}
                  </span>
                </div>
              ))}

              {/* Add New Subtask inline */}
              {isAddingSubtask ? (
                <form onSubmit={handleSubtaskSubmit} className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Add new subtask..."
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    autoFocus
                    className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="text-xs font-semibold px-2.5 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingSubtask(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsAddingSubtask(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 pt-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Subtask
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};