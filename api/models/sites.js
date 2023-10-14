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

/**
 * Remove a site from a user
 * @param {Number} userId the user id to delete a site
 * @param {Number} siteId the site id to delete
 * @returns deleted site
 */
function removeSite(userId, siteId) {
  const users = parse(jsonDbPath, defaultUsers);

  const indexUser = userFromUserId(userId);

  const indexSite = siteFromSiteId(userId, siteId);

  if (indexSite === undefined) return undefined;

  const deletedSite = users[indexUser].sites.splice(indexSite, 1);

  serialize(jsonDbPath, users);

  return deletedSite;
}

/**
 * Find index of the site of a user
 * @param {*} indexUser the index of the user who wants to delete a site
 * @param {*} siteId the id of the site to delete
 * @returns index of the site of a user if found, undefined otherwise
 */
// Function needed to find one index of a site
function siteFromSiteId(indexUser, siteId) {
  const allUserSites = getAllUserSites(indexUser);
  const indexSite = allUserSites.findIndex((site) => site.id === siteId);
  if (indexSite < 0) return undefined;
  return parseInt(indexSite, 10);
}

/**
 * Get all sites of a user
 * @param {*} indexUser the index of the user who wants to have all his sites
 * @returns all sites of a user if found, undefined otherwise
 */
function getAllUserSites(indexUser) {
  const users = parse(jsonDbPath, defaultUsers);
  const user = users.find((usera) => usera.id === indexUser);
  const allUserSites = user.sites;
  return allUserSites;
}

module.exports = { addPasswordOnSite, removeSite };
