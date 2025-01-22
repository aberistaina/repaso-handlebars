import Usuarios  from "../models/Usuarios.models.js"
import bcrypt from "bcrypt"

export const createUser = async(req, res) =>{
    
    try {
        const { nombre, apellido, email, password} = req.body
        const hash = bcrypt.hashSync(password, 10)

        const usuario = await Usuarios.findOne({
            where:{
                email
            }
        })

        if(!nombre || !apellido || !email || !password){
            return res.status(400).json({
                code: 400,
                message: "Todos los campos son requeridos",
                
            })
        }

        if(usuario){
            return res.status(400).json({
                code: 400,
                message: "Ya hay un usuario registrado con ese correo electrónico",
                
            })
        }

        
        const nuevoUsuario = await Usuarios.create({
            nombre, 
            apellido,
            email,
            password: hash
        })

        res.status(201).json({
            code: 201,
            message: "Usuario creado correctamente",
            data: nuevoUsuario
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}

export const getAllusers = async(req, res) =>{
    try {
        const allUsers = await Usuarios.findAll({
            attributes:["id", "nombre", "apellido", "email"]
        })
        res.status(200).json({
            code: 200,
            message: "Usuarios encontrados con éxito",
            data: allUsers
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}

export const getUserByEmail = async(req, res) =>{
    try {
        const { email } = req.params
        const user = await Usuarios.findOne(
            {
            attributes:["id", "nombre", "apellido", "email"]
        },
        {where:{
            email
        }}
    )
        res.status(200).json({
            code: 200,
            message: "Usuario encontrado con éxito",
            data: user
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}