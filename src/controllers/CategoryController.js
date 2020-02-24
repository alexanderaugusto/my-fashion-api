const Company = require("../models/Company")
const Category = require("../models/Category")

module.exports = {
  // Cria uma nova categoria
  async create(req, res) {
    const company_id = req.companyId
    const { categories } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const category = await Category.bulkCreate(categories)

    return res.status(200).json(category)
  },

  // Lista as informações de uma categoria
  async listOne(req, res) {
    const { id } = req.query

    const category = await Category.findByPk(id, {
      include: { association: "subcategories" }
    })

    return res.status(200).json(category)
  },

  // Lista todas as categorias
  async listAll(req, res) {
    const categories = await Category.findAll()

    return res.status(200).json(categories)
  },

  // Atualiza as informações de uma categoria
  async update(req, res) {
    const company_id = req.companyId
    const { id, name, image } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const [updated] = await Category.update({ name, image }, { where: { id } })
    if (!updated) {
      return res.status(400).json({ cod_return: 400, message: "Error in update category." })
    }

    return res.status(200).json({ cod_return: 200, message: "Category updated successfully." })
  },

  // Remove uma categoria
  async delete(req, res) {
    const company_id = req.companyId
    const { id } = req.body

    const company = await Company.findByPk(company_id)
    if (!company) {
      return res.status(400).json({ cod_return: 400, message: "Company not found." })
    }

    const deleted = await Category.destroy({ where: { id } })
    if (!deleted) {
      return res.status(400).json({ cod_return: 400, message: "Error in delete category." })
    }

    return res.status(200).json({ cod_return: 200, message: "Category deleted successfully." })
  },
}