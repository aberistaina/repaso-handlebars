import express from "express"
import cors from "cors"
import { create } from "express-handlebars"

import * as path from "path"
import { fileURLToPath } from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))


import productosRoutes from "./routes/productos.routes.js"
import usuariosRoutes from "./routes/usuarios.routes.js"
import viewsRoutes from "./routes/views.routes.js"


//Instancia de express
const app = express()

//Configuración de Handlebars
const hbs = create({partialsDir:[path.resolve(__dirname, "views/partials/")]}) 

//Configuración Motor de handlebars
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views")) 


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//Carpeta Publica
app.use("/public", express.static(__dirname + "/public"))

//Endpoints API
app.use("/api/v1/productos", productosRoutes) 
app.use("/api/v1/usuarios", usuariosRoutes )

//Vistas
/* app.use("/", viewsRoutes) */

//Todos los demás
/* app.all("*", (req, res) =>{
    res.render("error"),{
        layout: "error404"
    }
}) */

export default app