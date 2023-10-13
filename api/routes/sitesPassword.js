const express = require('express');
const { addPasswordOnSite } = require('../models/sites');

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

module.exports = router;