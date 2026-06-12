require("dotenv").config()
const { Sequelize } = require("sequelize")

const dbName = process.env.DB_NAME || "tienda"

const master = new Sequelize("master", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 1433),
  dialect: "mssql",
  logging: false,
  dialectOptions: {
    options: {
      encrypt: process.env.DB_ENCRYPT === "true",
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== "false",
    },
  },
})

async function main() {
  await master.authenticate()
  await master.query(`IF DB_ID(N'${dbName.replace(/'/g, "''")}') IS NULL CREATE DATABASE [${dbName.replace(/]/g, "]]")}]`)
  await master.close()

  const { sequelize } = require("../models")
  await sequelize.authenticate()
  const [tables] = await sequelize.query(
    "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME"
  )
  console.log("Tablas actuales:", tables.map((table) => table.TABLE_NAME).join(", ") || "ninguna")
  await sequelize.sync()
  await sequelize.close()
  console.log(`SQL Server listo. Base ${dbName} sincronizada.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
