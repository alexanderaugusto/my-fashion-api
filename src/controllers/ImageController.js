const Image = require("../models/Image")

module.exports = {
  // Insere imagens de produtos no banco de dados
  async store(req, res) {
    const { files } = req

    const images = []

    files.forEach(value => {
      images.push({
        id: value.id,
        name: value.filename,
        product_cod: value.fieldname,
      })
    })

    const image = await Image.bulkCreate(images)

    if (!image)
      return res.status(400).json({ cod_return: 400, message: "Invalid user submitted information." })

    return res.status(200).json("Foi")
  },
}