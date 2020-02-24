const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "..", "tmp", "img", "user"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "..", "tmp", "img", "user"))
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