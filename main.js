import app from "./src/app.js"
import db from "./src/config/database.js"

//Modelos
import "./src/models/Usuarios.models.js"

//Levantar Servidor y conectar a la base de datos

const PORT = 3000
const main = async ()=>{
    try {
        await db.authenticate()
        console.log("Conexión a la base de datos establecida correctamente 💾");
        await db.sync({ force: false, alter: false })
        app.listen(PORT, () =>{
            console.log(`Servidor escuchando en el puerto: ${PORT} 🚀`);
        })
    } catch (error) {
        console.log("Ha Ocurrido un error", error);
    }
}

main()