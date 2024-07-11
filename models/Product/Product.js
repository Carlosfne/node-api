const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preco: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataCriacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
});

module.exports = Product;
