const { Model, DataTypes } = require("sequelize")

class Company extends Model {
  static init(connection) {
    super.init({
      cnpj: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipcode: DataTypes.STRING
    }, {
      sequelize: connection // Objeto para conexão com o banco de dados
    })
  }

  // Relacionamentos
  static associate(models) {
    // Uma empresa pode ter varias vendas
    this.hasMany(models.OrderProduct, { foreignKey: "product_id", as: "orders" })
    // Uma empresa pode ter varios produtos
    this.hasMany(models.Product, { foreignKey: "company_id", as: "products" })
  }
}

module.exports = Company