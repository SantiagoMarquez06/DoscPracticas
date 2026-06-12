const express = require("express")
const router = express.Router()
const clienteController = require("../controllers/cliente.controller")
const { authenticate, authorize } = require("../middleware/auth.middleware")

router.use(authenticate)

router.get("/", clienteController.list)
router.get("/:id", clienteController.getById)
router.post("/", authorize("admin"), clienteController.create)
router.put("/:id", authorize("admin"), clienteController.update)
router.delete("/:id", authorize("admin"), clienteController.remove)

module.exports = router
