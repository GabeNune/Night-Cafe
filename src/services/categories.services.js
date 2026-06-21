import { storage } from "./storage"

const STORAGE_KEY = 'nc_categories';

export async function getCategories() {
  return storage.get(STORAGE_KEY);
}

export async function createCategory(nome) {
  const categories = storage.get(STORAGE_KEY);
  const newCategory = {
    id: storage.generateId(),
    nome
  };
  const updatedCategories = [...categories, newCategory];
  storage.set(STORAGE_KEY, updatedCategories);
  return newCategory;
}

export async function deleteCategory(id) {
  const categories = storage.get(STORAGE_KEY);
  const updatedCategories = categories.filter(cat => cat.id !== id);
  storage.set(STORAGE_KEY, updatedCategories);
}
