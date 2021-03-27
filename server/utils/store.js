function Store(init) {
  const store = init || {};

  return () => ({
    insert(key, value) {
      store[key] = value;
    },
    update(key, dataToUpdate) {
      store[key] = { ...store[key], ...dataToUpdate };
    },
    delete(key) {
      delete store[key];
    },
    findByKey(key) {
      return store[key] || null;
    },
    findByEmail(email) {
      const values = Object.values(store);
      const found = values.find((el) => el.email === email);
      return found || null;
    },
  });
}

const store = Store({});
export default store();
