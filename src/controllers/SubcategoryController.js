const Company = require("../models/Company")
const Subcategory = require("../models/Subcategory")

module.exports = {
  // Cria uma nova categoria
  async create(req, res) {
    const company_id = req.companyId
    const { subcategories } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const subcategory = await Subcategory.bulkCreate(subcategories)

    return res.status(200).json(subcategory)
  },

  // Lista as informações de uma categoria
  async listOne(req, res) {
    const { id } = req.query
    const subcategory = await Subcategory.findByPk(id)

    return res.status(200).json(subcategory)
  },

  // Lista todas as categorias
  async listAll(req, res) {
    const subcategories = await Subcategory.findAll()

    return res.status(200).json(subcategories)
  },

  // Atualiza as informações de uma categoria
  async update(req, res) {
    const company_id = req.companyId
    const { id, name, category_id } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const [updated] = await Subcategory.update({ name, category_id }, { where: { id } })
    if (!updated) {
      return res.status(400).json({ cod_return: 400, message: "Error in update subcategory." })
    }

    return res.status(200).json({ cod_return: 200, message: "Subcategory updated successfully." })
  },

  // Remove uma categoria
  async delete(req, res) {
    const company_id = req.companyId
    const { id } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const deleted = await Subcategory.destroy({ where: { id } })
    if (!deleted) {
      return res.status(400).json({ cod_return: 400, message: "Error in delete subcategory." })
    }

    return res.status(200).json({ cod_return: 200, message: "Subcategory deleted successfully." })
  },
}