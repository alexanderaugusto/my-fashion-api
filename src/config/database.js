// Fazendo a conexão com o banco de dados SQL
const type = process.env.DATABASE_TYPE

module.exports = {
  dialect: "postgres",
  host: type === "local" ? "localhost" : "ruby.db.elephantsql.com",
  username: type === "local" ? "root" : "moiycdmj",
  password: type === "local" ? "root" : "itSu9SHzdOMLKfJ7Ry0CAk2dN8D1qdKe",
  database: type === "local" ? "central_modas" : "moiycdmj",
  define: {
    timestamps: true, // created at - updated at
    underscored: true, // snake case (central_modas)
  }
}