function Store(init) {
  const store = init || {};

  return () => ({
    insert(key, value) {
      store[key] = value;
    },
    findByKey(key) {
      return store[key] || null;
    },
    findByEmail(email) {
      const values = Object.values(store);
      const found = values.find((el) => el.email === email);
      return found || null;
    },

    showAll() {
      return store;
    },
  });
}

const store = Store();
export default store();
