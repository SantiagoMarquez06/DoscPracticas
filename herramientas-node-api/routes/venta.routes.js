const express = require("express")
const router = express.Router()
const ventaController = require("../controllers/venta.controller")
const { authenticate, authorize } = require("../middleware/auth.middleware")

router.use(authenticate)

router.get("/", ventaController.list)
router.get("/:id", ventaController.getById)
router.post("/", authorize("admin"), ventaController.create)
router.delete("/:id", authorize("admin"), ventaController.remove)

module.exports = router
