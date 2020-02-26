const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
const mkdirp = require('mkdirp')

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "..", "tmp", "img", "product"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.resolve(__dirname, "..", "..", "..", "tmp", "img", "product")
      mkdirp(dir, err => cb(err, dir))

      // cb(null, path.resolve(__dirname, "..", "..", "..", "tmp", "img", "product"))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err)
          cb(err)

        file.id = hash.toString("hex")
        const filename = `${file.id}-${file.originalname}`

        cb(null, filename)
      })
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/webp"
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type."))
    }
  }
}