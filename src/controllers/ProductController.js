const Product = require("../models/Product")
const Image = require("../models/Image")
const Company = require("../models/Company")

const sequelize = require("sequelize")
const Op = sequelize.Op

const { getFreightInfo } = require("../utils/functions")

module.exports = {
  // Insere um produto no banco de dados
  async storeOne(req, res) {
    let { product } = req.body
    const { files, companyId: company_id } = req

    const company = await Company.findByPk(company_id)
    if (!company)
      return res.status(400).json({ cod_return: 400, message: "Company not found." })

    product = JSON.parse(product)
    product.company_id = company_id

    const product_inserted = await Product.create(product)

    if (!product_inserted)
      return res.status(400).json({ cod_return: 400, message: "Invalid user submitted information." })

    const images = []
    files.forEach(file => {
      images.push({
        id: file.id,
        name: file.key,
        product_id: product_inserted.id
      })
    })

    const images_inserted = await Image.bulkCreate(images)

    return res.status(200).json({ product_inserted, images_inserted })
  },

  // Altera as informações de um produto no banco de dados
  async update(req, res) {
    let { product, images_to_delete } = req.body
    const { files, companyId: company_id } = req

    const company = await Company.findByPk(company_id)
    if (!company)
      return res.status(400).json({ cod_return: 400, message: "Company not found." })

    product = JSON.parse(product)
    product.company_id = company_id
    images_to_delete = JSON.parse(images_to_delete)

    // Update product
    const [updated] = await Product.update(product, { where: { id: product.id } })
    if (!updated)
      return res.status(400).json({ cod_return: 400, message: "Invalid user submitted information." })

    // Insert new images for product
    const images = []
    files.forEach(file => {
      images.push({
        id: file.id,
        name: file.filename,
        product_id: product.id
      })
    })
    const images_inserted = await Image.bulkCreate(images)

    return res.status(200).json({ product, images_inserted })
  },

  // Lista todos os produtos
  async listAll(req, res) {
    const products = await Product.findAll({
      include: [
        { association: "images" },
        { association: "product_category", include: { association: "category" } },
        { association: "product_brand" },
        { association: "company" }
      ],
    })

    if (!products)
      return res.status(500).json({ cod_return: 500, message: "Internal server error." })

    return res.status(200).json(products)
  },

  // Lista todas as informações de um produto
  async listOne(req, res) {
    const { id } = req.query

    const product = await Product.findByPk(id, {
      include: [
        { association: "images" },
        { association: "product_category", include: { association: "category" } },
        { association: "product_brand" },
        { association: "company" }
      ],
    })

    if (!product)
      return res.status(400).json({ cod_return: 400, message: "Product not found." })

    return res.status(200).json(product)
  },

  // Lista os produtos pela categoria
  async listProductsByCategory(req, res) {
    const { product_category } = req.query

    const products = await Product.findAll({
      include: [
        { association: "images" },
        { association: "product_category", include: { association: "category" } },
        { association: "product_brand" },
        { association: "company" }
      ],
      where: { category: product_category },
    })

    if (!products)
      return res.status(400).json({ cod_return: 400, message: "Invalid user submitted information." })

    return res.status(200).json(products)
  },

  // Lista offertas relacionadas a um determinado produto
  async listProductOffers(req, res) {
    const { product_category, product_id } = req.query

    const products = await Product.findAll({
      include: [
        { association: "images" },
        { association: "product_category", include: { association: "category" } },
        { association: "product_brand" },
        { association: "company" }
      ],
      where: { category_id: product_category, id: { [Op.ne]: product_id } },
    })

    if (!products)
      return res.status(400).json({ cod_return: 400, message: "Invalid user submitted information." })

    return res.status(200).json(products)
  },

  // Calcula o frete e prazo de um determinado produto
  async freightCalculator(req, res) {
    const { product, cep_dest } = req.body
    const { zipcode: cep_origin } = product.company

    let Correios = require('node-correios')
    let correios = new Correios()

    // Attributes
    let args = {
      nCdServico: "04510", // PAC
      sCepOrigem: cep_origin.replace("-", ""),
      sCepDestino: cep_dest.replace("-", ""),
      nVlPeso: "0.5",
      nCdFormato: 1,
      nVlComprimento: 30,
      nVlAltura: 10,
      nVlLargura: 20,
      nVlDiametro: 10,
      mode: 'no-cors'
    }

    await correios.calcPrecoPrazo(args)
      .then((items) => {
        res.status(200).json(getFreightInfo(items))
      })
      .catch(() => res.status(500).json({ cod_return: 500, message: "Error in server." }))
  },

  // Retorna um array de produtos baseado na pesquisa do usuário
  async searchProduct(req, res) {
    const { string } = req.query

    const products = await Product.findAll({
      include: [
        { association: "images" },
        { association: "product_category", include: { association: "category" } },
        { association: "product_brand" },
        { association: "company" }
      ],

      where: {
        [Op.or]: [
          { title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + string + '%'), },
        ]
      }
    })

    if (!products)
      return res.status(400).json({ cod_return: 400, message: "Invalid user submitted information." })

    return res.status(200).json(products)
  },

  // Delete um produto do banco de dados
  async delete(req, res) {
    const { companyId: company_id } = req
    const { id } = req.body

    const company = await Company.findByPk(company_id)
    if (!company)
      return res.status(400).json({ cod_return: 400, message: "Company not found." })

    await Product.destroy({ where: { id } })

    res.status(200).json({ cod_return: 200, message: "Product was deleted successfully." })
  }
}