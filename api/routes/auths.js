/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-newline */
const express = require('express');
const { register, login, passwordCheck, readIdFromUsername, comparePassword } = require('../models/users');

const router = express.Router();

/* Register a user */
router.post('/register', async (req, res) => {
  const username = req?.body?.login?.length !== 0 ? req.body.login : undefined;
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !email || !password) return res.sendStatus(400); // 400 Bad Request

  const authenticatedUser = await register(username, email, password);

  if (!authenticatedUser) return res.sendStatus(409); // 409 Conflict

  return res.json(authenticatedUser);
});

/* Login a user */
router.post('/login', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser = await login(username, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized

  return res.json(authenticatedUser);
});

router.post('/passwordCheck', async (req, res) => {
  const id = req?.body?.id?.length !== 0 ? req.body.id : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!id || !password) return res.sendStatus(400); // 400 Bad Reques

  const boolean = await passwordCheck(id, password);
  const result = { value: boolean };

  if (!boolean) return res.sendStatus(401); // 401 Unauthorized

  return res.json(result);
});

router.post('/readUserFromUsername', async (req, res) => {
  const username = req?.body?.id?.length !== 0 ? req.body.username : undefined;
  console.log(username);

  if (!username) return res.sendStatus(400);

  const returned = await readIdFromUsername(username);

  if (!returned) return res.sendStatus(404);

  return res.json(returned);
});

router.post('/comparePassword', async (req, res) => {
  const username = req?.body?.id?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password;

  if (!username || !password) return res.sendStatus(400);

  const returned = await comparePassword(username, password);

  return res.json(returned);
});

module.exports = router;
