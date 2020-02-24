const { Model, DataTypes } = require("sequelize")

class Cart extends Model {
  static init(connection) {
    super.init({
      quantity: DataTypes.INTEGER,
      freight: DataTypes.FLOAT,
      praze: DataTypes.INTEGER,
      discount: DataTypes.FLOAT
    }, {
      sequelize: connection // Objeto para conexão com o banco de dados
    })
  }
}

module.exports = Cart