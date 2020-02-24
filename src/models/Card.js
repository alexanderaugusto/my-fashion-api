const { Model, DataTypes } = require("sequelize")

class Card extends Model {
  static init(connection) {
    super.init({
      id: { type: DataTypes.STRING, primaryKey: true },
      number: DataTypes.STRING,
      name: DataTypes.STRING,
      date: DataTypes.STRING,
      cod: DataTypes.STRING,
      cpf: DataTypes.STRING
    }, {
      sequelize: connection // Objeto para conexão com o banco de dados
    })
  }

  // Relacionamentos
  static associate(models) {
    // Um cartão pertence a apenas um usuário
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
  }
}

module.exports = Card