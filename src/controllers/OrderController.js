const Cart = require("../models/Cart")
const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")
const OrderProduct = require("../models/OrderProduct")
const Status = require("../models/Status")

module.exports = {
  // Cria um novo pedido para o usuário
  async create(req, res) {
    // const { status, buy_info, buy_freight, buy_term, discount, products } = req.body
    const { buy_info } = req.body
    const { products } = buy_info
    const user_id = req.userId

    const user = await User.findByPk(user_id)
    if (!user) {
      return res.status(400).json({ cod_return: 400, message: "User not found." })
    }

    // Check if any product has sold out
    let error = false
    for (const [idx, element] of products.entries()) {
      const product = await Product.findByPk(element.id)

      if (!product)
        error = element.id
    }
    if (error)
      return res.status(400).json({ cod_return: 400, message: "This product has sold out", product_id: error })

    // Create a new order for this user
    const order = await Order.create({ buy_info, user_id })
    if (!order)
      return res.status(500).json({ cod_return: 400, message: "Error in create order" })

    // Add products for the order 
    const productsToInsert = []
    products.forEach(product => {
      const { buy_quantity, buy_freight, buy_term, discount, id: product_id, status_id } = product
      productsToInsert.push({
        buy_quantity, buy_freight, buy_term, discount, product_id, order_id: order.id,
        status_id, buy_date: new Date()
      })
    })
    const inserted = await OrderProduct.bulkCreate(productsToInsert)
    if (!inserted)
      return res.status(500).json({ cod_return: 400, message: "Error in checkout add produts for the order" })

    // Decrement product quantity
    for (const [idx, element] of products.entries()) {
      const new_quantity = element.quantity - element.buy_quantity
      await Product.update({ quantity: new_quantity }, { where: { id: element.id } })
    }

    // Remove cart products
    await Cart.destroy({ where: { user_id } })

    return res.status(200).json(order.id)
  },

  // Lista todos os pedidos 
  async listAll(req, res) {
    const orders = await Order.findAll()

    return res.status(200).json(orders)
  },

  // Lista todos os pedidos do usuário
  async userListAll(req, res) {
    const user_id = req.userId

    const user = await User.findByPk(user_id, {
      include: {
        association: "orders"
      }
    })

    if (!user)
      return res.status(400).json({ cod_return: 400, message: "User not found." })

    return res.status(200).json(user.orders)
  },

  async updateStatus(req, res) {
    const { order_id, status } = req.body

    let send_date = undefined
    let delivery_date = undefined

    if (status === "enviado")
      send_date = new Date()

    else if (status === "recebido")
      delivery_date = new Date()

    const [updated] = await Order.update({ status, send_date, delivery_date }, { where: { id: order_id } })

    if (!updated)
      return res.status(400).json({ cod_return: 400, message: "Error in try to update status." })

    return res.status(200).json({ cod_return: 200, message: "status updated successfully." })
  },

  async createStatus(req, res) {
    const { name } = req.body

    const status = await Status.create({ name })

    return res.status(200).json(status)
  },

  async listStatus(req, res) {
    const status = await Status.findAll()

    res.status(200).json(status)
  }
}