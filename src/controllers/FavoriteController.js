const Cart = require("../models/Cart")
const User = require("../models/User")
const Product = require("../models/Product")
const Favorite = require("../models/Favorite")

module.exports = {
  // Marca produtos como favorito para o usuário
  async store(req, res) {
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

    const [productInserted, inserted] = await Favorite.findOrCreate({
      where: { user_id, product_id },
      defaults: { user_id, product_id }
    })

    if (inserted)
      return res.status(200).json({ cod_return: 200, message: "Product inserted successfully.", data: productInserted })

    return res.status(200).json({ cod_return: 400, message: "This product is already mark with favorite.", data: productInserted })
  },

  // Lista todos os produtos favoritados pelo usuário
  async list(req, res) {
    const user_id = req.userId

    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Product,
          as: "favorite_products",
          include: { association: "images" },
          through: {
            attributes: ["quantity", "freight", "term"],
          }
        }
      ]
    })

    if (!user)
      return res.status(400).json({ cod_return: 400, message: "User not found." })

    return res.status(200).json(user.favorite_products)
  },

  // Remove um produto marcado como favorito
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

    const deleted = await Favorite.destroy({ where: { user_id, product_id } }) // Remove product

    if (!deleted)
      return res.status(400).json({ cod_return: 400, message: "This product is not in mark with favorite." })

    return res.status(200).json({ cod_return: 200, message: "Produdct deleted successfully" })
  },
}