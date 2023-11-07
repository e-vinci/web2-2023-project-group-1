const express = require('express');
const {
  getTenFirstPassword,
  addOrUpdateToLeaderboard,
} = require('../models/leaderboard');

const router = express();

/**
 * add or update a password to the leaderboard
 */
router.post('/addLeaderboard', async (req, res) => {
  const psw = req.body.password;
  if (!psw) {
    return res.sendStatus(400);
  }
  const returned = addOrUpdateToLeaderboard(psw);
  return res.json(returned);
});

/**
 * get the leaderboard
 */
router.get('/leaderboard', (req, res) => {
  const passwords = getTenFirstPassword();
  return res.json(passwords);
});

module.exports = router;
