import { storage } from "./storage";

const STORAGE_KEY = 'nc_pomodoro_sessions';

export async function getPomodoro() {
  return storage.get(STORAGE_KEY);
}

export async function createPomodoro(data) {
  const sessions = storage.get(STORAGE_KEY);
  const newSession = {
    ...data,
    id: storage.generateId()
  };
  const updatedSessions = [...sessions, newSession];
  storage.set(STORAGE_KEY, updatedSessions);
  return newSession;
}
