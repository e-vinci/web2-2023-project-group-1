let currentUser;

const getAuhtenticatedUser = () => currentUser;

const setAuthenticatedUser = (user) => {
  currentUser = user;
};

const isAuhtenticated = () => currentUser !== undefined;

const clearAuhtenticatedUser = () => {
  currentUser = undefined;
};


module.exports = {  getAuhtenticatedUser,setAuthenticatedUser, isAuhtenticated, clearAuhtenticatedUser, };