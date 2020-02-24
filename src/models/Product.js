const { Model, DataTypes } = require("sequelize")

class Product extends Model {
  static init(connection) {
    super.init({
      cod: DataTypes.STRING, 
      title: DataTypes.STRING,
      price: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    }, {
      sequelize: connection // Objeto para conexão com o banco de dados
    })
  }

  static associate(models) {
    // Um produto pode estar em varios carrinhos
    this.belongsToMany(models.User, { foreignKey: "product_id", through: models.Cart, as: "cart_users" })
    // Um produto tem várias imagens
    this.hasMany(models.Image, { foreignKey: "product_id", as: "images" })
    // Um produto pode estar em varios pedidos
    this.belongsToMany(models.Order, { foreignKey: "product_id", through: models.OrderProduct, as: "orders" })
    // Um produto pode ser favorito de varios usuários
    this.belongsToMany(models.User, { foreignKey: "product_id", through: models.Favorite, as: "favorite_users" })
    // Um produto possui uma categoria
    this.belongsTo(models.Subcategory, { foreignKey: "category_id", as: "product_category" })
    // Um produto possui uma marca
    this.belongsTo(models.Brand, { foreignKey: "brand_id", as: "product_brand" })
    // Um produto pertence a uma empresa
    this.belongsTo(models.Company, { foreignKey: "company_id", as: "company" })
  }
}

module.exports = Product