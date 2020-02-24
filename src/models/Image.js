const { Model, DataTypes } = require("sequelize")

class Image extends Model {
  static init(connection) {
    super.init({
      id: { type: DataTypes.STRING, primaryKey: true },
      name: DataTypes.STRING
    }, {
      sequelize: connection // Objeto para conexão com o banco de dados
    })
  }

  static associate(models) {
    // Uma imagem percente a apenas um produto
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" })
  }
}

module.exports = Image