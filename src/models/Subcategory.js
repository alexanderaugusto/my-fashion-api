const { Model, DataTypes } = require("sequelize")

class Subcategory extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize: connection // Objecto para conexão com o banco de dados
    })
  }

  static associate(models) {
    // Uma sub categoria pertence a uma categoria
    this.belongsTo(models.Category, { foreignKey: "category_id", as: "category" })
    // Uma categoria tem varios produtos
    this.hasMany(models.Product, { foreignKey: "category_id", as: "products" })
  }
}

module.exports = Subcategory