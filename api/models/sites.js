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

  const newAccount = {
    id: idSite,
    url: urlSite,
    site: siteName,
    login: usernameSite,
    mot_de_passe: bcrypt.hashSync(passwordSite, saltRounds),
  };
  return toDatabaseSites(newAccount, index, getLastIndexSite(index), 'ADD');
}

/* Add or modify site  */
function toDatabaseSites(usersite, indexUser, indexSite, state) {
  const users = parse(jsonDbPath, defaultUsers);
  let userFound;
  if (state === 'ADD') {
    if (indexUser > users.length) return undefined;
    userFound = users[indexUser];
    userFound.sites[indexSite + 1] = usersite;

    users[indexUser] = userFound;
  }
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

// Get the id after the last of the list
function getNextIdSite(indexUser) {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = getLastIndexSite(indexUser);
  const id = users[indexUser].sites[lastItemIndex]?.id;
  if (!id) return 1;

  const nextId = id + 1;

  return nextId;
}

function getLastIndexSite(indexUser) {
  const users = parse(jsonDbPath, defaultUsers);
  if (users[indexUser].sites.length >= 1) {
    return users[indexUser].sites.length - 1;
  }

  return -1;
}

module.exports = { addPasswordOnSite };
