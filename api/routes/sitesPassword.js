const express = require('express');
const { addPasswordOnSite, removeSite } = require('../models/sites');

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

module.exports = router;
