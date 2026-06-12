const { Sequelize } = require("sequelize")
require("dotenv").config()

const dbInstance = process.env.DB_INSTANCE || undefined
const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined

const baseOptions = {
        host: process.env.DB_HOST,
        port: dbInstance ? undefined : dbPort,
        dialect: process.env.DB_DIALECT || "mssql",
        logging: false,
        dialectOptions: {
            options: {
                encrypt: process.env.DB_ENCRYPT === "true",
                trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== "false",
                instanceName: dbInstance
            }
        }
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    baseOptions
)

sequelize.ensureDatabase = async () => {
    if ((process.env.DB_DIALECT || "mssql") !== "mssql") return

    const dbName = process.env.DB_NAME
    if (!dbName) return

    const master = new Sequelize("master", process.env.DB_USER, process.env.DB_PASSWORD, baseOptions)
    const safeDbName = dbName.replace(/'/g, "''")
    const bracketDbName = dbName.replace(/]/g, "]]")

    await master.authenticate()
    await master.query(`IF DB_ID(N'${safeDbName}') IS NULL CREATE DATABASE [${bracketDbName}]`)
    await master.close()
}

module.exports = sequelize
