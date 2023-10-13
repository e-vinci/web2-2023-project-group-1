const express = require('express');
const { getAllSite } = require('../models/sites');

const router = express.Router();

/* GET users listing. */
router.get('/', authorize, async (req, res) => {
  const listeSite = (getAllSite(req.body.token));
  return res.json(listeSite);
});

module.exports = router;
