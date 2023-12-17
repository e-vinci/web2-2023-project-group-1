const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/leaderboards.json');
const defaultLeaderboard = [];

/**
 * Get the 10 first password of the leaderboard
 * @returns {JSON} 10 first password of the leaderboard
 */
function getTenFirstPassword() {
  const leaderboards = parse(jsonDbPath, defaultLeaderboard);
  const sortedLeaderboards = leaderboards.sort((a, b) => b.count - a.count);
  return sortedLeaderboards.slice(0, 10);
}

/**
 * Add or update a password to the leaderboard
 * @param {String} password the password to add or update
 * @returns {JSON} the password added or updated
 */
function addOrUpdateToLeaderboard(password) {
  const leaderboards = parse(jsonDbPath, defaultLeaderboard);
  const indexOfPassword = leaderboards.findIndex((psw) => psw.password === password);
  if (indexOfPassword < 0) {
    const newPassword = {
      id: getNextId(),
      password: escape(password),
      count: 1,
    };
    leaderboards.push(newPassword);
    serialize(jsonDbPath, leaderboards);
    return newPassword;
  }
  const psw = leaderboards[indexOfPassword];
  psw.count += 1;
  leaderboards[indexOfPassword] = psw;
  serialize(jsonDbPath, leaderboards);
  return psw;
}

/**
 * Get the next id of the leaderboard
 * @returns {Integer} the next id of the leaderboard
 */
function getNextId() {
  const leaderbords = parse(jsonDbPath, defaultLeaderboard);
  const lastItemIndex = leaderbords?.length !== 0
    ? leaderbords.length - 1
    : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = leaderbords[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

/**
 * Get the number of site
 * @param {String} password the password to check
 * @returns {Integer} the number of site
 */
function getNumberOfSite(password) {
  const leaderboards = parse(jsonDbPath, defaultLeaderboard);
  const indexOfPassword = leaderboards.findIndex((psw) => psw.password === password);
  if (indexOfPassword < 0) return 0;
  return leaderboards[indexOfPassword]?.count;
}

module.exports = {
  getTenFirstPassword, addOrUpdateToLeaderboard, getNumberOfSite,
};
