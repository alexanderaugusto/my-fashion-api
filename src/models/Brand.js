const { Model, DataTypes } = require("sequelize")

class Brand extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize: connection // Objecto para conexão com o banco de dados
    })
  }

  static associate(models) {
    // Uma categoria pertence a um produto
    this.hasMany(models.Product, { foreignKey: "brand_id", as: "product" })
  }
}

module.exports = Brand