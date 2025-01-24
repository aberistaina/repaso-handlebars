import { Router } from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById } from "../controllers/productos.controllers.js"
import { verificarToken } from "../middlewares/login.middlewares.js"

const router = Router()

router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/", verificarToken, createProduct)
router.delete("/:id", deleteProduct)

export default router