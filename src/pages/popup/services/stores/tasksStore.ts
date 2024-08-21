import { create } from 'zustand';
import { Task } from '../types';

interface TasksState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  currentTasks: Task[];
  setCurrentTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TasksState>(set => ({
  tasks: [],
  setTasks: tasks => set({ tasks }),
  currentTasks: [],
  setCurrentTasks: tasks => set({ currentTasks: tasks })
}));
