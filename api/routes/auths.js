/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-newline */
const express = require('express');
const nodeMailer = require('nodemailer');
require('dotenv').config();

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

  try {
    await sendMail(email, username);
  } catch (err) {
    console.log(err);
  }

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

async function sendMail(email, username) {
  const html = `
    <h1 style="text-align: center">
      Bievenue ${username}
    </h1>
    <div style="text-align: center">
      <p>
        Merci d'avoir rejoint la communauté DontHackMe.
      </p>
      <br>
      <p>
        DonthackMe est un gestionnaire de mot de passe sécurisé. Il vous permet de stocker vos mots de passe en toute sécurité grâce à un système de chiffrement AES-512.
      </p>
      <br>
      <p>
        Nous vous conseillons de conserver précieusement votre mot de passe car nous ne le stockont pas et il permettra de crypter tout mot de passe que vous fournirez. 
      </p>
      <p>
        Vous pouvez dès à présent vous connecter à votre compte en cliquant sur le bouton ci-dessous.
      </p>
      <br>
      <a href="https://iwezix.github.io/login" style="background-color: #2b2b2b; color: white; padding: 10px; border-radius: 5px; text-decoration: none">
        Se connecter
      </a>
    </div>
    

  `;

  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.email',
    secure: false,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  await transporter.sendMail({
    from: 'DontHackMe <donthackme.vinci@gmail.com>',
    to: email,
    subject: 'Bienvenue sur DontHackMe',
    html,
  });
}

module.exports = router;
