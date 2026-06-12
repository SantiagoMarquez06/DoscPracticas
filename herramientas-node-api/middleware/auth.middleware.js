const jwt = require("jsonwebtoken")
const { UnauthorizedError, ForbiddenError } = require("../utils/errors")

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
      throw new UnauthorizedError("No token provided")
    }

    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    next(new UnauthorizedError("Invalid token"))
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError("Not authenticated"))
    }
    if (!roles.includes(req.user.rol)) {
      return next(new ForbiddenError("Insufficient permissions"))
    }
    next()
  }
}

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
  return { accessToken, refreshToken }
}

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = {
  authenticate,
  authorize,
  generateToken,
  verifyToken,
  JWT_SECRET,
}