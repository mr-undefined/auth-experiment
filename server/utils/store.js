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

const initStore = { // TODO: del it
  '7ff7c131-0e76-4d50-bd1c-54027d3f2e5f': {
    uuid: '7ff7c131-0e76-4d50-bd1c-54027d3f2e5f',
    email: 'sasha@i.ua',
    password: 'qwerty',
    name: 'Sasha',
  },
};

const store = Store();
export default store();
