import { storage } from "./storage";

const STORAGE_KEY = 'nc_weekly_blocks';

export async function getWeekly() {
  return storage.get(STORAGE_KEY);
}

export async function createWeekly(body) {
  const blocks = storage.get(STORAGE_KEY);
  const newBlock = {
    ...body,
    id: storage.generateId()
  };
  const updatedBlocks = [...blocks, newBlock];
  storage.set(STORAGE_KEY, updatedBlocks);
  return newBlock;
}

export async function deleteWeekly(id) {
  const blocks = storage.get(STORAGE_KEY);
  const updatedBlocks = blocks.filter(block => block.id !== id);
  storage.set(STORAGE_KEY, updatedBlocks);
  return { success: true };
}
