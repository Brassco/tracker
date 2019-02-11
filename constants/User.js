let user = null;

function setUserObj(setUser) {
  user = { ...setUser };
}

function getUserObj() {
  return user;
}

export default {
  setUserObj,
  getUserObj
};
