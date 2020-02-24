const Company = require("../models/Company")
const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")
const bcrypt = require("bcryptjs")
const authConfig = require("../config/auth")
const jwt = require("jsonwebtoken")

function tokenGenerate(params = {}) {
  return jwt.sign(params, authConfig.company_secret, {
    expiresIn: 864000
  })
}

module.exports = {
  // Cria uma nova empresa
  async create(req, res) {
    let { email, password, name, cnpj, phone, address, city, state, zipcode } = req.body

    // Encrypt password
    const hash = await bcrypt.hash(password, 16)
    password = hash

    const [company, inserted] = await Company.findOrCreate({
      where: { email },
      defaults: { email, password, name, cnpj, phone, address, city, state, zipcode }
    })

    if (!inserted) {
      return res.status(409).json({ cod_return: 409, message: "This email already exist." })
    }

    const token = tokenGenerate({ id: company.id })

    return res.status(200).json({ token })
  },

  // Lista as informações de uma empresa
  async listOne(req, res) {
    const company_id = req.userId

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    return res.status(200).json(company)
  },

  // Lista todas as empresas
  async listAll(req, res) {
    const companies = await Company.findAll()

    return res.status(200).json(companies)
  },

  // Atualiza as informações de uma empresa
  async update(req, res) {
    const company_id = req.userId
    const { email, name, cnpj, phone, address, city, state, zipcode } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const [updated] = await Company.update({ email, name, cnpj, phone, address, city, state, zipcode }, { where: { id: company_id } })
    if (!updated) {
      return res.status(400).json({ cod_return: 400, message: "Error in update company." })
    }

    return res.status(200).json({ cod_return: 200, message: "Company updated successfully." })
  },

  // Remove uma empresa
  async delete(req, res) {
    const company_id = req.userId
    const { id } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const deleted = await Company.destroy({ where: { id } })
    if (!deleted) {
      return res.status(400).json({ cod_return: 400, message: "Error in delete company." })
    }

    return res.status(200).json({ cod_return: 200, message: "Company deleted successfully." })
  },

  // Realiza o login da empresa
  async login(req, res) {
    const { email, password } = req.body

    let company = await Company.findOne({ where: { email } })

    if (!company)
      return res.status(402).json({ cod_return: 402, message: "Email or password incorrect." })

    if (!await bcrypt.compare(password, company.password)) {
      return res.status(402).json({ cod_return: 402, message: "Email or password incorrect." })
    }

    company.password = undefined // Exclude password

    const token = tokenGenerate({ id: company.id })

    return res.status(200).json({ token })
  },

  // Lista todos os usuários
  async listUsers(req, res) {
    const users = await User.findAll()

    res.json(users)
  },

  // Lista todos os usuários
  async listSales(req, res) {
    const { companyId: company_id } = req

    const company = await Company.findByPk(company_id)
    if (!company)
      res.status(400).json({ message: "Company not found." })

    const orders = await Order.findAll({ include: { association: "user" } })
    const sales = []
    orders.forEach(order => {
      const { id, user } = order
      const { address, payment, products } = order.buy_info
      products.forEach(product => (product.company_id === company_id) && sales.push({ id, user, address, payment, product }))
    })

    return res.status(200).json(sales)
  },

  // Lista todos os produtos
  async listProducts(req, res) {
    const { companyId: company_id } = req
    const products = await Product.findAll({
      where: { company_id },
      include: [
        {
          association: "product_category",
          include: { association: "category" }
        },
        {
          association: "images"
        }
      ]
    })

    res.json(products)
  }
}