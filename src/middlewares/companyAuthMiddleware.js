const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth")

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).json({ cod_return: 401, message: "No token provided" })

  const parts = authHeader.split(' ')

  if (!parts.length === 2)
    return res.status(401).send({ cod_return: 401, message: "Token error" })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ cod_return: 401, message: "Token malformatted" })


  jwt.verify(token, authConfig.company_secret, (err, decoded) => {
    if (err)
      return res.status(401).json({ cod_return: 401, message: "Token invalid" })

    req.companyId = decoded.id
    return next()
  })
}