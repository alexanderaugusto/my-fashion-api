const { Model, DataTypes } = require("sequelize")

class OrderProduct extends Model {
  static init(connection) {
    super.init({
      buy_date: DataTypes.DATE,
      send_date: DataTypes.DATE,
      delivery_date: DataTypes.DATE,
      buy_quantity: DataTypes.INTEGER,
      buy_freight: DataTypes.FLOAT,
      buy_term: DataTypes.INTEGER,
      discount: DataTypes.FLOAT,
    }, {
      sequelize: connection // Objecto para conexão com o banco de dados
    })
  }

  static associate(models) {
    // Um status pode estar em varias compras
    this.belongsTo(models.Status, { foreignKey: "status_id", as: "status" })
  }
}

module.exports = OrderProduct