export const storage = {
  get: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
  set: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  generateId: () => {
    return Math.floor(Math.random() * 1000000);
  }
};
