// Fazendo a conexão com o banco de dados SQL
module.exports = {
  dialect: "mysql",
  host: "remotemysql.com",
  username: "DvfqoM2gmj",
  password: "p5LP7Wkei7",
  database: "DvfqoM2gmj",
  define: {
    timestamps: true, // created at - updated at
    underscored: true, // snake case (central_modas)
  }
}