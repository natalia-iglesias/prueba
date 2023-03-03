const passport = require('passport');
const Strategy = require('passport-google-oauth20');
const { User } = require('../../db');

const GoogleStrategy = new Strategy(
  {
    clientID:
      '1062951211306-8rjsrlpirtmqns7k2lejkrhvm1sthvm2.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback',
    prompt: 'select_account',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Busca el usuario en la base de datos por su ID de Google
      const user = await User.findOne({ where: { googleId: profile.id } });
      if (user) {
        // Si el usuario ya existe, lo devuelve
        done(null, user);
      } else {
        // Si el usuario no existe, lo crea y lo devuelve
        const newUser = await User.create({
          googleId: profile.id,
          name: profile.name.givenName,
          last_name: profile.name.familyName,
          mail: profile.emails[0].value,
          image: profile.photos[0].value,
        });
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }
);

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
module.exports = GoogleStrategy;
