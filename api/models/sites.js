const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');
const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin', saltRounds),
    sites: {},
  },
];

// Method needed to add a password on the data base

async function addPasswordOnSite(usersId, urlSite, siteName, usernameSite, passwordSite) {
  const index = userFromUserId(usersId);
  const newAccount = {
    url: urlSite,
    site: siteName,
    login: usernameSite,
    mot_de_passe: bcrypt.hashSync(passwordSite, saltRounds),
  };
  return toDatabaseSites(newAccount, index);
}

function toDatabaseSites(usersite, indexUser) {
  const users = parse(jsonDbPath, defaultUsers);
  if (indexUser > users.length) return undefined;
  const userFound = users[indexUser];
  userFound.sites.push(usersite);
  users[indexUser] = userFound;
  serialize(jsonDbPath, users);
  return userFound;
}

// Function needed to find one index of a user
function userFromUserId(userId) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.id === userId);
  if (indexOfUserFound < 0) return undefined;
  return parseInt(indexOfUserFound, 10);
}

module.exports = { addPasswordOnSite };
