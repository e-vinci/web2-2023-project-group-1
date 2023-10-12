const express = require('express');
const { addPasswordOnSite } = require('../models/users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

/* POST add 1 site to my db */
router.post('/addSite', (req) => {
  const usersId = parseInt(req.body.userId, 10);
  const { urlSite } = req.body;
  const { siteName } = req.body;
  const { usernameSite } = req.body;
  const { passwordSite } = req.body;
  addPasswordOnSite(usersId, urlSite, siteName, usernameSite, passwordSite);
});
module.exports = router;
