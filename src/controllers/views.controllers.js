import Productos from "../models/Productos.model.js";

export const viewHomePage = async(req, res) =>{
    try {
        const nombre = req.query.nombre
        const productos = await Productos.findAll({raw: true})

        let productosFiltrados = []

        if(productos && nombre){
            productosFiltrados = productos.filter(producto => 
                producto.nombre.toLowerCase().includes(nombre.toLowerCase())
            )
        }else{
            productosFiltrados = productos
        }

        res.render("pages/homepage", {
            productos: productosFiltrados
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}

export const viewProductsPage = async(req, res) =>{
    try {
        const productos = await Productos.findAll({raw: true})

        res.render("pages/productspage", {
            productos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}