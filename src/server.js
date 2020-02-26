require("dotenv").config()

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
server.use("/files", express.static(path.resolve(__dirname, "..", "tmp", "uploads")))
server.use(routes)

server.listen(process.env.PORT || 3333)