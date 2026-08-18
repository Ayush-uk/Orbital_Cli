import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import { StatsModal } from './components/StatsModal';
import { PomodoroModal } from './components/PomodoroModal';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  loadSettingsFromStorage,
  saveSettingsToStorage
} from './utils/storage';
import { INITIAL_TASKS, CATEGORIES } from './utils/initialData';

export default function App() {
  // Load initial states
  const [tasks, setTasks] = useState(() => {
    const saved = loadTasksFromStorage();
    return saved || INITIAL_TASKS;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const settings = loadSettingsFromStorage();
    if (settings && typeof settings.darkMode === 'boolean') {
      return settings.darkMode;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeFilter, setActiveFilter] = useState('all'); // all, today, overdue, completed
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);

  // Sync theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveSettingsToStorage({ darkMode });
  }, [darkMode]);

  // Sync tasks changes
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Task Action Handlers
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            // Trigger Confetti
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 }
            });
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  const handleTogglePin = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, pinned: !t.pinned } : t))
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
    } else {
      setTasks((prevTasks) => [taskData, ...prevTasks]);
    }
  };

  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = (t.subtasks || []).map((s) =>
            s.id === subtaskId ? { ...s, completed: !s.completed } : s
          );
          return { ...t, subtasks: updatedSubtasks };
        }
        return t;
      })
    );
  };

  const handleAddSubtask = (taskId, title) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === taskId) {
          const newSub = {
            id: Date.now().toString(),
            title,
            completed: false
          };
          return { ...t, subtasks: [...(t.subtasks || []), newSub] };
        }
        return t;
      })
    );
  };

  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => !t.completed));
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  // Filtered Tasks Computation
  const filteredTasks = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    return tasks.filter((t) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesDesc = t.description?.toLowerCase().includes(q);
        const matchesSubtask = t.subtasks?.some((s) => s.title.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesSubtask) return false;
      }

      // Category filter
      if (activeCategory !== 'All' && t.category !== activeCategory) {
        return false;
      }

      // Quick Filters
      if (activeFilter === 'today') {
        return t.dueDate === todayStr;
      }
      if (activeFilter === 'overdue') {
        return (
          t.dueDate &&
          !t.completed &&
          new Date(t.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
        );
      }
      if (activeFilter === 'completed') {
        return t.completed;
      }

      return true;
    });
  }, [tasks, activeFilter, activeCategory, searchQuery]);

  // Stats Computation
  const taskStats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const today = tasks.filter((t) => t.dueDate === todayStr).length;
    const overdue = tasks.filter(
      (t) =>
        t.dueDate &&
        !t.completed &&
        new Date(t.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
    ).length;

    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const byCategory = {};
    CATEGORIES.forEach((c) => {
      if (c.name === 'All') {
        byCategory['All'] = total;
      } else {
        byCategory[c.name] = tasks.filter((t) => t.category === c.name).length;
      }
    });

    return {
      total,
      completed,
      today,
      overdue,
      completionPercentage,
      byCategory
    };
  }, [tasks]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenTaskModal={openCreateModal}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenPomodoro={() => setIsPomodoroOpen(true)}
        taskCount={tasks.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          taskStats={taskStats}
          categories={CATEGORIES}
          onClearCompleted={handleClearCompleted}
        />

        <div className="flex-1 min-w-0">
          <TaskList
            tasks={filteredTasks}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onToggleComplete={handleToggleComplete}
            onTogglePin={handleTogglePin}
            onDelete={handleDeleteTask}
            onEdit={openEditModal}
            onToggleSubtask={handleToggleSubtask}
            onAddSubtask={handleAddSubtask}
            onOpenTaskModal={openCreateModal}
          />
        </div>
      </main>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
        categories={CATEGORIES}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        taskStats={taskStats}
      />

      <PomodoroModal
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
      />
    </div>
  );
}