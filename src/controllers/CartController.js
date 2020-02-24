const Cart = require("../models/Cart")
const User = require("../models/User")
const Product = require("../models/Product")

module.exports = {
  // Insere produtos no carrinho do usuário
  async store(req, res) {
    const { product_id, quantity } = req.body
    const user_id = req.userId

    const user = await User.findByPk(user_id)
    const product = await Product.findByPk(product_id)

    if (!user) {
      return res.status(400).json({ cod_return: 400, message: "User not found." })
    }
    if (!product) {
      return res.status(400).json({ cod_return: 400, message: "Product not found." })
    }

    const [productInserted, inserted] = await Cart.findOrCreate({
      where: { product_id, user_id },
      defaults: { quantity, user_id, product_id }
    })

    if (inserted)
      return res.status(200).json({ cod_return: 200, message: "Product inserted successfully.", data: productInserted })

    return res.status(200).json({ cod_return: 400, message: "This product is already in cart.", data: productInserted })
  },

  // Lista todos os produtos do carrinho do usuário
  async list(req, res) {
    const user_id = req.userId

    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Product,
          as: "cart_products",
          include: [
            { association: "images" },
            { association: "product_category", include: { association: "category" } },
            { association: "product_brand" },
            { association: "company" }
          ],
          through: {
            attributes: ["quantity", "freight", "praze", "discount"],
          }
        }
      ]
    })

    if (!user)
      return res.status(400).json({ cod_return: 400, message: "User not found." })

    return res.status(200).json(user.cart_products)
  },

  // Remove um produto do carrinho do usuário
  async removeProduct(req, res) {
    const { product_id } = req.body
    const user_id = req.userId

    const user = await User.findByPk(user_id)
    const product = await Product.findByPk(product_id)

    if (!user) {
      return res.status(400).json({ cod_return: 400, message: "User not found." })
    }
    if (!product) {
      return res.status(400).json({ cod_return: 400, message: "Product not found." })
    }

    const deleted = await Cart.destroy({ where: { user_id, product_id } }) // Remove product

    if (!deleted)
      return res.status(400).json({ cod_return: 400, message: "This product is not in cart." })

    return res.status(200).json({ cod_return: 200, message: "Product deleted successfully" })
  },

  // Altera a informações do produto no carrinho
  async updateInfo(req, res) {
    const { product_id, quantity } = req.body
    const user_id = req.userId

    const user = await User.findByPk(user_id)
    const product = await Product.findByPk(product_id)

    if (!user) {
      return res.status(400).json({ cod_return: 400, message: "User not found." })
    }
    if (!product) {
      return res.status(400).json({ cod_return: 400, message: "Product not found." })
    }

    const [updated] = await Cart.update({ quantity }, { where: { user_id, product_id } })

    if (!updated)
      return res.status(400).json({ cod_return: 400, message: "This product is not in cart." })

    return res.status(200).json({ cod_return: 200, message: "Cart updated successfully" })
  }
}