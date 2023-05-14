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

    maxWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    minWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    averageWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    lifeSpan: {
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
