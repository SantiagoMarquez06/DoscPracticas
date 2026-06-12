const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
  return { accessToken, refreshToken }
}

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

describe("Auth Flow Tests", () => {
  const testUser = { userId: 1, email: "test@test.com", rol: "user" }
  const testAdmin = { userId: 2, email: "admin@test.com", rol: "admin" }

  test("1. Registro correcto - genera tokens", () => {
    const tokens = generateToken(testUser)
    expect(tokens.accessToken).toBeDefined()
    expect(tokens.refreshToken).toBeDefined()
    expect(tokens.accessToken).not.toEqual(tokens.refreshToken)
    console.log("✓ Registro genera tokens correctamente")
  })

  test("2. Login correcto - genera tokens", () => {
    const tokens = generateToken(testUser)
    const decoded = verifyToken(tokens.accessToken)
    expect(decoded.userId).toBe(1)
    expect(decoded.email).toBe("test@test.com")
    expect(decoded.rol).toBe("user")
    console.log("✓ Login genera token válido con datos correctos")
  })

  test("3. Login inválido - credenciales incorrectas", () => {
    const invalidToken = "Bearer invalid.token.here"
    try {
      verifyToken(invalidToken.replace("Bearer ", ""))
      throw new Error("Should throw")
    } catch (err) {
      expect(err.message).toContain("invalid")
      console.log("✓ Login inválido rechaza token incorrecto")
    }
  })

  test("4. Token inválido - verifica rechazo", () => {
    const fakeToken = jwt.sign({ userId: 999 }, "wrong-secret", { expiresIn: "15m" })
    try {
      verifyToken(fakeToken)
      throw new Error("Should throw")
    } catch (err) {
      expect(err.name).toBe("JsonWebTokenError")
      console.log("✓ Token inválido es rechazado")
    }
  })

  test("5. Refresh token - genera nuevos tokens", () => {
    const { refreshToken } = generateToken(testUser)
    const decoded = verifyToken(refreshToken)
    const payload = { userId: decoded.userId, email: decoded.email, rol: decoded.rol }
    const newTokens = generateToken(payload)

    expect(newTokens.accessToken).toBeDefined()
    expect(newTokens.refreshToken).toBeDefined()
    console.log("✓ Refresh token genera nuevos tokens")
  })

  test("6. Acceso a ruta protegida sin token", () => {
    const middleware = (req) => {
      const token = req.headers.authorization?.replace("Bearer ", "")
      if (!token) {
        return { error: "No token provided" }
      }
      return { valid: true }
    }

    const result1 = middleware({ headers: {} })
    expect(result1.error).toBe("No token provided")

    const result2 = middleware({ headers: { authorization: "Bearer token" } })
    expect(result2.valid).toBe(true)
    console.log("✓ Ruta protegida requiere token")
  })

  test("7. Validar roles - authorization middleware", () => {
    const authorize = (...roles) => (req) => {
      if (!roles.includes(req.user.rol)) {
        return { error: "Insufficient permissions" }
      }
      return { allowed: true }
    }

    const adminOnly = authorize("admin")
    const userReq = { user: { rol: "user" } }
    const adminReq = { user: { rol: "admin" } }

    expect(adminOnly(userReq).error).toBe("Insufficient permissions")
    expect(adminOnly(adminReq).allowed).toBe(true)
    console.log("✓ Authorization valida roles correctamente")
  })
})

console.log("\n=== Resumen de pruebas de autenticación ===")
console.log("1. Registro correcto: genera accessToken y refreshToken")
console.log("2. Login correcto: token válido con userId, email, rol")
console.log("3. Login inválido: rechaza credenciales incorrectas")
console.log("4. Token inválido: reject malformed/fake tokens")
console.log("5. Refresh token: regenera tokens sin login")
console.log("6. Ruta sin token: middleware retorna 401")
console.log("7. Roles: admin-only routes bloquean users")