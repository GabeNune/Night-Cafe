import { storage } from "./storage";

const STORAGE_KEY = 'nc_tasks';

export async function getTasks() {
  return storage.get(STORAGE_KEY);
}

export async function createTasks(data) {
  const tasks = storage.get(STORAGE_KEY);
  const newTask = {
    ...data,
    id: storage.generateId()
  };
  const updatedTasks = [...tasks, newTask];
  storage.set(STORAGE_KEY, updatedTasks);
  return newTask;
}

export async function deleteTasks(id) {
  const tasks = storage.get(STORAGE_KEY);
  const updatedTasks = tasks.filter(task => task.id !== id);
  storage.set(STORAGE_KEY, updatedTasks);
  return { success: true };
}

export async function updateTasks(id, data) {
  const tasks = storage.get(STORAGE_KEY);
  const updatedTasks = tasks.map(task => 
    task.id === id ? { ...task, ...data } : task
  );
  storage.set(STORAGE_KEY, updatedTasks);
  const updatedTask = updatedTasks.find(task => task.id === id);
  return updatedTask;
}
