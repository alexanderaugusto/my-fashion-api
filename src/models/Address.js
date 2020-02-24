const { Model, DataTypes } = require("sequelize")

class Address extends Model {
  static init(connection) {
    super.init({
      zipcode: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      street: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      number: DataTypes.STRING,
      complement: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      is_main: DataTypes.BOOLEAN
    }, {
      sequelize: connection // Objeto para conexão com o banco de dados
    })
  }

  // Relacionamentos
  static associate(models){
    // Um endereço pertence a um usuário
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
  }
}

module.exports = Address // Referenciamento com a tabela: Adress -> Adresses and Address -> Addresses (BUG)