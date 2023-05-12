//estos modelos son los que se conectan con la tabla. Al final se exporta, se lo llama en db con destructuring, para luego llevarlo al index.js del server para que se puedan conectar.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false

    },
    TempType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    
   
  });
};
