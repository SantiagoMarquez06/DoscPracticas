const { Producto, Categoria, Cliente, Venta, DetalleVenta } = require("../models")
const { Op } = require("sequelize")

exports.getEstadisticas = async (req, res, next) => {
  try {
    const productos = await Producto.count()
    const categorias = await Categoria.count()
    const clientesTotales = await Cliente.count()
    const ventasTotales = await Venta.sum("total") || 0

    const productosBajoStock = await Producto.findAll({
      where: {
        stock: {
          [Op.lt]: 10
        }
      },
      limit: 5,
      order: [["stock", "ASC"]]
    })

    const ventasRecientes = await Venta.findAll({
      include: [
        { model: Cliente, as: "cliente" },
        { model: DetalleVenta, as: "detalles", include: [{ model: Producto, as: "producto" }] }
      ],
      limit: 5,
      order: [["fecha", "DESC"]]
    })

    res.json({
      productos,
      categorias,
      clientesTotales,
      ventasTotales,
      productosBajoStock,
      ventasRecientes
    })
  } catch (error) {
    next(error)
  }
}
