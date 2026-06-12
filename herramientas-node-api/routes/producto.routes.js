const express = require("express")
const router = express.Router()
const productoController = require("../controllers/producto.controller")
const { authenticate, authorize } = require("../middleware/auth.middleware")

router.use(authenticate)

router.get("/", productoController.list)
router.get("/:id", productoController.getById)
router.post("/", authorize("admin"), productoController.create)
router.put("/:id", authorize("admin"), productoController.update)
router.delete("/:id", authorize("admin"), productoController.remove)

module.exports = router
