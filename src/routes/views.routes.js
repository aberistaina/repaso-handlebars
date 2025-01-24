import { Router } from "express"
import { viewHomePage, viewProductsPage } from "../controllers/views.controllers.js"

const router = Router()

router.get("/", viewHomePage)
router.get("/productos", viewProductsPage)

export default router