// Fazendo a conexão com o banco de dados SQL
const type = "local"

module.exports = {
  dialect: "mysql",
  host: type === "local" ? "localhost" : "centralmodas.cofdf77nzr6v.us-east-1.rds.amazonaws.com",
  username: type === "local" ? "root" : "admin",
  password: type === "local" ? "root" : "myData33Connect",
  database: type === "local" ? "central_modas" : "centralmodas",
  define: {
    timestamps: true, // created at - updated at
    underscored: true, // snake case (central_modas)
  }
}