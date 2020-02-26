const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const fs = require("fs")

const sequelize = require("sequelize")
const Op = sequelize.Op

const authConfig = require("../config/auth")

const User = require("../models/User")

function tokenGenerate(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 864000
  })
}

module.exports = {
  // Insere um novo usuário no banco de dados
  async store(req, res) {
    let { email, password, name, cpf = "", phone = "" } = req.body

    // Encrypt password
    const hash = await bcrypt.hash(password, 16)
    password = hash

    // md5 for id
    const id = crypto.randomBytes(16).toString("hex")

    const [user, inserted] = await User.findOrCreate({
      where: { email },
      defaults: { id, email, password, name, cpf, date_of_birth: "", phone, image: "default-avatar.png" }
    })

    if (!inserted) {
      return res.status(409).json({ cod_return: 409, message: "This email already exist." })
    }

    const token = tokenGenerate({ id: user.id })

    return res.status(200).json({ token })
  },

  // Busca todos os usuários no banco de dados
  async listAll(req, res) {
    const users = await User.findAll()

    if (!users)
      return res.status(500).json({ cod_return: 500, message: "Internal server error." })

    return res.status(200).json(users)
  },

  // Busca todas as informações de um usuário no banco de dados
  async list(req, res) {
    const id = req.userId

    const userInfo = await User.findByPk(id, {
      include: [
        {
          association: "cart_products",
          include: [
            { association: "images" },
            { association: "product_category", include: { association: "category" } },
            { association: "product_brand" },
            { association: "company" }
          ],
          through: {
            attributes: ["quantity", "freight", "praze", "discount"],
          }
        },
        {
          association: "favorite_products",
          include: { association: "images" },
        },
        { association: "cards" },
        {
          association: "orders",
          include: {
            association: "products",
            include: { association: "images" },
            through: {
              attributes: ["buy_date", "send_date", "delivery_date", "buy_quantity", "buy_freight", "buy_term", "discount", "status_id"],
            },
          },
        },
        { association: "addresses" },
      ]
    })

    if (!userInfo)
      return res.status(400).json({ cod_return: 400, message: "User not found." })

    return res.status(200).json(userInfo)
  },

  // Realiza o login do usuário
  async login(req, res) {
    const { email, password } = req.body

    let user = await User.findOne({ where: { email } })

    if (!user)
      return res.status(402).json({ cod_return: 402, message: "Email or password incorrect." })

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(402).json({ cod_return: 402, message: "Email or password incorrect." })
    }

    user.password = undefined // Exclude password

    const token = tokenGenerate({ id: user.id })

    return res.status(200).json({ token })
  },

  // Altera as informações do usuário
  async update(req, res) {
    const { email, name, cpf, date_of_birth, phone } = req.body
    const id = req.userId

    const user = await User.findByPk(id)

    if (!user)
      return res.status(400).json({ cod_return: 400, message: "User not found." })

    // Verify if this email exists in database
    const userExists = email && await User.findOne({
      where: { email, id: { [Op.ne]: id } }
    })
    if (userExists)
      return res.status(400).json({ cod_return: 400, message: "This email already exist." })

    await User.update({ email, name, cpf, date_of_birth, phone }, { where: { id } })

    return res.status(200).json({ cod_return: 200, message: "User updted successfully." })
  },

  // Altera a imagem do usuário
  async uploadImage(req, res) {
    // const id = req.userId
    // const { filename: image } = req.file

    // const user = await User.findByPk(id)

    // if (!user)
    //   return res.status(400).json({ cod_return: 400, message: "User not found." })

    // const [updated] = await User.update({ image }, { where: { id } })

    // if (!updated)
    //   return res.status(400).json({ cod_return: 400, message: "Error in update image." })

    // if (user.image !== "default-avatar.png") {
    //   fs.unlink('tmp/img/user' + user.image, (err) => {
    //     if (err)
    //       throw err
    //   })
    // }

    return res.status(200).json({ cod_return: 200, message: "Image updted successfully." })
  }
}