const express = require('express');
const { addPasswordOnSite } = require('../models/users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

/* POST add 1 site to my db */
router.post('/addSite', (req, res) => {
  const usersId = parseInt(req.body.userId, 10);
  const {
    urlSite, siteName, userNameSite, passwordSite,
  } = req.body;
  if (!urlSite || !siteName || !userNameSite || !passwordSite || usersId < 0) {
    res.status(400);
  }
  addPasswordOnSite(usersId, urlSite, siteName, userNameSite, passwordSite);
});
module.exports = router;
