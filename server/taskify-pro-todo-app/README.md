# Taskify Pro - Ultra Modern Task & Productivity App

Taskify Pro is a production-ready, beautiful, responsive Task Management & Todo application built with **React**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**.

## 🌟 Features

- 🎨 **Modern Sleek UI**: Glassmorphic dark/light mode toggle with custom animations.
- 📋 **Complete Task Lifecycle**: Add, edit, complete, duplicate, pin, and delete tasks.
- 🏷️ **Categories & Priority**: Filter by categories (Work, Personal, Learning, Health) and priorities (Urgent, High, Medium, Low).
- 🚀 **Interactive Subtasks**: Create and mark dynamic subtasks inline with animated progress tracking.
- ⏱️ **Focus Pomodoro Timer**: Integrated Pomodoro focus clock modal for deep work sessions.
- 📊 **Productivity Insights**: Real-time stats dashboard tracking completion rates, pending, and overdue tasks.
- 🎉 **Celebration Effects**: Confetti bursts upon completing tasks.
- 🔍 **Instant Search & Shortcuts**: Search by task title, description, or subtask name (Press `/` to quickly search).
- 💾 **Local Persistence**: Automatic saving to browser `localStorage`.

## 🚀 Quick Start

### Prerequisites
Make sure you have Node.js (>= 18.x) installed.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser at the URL shown in the terminal (usually `http://localhost:5173`).

## 📁 Project Structure
```
taskify-pro-todo-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskModal.jsx
│   │   ├── StatsModal.jsx
│   │   └── PomodoroModal.jsx
│   ├── utils/
│   │   ├── storage.js
│   │   └── initialData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```
