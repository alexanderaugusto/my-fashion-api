// Fazendo a conexão com o banco de dados SQL
module.exports = {
  dialect: "mysql",
  host: "centralmodas.cofdf77nzr6v.us-east-1.rds.amazonaws.com",
  username: "admin",
  password: "myData33Connect",
  database: "centralmodas",
  define: {
    timestamps: true, // created at - updated at
    underscored: true, // snake case (central_modas)
  }
}