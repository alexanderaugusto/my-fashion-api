const { Model, DataTypes } = require("sequelize")

class Status extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize: connection, // Objecto para conexão com o banco de dados
      tableName: 'Status'
    })
  }

  static associate(models) {
    // Um status pode estar em varias compras
    this.hasMany(models.OrderProduct, { foreignKey: "status_id", as: "order" })
  }
}

module.exports = Status