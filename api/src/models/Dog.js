const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weightMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weightMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    averageWeight: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
