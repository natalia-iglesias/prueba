const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = process.env;
const { findUser } = require('./controller.js');

const router = Router();

//login

router.post(
  '/',
  passport.authenticate('local', {
    session: false,
  }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
      };
      const token = jwt.sign(payload, SECRET);
      res.send({
        id: user.id,
        name: user.name,
        mail: user.mail,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);
//estrategia autirizacion
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res, next) => {
    try {
      const { mail } = req.query;
      const user = await findUser(mail);
      res.send(user);
    } catch (error) {
      console.log('error');
      next(error);
    }
  }
);
//redirigir al home ?? true--->/home-- false--> / registro
//funcion redirect
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

//CERRAR

module.exports = router;
