const server = require('./src/app.js');
const { conn } = require('./src/db.js');
// Para Deploy
require('dotenv').config();
const { PORT } = process.env;

conn.sync({ alter: true }).then(() => {
  server.listen( PORT, () => {
    // ${PGPORT} en lugar de 3001
    console.log(`%s listening at ${ PORT }`); // eslint-disable-line no-console
  });
});
