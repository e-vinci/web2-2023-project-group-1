const express = require('express');
const {
  addPasswordOnSite,
  removeSite,
  updatePassword,
  filtreBySiteName,
  sortByDate,
  filterByPasswordPower,
} = require('../models/sites');

const router = express();

/* POST add 1 site to my db */
router.post('/addSite', async (req, res) => {
  const usersId = parseInt(req.body.userId, 10);
  const {
    urlSite, siteName, userNameSite, passwordSite,
  } = req.body;
  if (!siteName || !userNameSite || !passwordSite || usersId < 0) {
    return res.sendStatus(400);
  }
  const returned = await addPasswordOnSite(usersId, urlSite, siteName, userNameSite, passwordSite);
  return res.json(returned);
});

/**
 * Delete a site from the database
 * @param {Object} req object of the request.
 * @param {Object} res object of the response.
 */
router.delete('/deleteSite', (req, res) => {
  const userId = parseInt(req.body.userId, 10);
  const siteId = parseInt(req.body.id, 10);

  if (!userId || !siteId) {
    return res.sendStatus(400);
  }

  const returned = removeSite(userId, siteId);

  if (!returned) {
    return res.sendStatus(404);
  }

  return res.json(returned);
});

/**
 * Update a password
 */
router.patch('/updateSite', (req, res) => {
  const userId = parseInt(req?.body?.userId, 10);
  const siteId = parseInt(req?.body?.id, 10);
  const siteName = req?.body?.site;
  const url = req?.body?.url;
  const password = req?.body?.password;
  const userName = req?.body?.login;

  if (!userId || !siteId) {
    return res.sendStatus(400);
  }
  const updatedPassword = updatePassword(userId, siteId, password, url, siteName, userName);

  if (!updatedPassword) {
    return res.sendStatus(404);
  }

  return res.json(updatedPassword);
});

/**
 * Handles an HTTP GET request to order and retrieve a
 * list of sites associated with a user by site names.
 *
 * @param {object} req - The Express request object containing the user ID in the request body.
 * @param {object} res - The Express response object to send a JSON response or an error status.
 */
router.get('/orderBySiteName', (req, res) => {
  const userId = parseInt(req.body.userId, 10);

  const orderBy = filtreBySiteName(userId);

  if (!orderBy) {
    return res.sendStatus(404);
  }
  return res.json(orderBy);
});

/**
 * Handles an HTTP GET request to order and retrieve a
 * list of sites associated with a user by date.
 *
 * @param {object} req - The Express request object containing the user ID in the request body.
 * @param {object} res - The Express response object to send a JSON response or an error status.
 */
router.get('/orderByDate', (req, res) => {
  const userId = parseInt(req.body.userId, 10);

  const orderBy = sortByDate(userId);

  if (!orderBy) {
    return res.sendStatus(404);
  }
  return res.json(orderBy);
});

router.get('/filterByPower', (req, res) => {
  const userId = parseInt(req.body?.userId, 10);
  const power = req.body?.power;

  if (!userId || !power) {
    return res.sendStatus(400);
  }

  const filterByPower = filterByPasswordPower(userId, power);

  if (!filterByPower) {
    return res.sendStatus(404);
  }

  return res.json(filterByPower);
});

module.exports = router;
