const path = require('node:path');
const escape = require('escape-html');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/users.json');
const defaultUsers = [];

/**
 * Prepare the data to add a password on a site
 * @param {Number} usersId the user id to add a password on a site
 * @param {String} urlSite the url of the site
 * @param {String} siteName the name of the site
 * @param {String} usernameSite the username of user on the site
 * @param {String} passwordSite the password of user on the site
 * @returns method to add a password on a site
 */
async function addPasswordOnSite(usersId, urlSite, siteName, usernameSite, passwordSite) {
  const indexIndex = indexUserFromUserId(usersId);
  const idSite = getNextIdSite(indexIndex);
  const dateAdded = Date.now().toLocaleString();

  const newSite = {
    id: parseInt(escape(idSite), 10),
    url: escape(urlSite),
    site: escape(siteName),
    dateSite: escape(dateAdded),
    login: escape(usernameSite),
    mot_de_passe: escape(passwordSite),
  };
  return toDatabaseSites(newSite, indexIndex, getLastIndexSite(indexIndex));
}

/**
 * Add a site to a user
 * @param {JSON} usersite the site to add
 * @param {Number} indexUser the index of the user to add a site
 * @param {Number} indexSite the index of the site to add
 * @returns the site added or undefined if user not found
 */
function toDatabaseSites(usersite, indexUser, indexSite) {
  const users = parse(jsonDbPath, defaultUsers);

  if (indexUser > users.length) return undefined;
  const userFound = users[indexUser];
  userFound.sites[indexSite + 1] = usersite;

  users[indexUser] = userFound;
  serialize(jsonDbPath, users);
  return userFound;
}

/**
 * Find index of the user
 * @param {Number} userId the user id to find the index
 * @returns index of the user if found, undefined otherwise
 */
function indexUserFromUserId(userId) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.id === userId);
  if (indexOfUserFound < 0) return undefined;
  return parseInt(indexOfUserFound, 10);
}

/**
 * Get the next id of a site
 * @param {Number} indexUser the index of the user who wants to have the next id of a site
 * @returns the next id of a site
 */
function getNextIdSite(indexUser) {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = getLastIndexSite(indexUser);
  const id = users[indexUser].sites[lastItemIndex]?.id;
  if (!id) return 1;

  const nextId = parseInt(id, 10) + 1;

  return parseInt(nextId, 10);
}

/**
 * Get the last index of a site
 * @param {Number} indexUser the index of the user who wants to have the last index of a site
 * @returns the last index of a site or -1 if no site
 */
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

  const indexUser = indexUserFromUserId(userId);

  const indexSite = siteFromSiteId(userId, siteId);

  if (indexSite === undefined) return undefined;

  const deletedSite = users[indexUser].sites.splice(indexSite, 1);

  serialize(jsonDbPath, users);

  return deletedSite;
}

/**
 * Find index of the site of a user
 * @param {Number} indexUser the index of the user who wants to delete a site
 * @param {Number} siteId the id of the site to delete
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
 * @param {Number} userId the index of the user who wants to have all his sites
 * @returns all sites of a user if found, undefined otherwise
 */
function getAllUserSites(userId) {
  const users = parse(jsonDbPath, defaultUsers);
  const user = users.find((usera) => usera.id === userId);
  const allUserSites = user.sites;
  return allUserSites;
}

/**
 * Update a site from a user
 * @param {Number} userId the user id to update a site
 * @param {Number} siteId the site id to update
 * @param {String} password potentially new password
 * @param {String} url potentially new url
 * @param {String} siteName potentially new site name
 * @param {String} userName potentially new username
 * @returns the updated site
 */
function updatePassword(userId, siteId, password, url, siteName, userName) {
  const users = parse(jsonDbPath, defaultUsers);
  const userIndex = users.findIndex((s) => s.id === userId);
  const user = users.find((userUpdate) => userUpdate.id === userId);
  const allSites = getAllUserSites(userId);
  const siteIndex = allSites.findIndex((s) => s.id === siteId);
  const copieSite = { ...allSites[siteIndex] };
  if (userName !== undefined) {
    copieSite.login = userName;
  }
  if (password !== undefined) {
    copieSite.mot_de_passe = password;
  }
  if (url !== undefined) {
    copieSite.url = url;
  }
  if (siteName !== undefined) {
    copieSite.site = siteName;
  }
  allSites[siteIndex] = copieSite;
  user.sites = allSites;
  users[userIndex] = user;
  serialize(jsonDbPath, users);
  return copieSite;
}

/**
 * Filters and sorts a list of sites associated with a user based on site names.
 *
 * @param {number} id - The user ID for which to filter and sort sites.
 * @returns {Array} - An array of sites associated with the user, sorted by site names.
 *                   Returns 'undefined' if the user is not found.
 */
function filtreBySiteName(id) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.id === id);
  if (indexOfUserFound < 0) return undefined;

  const userListFound = users[indexOfUserFound].sites;
  userListFound.sort((a, b) => a.site.localeCompare(b.site));

  return userListFound;
}

function sortByDate(id) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.id === id);
  if (indexOfUserFound < 0) return undefined;

  const userListFound = users[indexOfUserFound].sites;

  userListFound.sort((a, b) => a.dateSite.localeCompare(b.dateSite));

  return userListFound;
}

function getSiteById(userid, siteId) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.id === userid);
  if (indexOfUserFound < 0) return undefined;
  const listeSite = users[indexOfUserFound].sites;
  const indexOfSiteFound = listeSite.findIndex((site) => site.id === siteId);
  return listeSite[indexOfSiteFound];
}

module.exports = {
  addPasswordOnSite,
  removeSite,
  updatePassword,
  filtreBySiteName,
  sortByDate,
  getSiteById,
};
