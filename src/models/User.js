const { Model, DataTypes } = require("sequelize")

class User extends Model {
  static init(connection) {
    super.init({
      id: { type: DataTypes.STRING, primaryKey: true },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      date_of_birth: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING
    }, {
      sequelize: connection // Objeto para conexão com o banco de dados
    })
  }

  // Relacionamentos
  static associate(models) {
    // Um usuário tem muitos endereços
    this.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" })
    // Um usuário varios produtos no carrinho
    this.belongsToMany(models.Product, { foreignKey: "user_id", through: models.Cart, as: "cart_products" })
    // Um usuário tem muitos pedidos
    this.hasMany(models.Order, { foreignKey: "user_id", as: "orders" })
    // Um usuário pode ter vários cartões de crédito
    this.hasMany(models.Card, { foreignKey: "user_id", as: "cards" })
    // Um usuário pode ter vários produtos marcados como favorito
    this.belongsToMany(models.Product, { foreignKey: "user_id", through: models.Favorite, as: "favorite_products" })
  }
}

module.exports = User