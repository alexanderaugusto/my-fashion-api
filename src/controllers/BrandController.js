const Company = require("../models/Company")
const Brand = require("../models/Brand")

module.exports = {
  // Cria uma nova marca
  async create(req, res) {
    const company_id = req.companyId
    const { brands } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const brand = await Brand.bulkCreate(brands)

    return res.status(200).json(brand)
  },

  // Lista as informações de uma marca
  async listOne(req, res) {
    const { id } = req.query

    const brand = await Brand.findByPk(id)

    return res.status(200).json(brand)
  },

  // Lista todas as marcas
  async listAll(req, res) {
    const brands = await Brand.findAll()

    return res.status(200).json(brands)
  },

  // Atualiza as informações de uma marca
  async update(req, res) {
    const company_id = req.companyId
    const { id, name, image } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const [updated] = await Brand.update({ name, image }, { where: { id } })
    if (!updated) {
      return res.status(400).json({ cod_return: 400, message: "Error in update brand." })
    }

    return res.status(200).json({ cod_return: 200, message: "Brand updated successfully." })
  },

  // Remove uma marca
  async delete(req, res) {
    const company_id = req.companyId
    const { id } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const deleted = await Brand.destroy({ where: { id } })
    if (!deleted) {
      return res.status(400).json({ cod_return: 400, message: "Error in delete brand." })
    }

    return res.status(200).json({ cod_return: 200, message: "Brand deleted successfully." })
  },
}