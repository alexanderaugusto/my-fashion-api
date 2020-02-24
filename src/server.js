const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")

require("./database")

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())
server.use(morgan("dev"))
server.use("/img/product", express.static(path.resolve(__dirname, "..", "tmp", "img", "product")))
server.use("/img/user", express.static(path.resolve(__dirname, "..", "tmp", "img", "user")))
server.use(routes)

server.listen(process.env.PORT || 3333)