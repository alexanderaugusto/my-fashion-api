const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const sequelize = require("sequelize")
const Op = sequelize.Op


const User = require("../models/User")
const Cart = require("../models/Cart")
const Card = require("../models/Card")


module.exports = {
  // Insere um novo cartão no banco de dados
  async store(req, res) {
    let { number, name, date, cod, cpf } = req.body
    const user_id = req.userId

    const user = await User.findByPk(user_id)

    if (!user) {
      return res.status(400).json({ cod_return: 400, message: "User not found." })
    }

    // md5 for id
    const id = crypto.randomBytes(16).toString("hex")

    const card = await Card.create({ id, number, name, date, cod, cpf, user_id })

    if (!card) {
      return res.status(400).json({ cod_return: 400, message: "Invalid user submitted information." })
    }

    return res.status(200).json(card)
  },

  // Busca todos os cartões do usuário
  async list(req, res) {
    const user_id = req.userId

    const user = await User.findByPk(user_id, {
      include: { association: "cards" }
    })

    if (!user)
      return res.status(400).json({ cod_return: 400, message: "User not found." })

    return res.status(200).json(user.cards)
  },

  // Altera as informações do cartão do usuário
  async update(req, res) {
    let { id, number, name, date, cod, cpf } = req.body
    const user_id = req.userId

    const user = await User.findByPk(user_id)

    if (!user)
      return res.status(400).json({ cod_return: 400, message: "User not found." })

    const [updated] = await Card.update({ number, name, date, cod, cpf },
      { where: { id, user_id } })

    if (!updated)
      return res.status(400).json({ cod_return: 400, message: "This card does not belong to this user." })

    return res.status(200).json({ cod_return: 200, message: "Card updated successfully." })
  },

  // Remove um cartão do usuário
  async remove(req, res) {
    const { id } = req.body
    const user_id = req.userId

    const card = await Card.findByPk(id)
    const user = await User.findByPk(user_id)

    if (!card) {
      return res.status(400).json({ cod_return: 400, message: "Card not found." })
    }
    if (!user) {
      return res.status(400).json({ cod_return: 400, message: "User not found." })
    }

    const deleted = await Card.destroy({ where: { id, user_id } })

    if (!deleted)
      return res.status(400).json({ cod_return: 400, message: "This card does not belongs to this user." })

    return res.status(200).json({ cod_return: 200, message: "Card deleted successfully." })
  }
}