const TASKS_KEY = 'taskify_pro_tasks';
const SETTINGS_KEY = 'taskify_pro_settings';

export const loadTasksFromStorage = () => {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load tasks from localStorage', e);
    return null;
  }
};

export const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks to localStorage', e);
  }
};

export const loadSettingsFromStorage = () => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load settings', e);
    return null;
  }
};

export const saveSettingsToStorage = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
};