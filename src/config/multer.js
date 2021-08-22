const multer = require("multer")
const multerS3 = require("multer-s3")
const aws = require("aws-sdk")
const path = require("path")
const crypto = require("crypto")
const mkdirp = require('mkdirp')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.resolve(__dirname, "..", "..", "tmp", "uploads")
      mkdirp(dir, err => cb(err, dir))

      // cb(null, path.resolve(__dirname, "..", "..", "..", "tmp", "img", "user"))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err)
          cb(err)

        file.id = hash.toString("hex")
        file.key = `${file.id}-${file.originalname}`

        cb(null, file.key)
      })
    }
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: "my-fashion-upload",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err)
          cb(err)

        file.id = hash.toString("hex")
        const filename = `${file.id}-${file.originalname}`

        cb(null, filename)
      })
    }
  })
}

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[process.env.STORAGE_TYPE],
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