const LocalStrategy = require('passport-local');
const { User } = require('../db.js');

const localStrategy = new LocalStrategy(
  {
    usernameField: 'mail', // campo de formulario para el correo electrónico
    passwordField: 'password', // campo de formulario para la contraseña
  },
  async function (mail, password, done) {
    try {
      // Busca el usuario en la base de datos por su correo electrónico
      const user = await User.findOne({ where: { mail } });
      if (!user) {
        return done(null, false, {
          message: 'Correo electrónico incorrecto.',
        });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      // Si todo sale bien, devuelve el usuario
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = localStrategy;
