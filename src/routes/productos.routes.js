import { Router } from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById } from "../controllers/productos.controllers.js"

const router = Router()

router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/", createProduct)
router.delete("/:id", deleteProduct)

export default router