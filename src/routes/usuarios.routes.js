import { Router } from "express"
import { createUser, getAllusers, getUserByEmail } from "../controllers/usuarios.controllers.js"
import { emitirToken } from "../middlewares/login.middlewares.js"
import { login } from "../controllers/login.controllers.js"

const router = Router()

router.post("/", createUser)
router.post("/login", emitirToken, login)
router.get("/", getAllusers)
router.get("/:email", getUserByEmail)

export default router