const users = [];

const addUser = ({ id, _id }) => {
  const user = { id, _id };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (_id) => users.find((user) => user._id === _id);

module.exports = {
  addUser,
  removeUser,
  getUser,
};
