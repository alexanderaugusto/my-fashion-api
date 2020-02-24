const Address = require("../models/Address")
const User = require("../models/User")

const sequelize = require("sequelize")
const Op = sequelize.Op

module.exports = {
  // Insere um novo endereço para o usuário
  async store(req, res) {
    const { zipcode, city, state, street, neighborhood, number, complement, name, phone, is_main } = req.body
    const user_id = req.userId

    const user = await User.findByPk(user_id)

    if (!user) {
      return res.status(400).json({ cod_return: 400, message: "User not found." })
    }

    const address = await Address.create({
      zipcode, city, state, street, neighborhood, number, complement,
      name, phone, is_main, user_id
    })

    if (!address)
      return res.status(400).json({ cod_return: 400, message: "Invalid user submitted information." })

    const adresses = await Address.findAll({ where: { user_id } })

    if (adresses.length === 1) {
      const addressId = adresses[0].id

      const [updated] = await Address.update({ is_main: true },
        { where: { id: addressId, user_id } })

      if (!updated)
        return res.status(500).json({ cod_return: 500, message: "Internal server error." })
    }

    return res.status(200).json(address)
  },

  // Lista os endereços do usuário
  async list(req, res) {
    const user_id = req.userId

    const user = await User.findByPk(user_id, {
      include: { association: "addresses" }
    })

    if (!user) {
      return res.status(400).json({ cod_return: 400, message: "User not found." })
    }

    return res.json(user.addresses)
  },

  // Atualiza um endereço do usuário
  async update(req, res) {
    const { id, zipcode, city, state, street, neighborhood, number, complement, name, phone,
      is_main } = req.body

    const user_id = req.userId

    const address = await Address.findByPk(id)
    if (!address) {
      return res.status(400).json({ cod_return: 400, message: "Address not found." })
    }

    const [updated] = await Address.update({ zipcode, city, state, street, neighborhood, number, complement, name, phone, is_main },
      { where: { id, user_id } })

    if (!updated)
      return res.status(400).json({ cod_return: 400, message: "This address does not belong to this user." })

    // Se o endereço que está sendo atualizado tiver o campos is_main igual a true, então todos os outros endereços
    // vão ter o campo is_main igual a falso
    const adresses = await Address.findAll({ where: { user_id } })

    if (is_main && adresses.length !== 1) {
      const [isMainUpdated] = await Address.update({ is_main: false },
        { where: { user_id, id: { [Op.ne]: id } } })

      if (!isMainUpdated)
        return res.status(400).json({ cod_return: 400, message: "Invalid user submitted information." })

      return res.status(200).json({ cod_return: 200, message: "Address updated successfully." })
    } else {
      return res.status(200).json({ cod_return: 200, message: "Address updated successfully." })
    }
  },

  // Remove um endereço do usuário
  async remove(req, res) {
    const { id } = req.body
    const user_id = req.userId

    const address = await Address.findByPk(id)
    const user = await User.findByPk(user_id)

    if (!address) {
      return res.status(400).json({ cod_return: 400, message: "Address not found." })
    }
    if (!user) {
      return res.status(400).json({ cod_return: 400, message: "User not found." })
    }

    const deleted = await Address.destroy({ where: { id, user_id } })

    if (!deleted)
      return res.status(400).json({ cod_return: 400, message: "This address does not belongs to this user." })

    if (address.is_main) {
      const adresses = await Address.findAll({
        where: { user_id }
      })

      if (adresses.length !== 0) {
        const addressId = adresses[0].id

        const [updated] = await Address.update({ is_main: true },
          { where: { id: addressId, user_id } })

        if (!updated)
          return res.status(500).json({ cod_return: 500, message: "Internal server error." })
      }
    }

    return res.status(200).json({ cod_return: 200, message: "Address deleted successfully." })
  }
}