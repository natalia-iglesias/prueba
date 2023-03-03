const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
   
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Ponemos mayusculas a los modelos
// devuelve array con pares de clave: valor de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

// Convierte el arreglo en un objeto con clave valor -> Nombre del metodo : fn()
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un (destructuring)

const { Donation, Feedback, Material, Role, Service, User, VdV, Contact } =
  sequelize.models;

// Relacion Usuario -> Feedback -> VdV
User.hasMany(Feedback); // comentario y puntuacion
Feedback.belongsTo(User);

VdV.hasMany(Feedback);
Feedback.belongsTo(VdV);

// Relacion Usuario -> Donacion -> VdV
User.hasMany(Donation);
Donation.belongsTo(User);

VdV.hasMany(Donation);
Donation.belongsTo(VdV);

// Relacion Usuario -> Servicio -> VdV
User.hasMany(Service);
Service.belongsTo(User);

VdV.hasMany(Service);
Service.belongsTo(VdV);

// Usuario a roll -> no se crea una tabal intermedia
User.belongsTo(Role); // 1 User pertenece a un roll
Role.hasMany(User); // 1 roll puede tener muchos usuarios

// Vdv con materiales -> Tabala intermedia
Material.belongsToMany(VdV, { through: 'Material_VdV' });
VdV.belongsToMany(Material, { through: 'Material_VdV' });

// RELACION DE MUCHOS A MUCHOS -> ANALZAR POR QUE NO ME DEJABA REPETIR EL REGISTRO
/*
Material.belongsToMany(VdV, { through: Donation });
VdV.belongsToMany(Material, { through: Donation });
Material.belongsToMany(VdV, { through: Feedback });
VdV.belongsToMany(Material, { through: Feedback });
Material.belongsToMany(VdV, { through: Service });
VdV.belongsToMany(Material, { through: Service });
*/

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
