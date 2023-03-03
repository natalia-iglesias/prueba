const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'VdV',
    {
      id: {
        type: DataTypes.INTEGER, // buscar regex
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address: {
        // Esto va a ser "Longitud" y "Latitud" -> Numbers(integer)
        // type: DataTypes.ARRAY(DataTypes.INTEGER), --> vamos a usar
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
      },
      lng: {
        type: DataTypes.FLOAT,
      },
      cbu: {
        type: DataTypes.STRING,
        unique: true,
      },
      mail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        // buscar regex
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //   len: [8, 20],
        // },
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Active', 'Disabled'), // Active de ser aprobado.
        defaultValue: 'Pending', // 'Pending' // Admin lo rechaza se elimina el registro
      },
      rating: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
