export const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Design Taskify Pro Dashboard',
    description: 'Create ultra-clean modern UI mockups with Tailwind CSS and dark mode support.',
    completed: false,
    priority: 'high',
    category: 'Work',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    pinned: true,
    subtasks: [
      { id: 's1', title: 'Figma Component Library', completed: true },
      { id: 's2', title: 'Tailwind Color Palette', completed: true },
      { id: 's3', title: 'Dark Mode Contrast Audit', completed: false }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Complete Weekly Workout Routine',
    description: '30 min cardio & upper body strength training at the gym.',
    completed: true,
    priority: 'medium',
    category: 'Personal',
    dueDate: new Date().toISOString().split('T')[0],
    pinned: false,
    subtasks: [
      { id: 's1', title: '15m Warmup Run', completed: true },
      { id: 's2', title: 'Bench Press & Dumbbell Flies', completed: true }
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '3',
    title: 'Read 20 pages of Atomic Habits',
    description: 'Focus on habit stacking and environmental cues chapter.',
    completed: false,
    priority: 'low',
    category: 'Learning',
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    pinned: false,
    subtasks: [],
    createdAt: new Date().toISOString()
  }
];

export const CATEGORIES = [
  { name: 'All', icon: 'Layers', color: 'indigo' },
  { name: 'Work', icon: 'Briefcase', color: 'blue' },
  { name: 'Personal', icon: 'User', color: 'emerald' },
  { name: 'Learning', icon: 'BookOpen', color: 'amber' },
  { name: 'Health', icon: 'Heart', color: 'rose' }
];