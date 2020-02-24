const { Model, DataTypes } = require("sequelize")

class Category extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      image: DataTypes.STRING
    }, {
      sequelize: connection // Objecto para conexão com o banco de dados
    })
  }

  static associate(models) {
    // Uma categoria possui varias sub categorias
    this.hasMany(models.Subcategory, { foreignKey: "category_id", as: "subcategories" })
  }
}

module.exports = Category