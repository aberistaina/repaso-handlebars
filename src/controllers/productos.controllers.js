import Productos from "../models/Productos.model.js"

export const createProduct = async(req, res) =>{
    
    try {
        const { nombre, marca, stock, precio} = req.body

        const producto = await Productos.findOne({
            where:{
                nombre
            }
        })

        if(!nombre || !marca || !stock || !precio){
            return res.status(400).json({
                code: 400,
                message: "Todos los campos son requeridos",
                
            })
        }

        if(producto){
            return res.status(400).json({
                code: 400,
                message: "Ya hay un producto con este nombre",
                
            })
        }

        
        const nuevoProducto = await Productos.create({
            nombre, 
            marca,
            stock,
            precio
        })

        res.status(201).json({
            code: 201,
            message: "Producto creado correctamente",
            data: nuevoProducto
            
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}

export const getAllProducts = async(req, res) =>{
    try {
        const allProducts = await Productos.findAll()
        
        if(allProducts.length === 0){
            return res.status(400).json({
                code: 400,
                message: "no existen productos en la base de datos",
                
            })
        }
        res.status(200).json({
            code: 200,
            message: "Productos encontrados con éxito",
            data: allProducts
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}

export const getProductById = async(req, res) =>{
    try {
        const { id } = req.params
        const producto = await Productos.findOne( {where:{ id }} )

        if(!producto){
            return res.status(400).json({
                code: 400,
                message: `No existe ningún producto con la id: ${id} en la base de datos`,
                
            })
        }

        
        res.status(200).json({
            code: 200,
            message: "producto encontrado con éxito",
            data: producto
            
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}

export const deleteProduct = async(req, res) =>{
    try {
        const { id } = req.params
        await Productos.destroy( {where:{ id }} )
        res.status(200).json({
            code: 200,
            message: "producto eliminado con éxito",

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}