const { Model } = require("sequelize")

class Favorite extends Model {
  static init(connection) {
    super.init({
      // do not have attributes
    }, {
      sequelize: connection // Objeto para conexão com o banco de dados
    })
  }
}

module.exports = Favorite