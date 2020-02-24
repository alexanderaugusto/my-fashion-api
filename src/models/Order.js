const { Model, DataTypes } = require("sequelize")

class Order extends Model {
  static init(connection) {
    super.init({
      buy_info: DataTypes.JSON
    }, {
      sequelize: connection // Objecto para conexão com o banco de dados
    })
  }

  static associate(models) {
    // Um pedido pertence a um usuário
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
    // Um pedido pode conter vários produtos
    this.belongsToMany(models.Product, { foreignKey: "order_id", through: models.OrderProduct, as: "products" })
  }
}

module.exports = Order