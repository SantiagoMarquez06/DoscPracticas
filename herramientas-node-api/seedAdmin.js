require("dotenv").config()
const { sequelize, User } = require("./models")

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@admin.com"
    const adminPassword = process.env.ADMIN_PASSWORD || "admin"

    if (typeof sequelize.ensureDatabase === "function") {
      await sequelize.ensureDatabase()
    }

    await sequelize.authenticate()
    console.log("Conectado a la base de datos.")

    await sequelize.sync({ alter: process.env.DB_SYNC_ALTER === "true" })

    const adminExists = await User.findOne({ where: { email: adminEmail } })

    if (adminExists) {
      console.log(`El usuario ${adminEmail} ya existe.`)
      adminExists.rol = "admin"
      adminExists.password = adminPassword
      adminExists.changed("password", true)
      await adminExists.save()
      console.log("Rol y contrasena actualizados exitosamente.")
    } else {
      await User.create({
        email: adminEmail,
        password: adminPassword,
        rol: "admin",
      })
      console.log(`Usuario admin creado: ${adminEmail}`)
    }
  } catch (error) {
    console.error("Error al crear el admin:", error)
  } finally {
    process.exit(0)
  }
}

seedAdmin()
