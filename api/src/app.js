const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config();
const { SECRET } = process.env;
const googleStrategy = require('./authentication/googleStrategy.js');
const localStrategy = require('./authentication/localStrategy.js');
const { User } = require('./db.js');

// importamos index
const routes = require('./routes/index.js');

require('./db.js');

const server = express();
server.name = 'API';

//server.use(cors());
//requiero auth
//middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(
  require('express-session')({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })

);

require('./authentication/index');
server.use(passport.initialize());
server.use(passport.session());

//corse
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://prueba-bice-three.vercel.app/'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Configuracion de Passport.js
passport.use(googleStrategy);
passport.use(localStrategy);

// Configuración de la sesión de Passport.js
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Busca el usuario en la base de datos por su ID
    const user = await User.findByPk(id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

// middlewares para las rutas
server.use('/', routes);

server.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
