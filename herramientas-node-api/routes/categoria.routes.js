const express = require("express")
const router = express.Router()
const categoriaController = require("../controllers/categoria.controller")
const { authenticate, authorize } = require("../middleware/auth.middleware")

router.use(authenticate)

router.get("/", categoriaController.list)
router.get("/:id", categoriaController.getById)
router.post("/", authorize("admin"), categoriaController.create)
router.put("/:id", authorize("admin"), categoriaController.update)
router.delete("/:id", authorize("admin"), categoriaController.remove)

module.exports = router
