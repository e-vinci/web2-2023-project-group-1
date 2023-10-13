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
  const idSite = getNextIdSite(index);
  console.log('id:');
  console.log(idSite);
  const newAccount = {
    id: idSite,
    url: urlSite,
    site: siteName,
    login: usernameSite,
    mot_de_passe: bcrypt.hashSync(passwordSite, saltRounds),
  };
  return toDatabaseSites(newAccount, index, idSite, 'ADD');
}

/* Add or modify site  */
function toDatabaseSites(usersite, indexUser, indexSite, state) {
  const users = parse(jsonDbPath, defaultUsers);
  let userFound;
  if (state === 'ADD') {
    if (indexUser > users.length) return undefined;
    userFound = users[indexUser];
    userFound.sites[indexSite].push(usersite);
    users[indexUser] = userFound;
  }
  serialize(jsonDbPath, users);
  console.log(userFound);
  return userFound;
}

// Function needed to find one index of a user
function userFromUserId(userId) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.id === userId);
  if (indexOfUserFound < 0) return undefined;
  return parseInt(indexOfUserFound, 10);
}

// Get the id after the last of the list
function getNextIdSite(indexUser) {
  const users = parse(jsonDbPath, defaultUsers);
  let lastItemIndex;
  if (users[indexUser].site.length > 1) {
    lastItemIndex = users[indexUser].sites.length - 1;
  } else {
    lastItemIndex = 1;
  }
  const lastId = users[indexUser].site[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = { addPasswordOnSite };
