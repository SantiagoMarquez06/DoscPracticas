const { Sequelize } = require("sequelize")
require("dotenv").config()

const dbInstance = process.env.DB_INSTANCE || undefined
const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
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
)

module.exports = sequelize
