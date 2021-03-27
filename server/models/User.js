import store from '../utils/store';

const User = {};

User.getByEmail = (email) => store.findByEmail(email);

User.getByUUID = (uuid) => store.findByKey(uuid);

User.insert = (user) => store.insert(user.uuid, user);

export default User;
