import jwt from "jsonwebtoken"
import Usuarios from "../models/Usuarios.models.js"
import bcrypt from "bcrypt"

export const emitirToken = async(req, res, next) =>{
    try {
        let {email, password } = req.body

        let usuario = await Usuarios.findOne({
            attributes: ["id", "nombre", "email", "admin", "password"],
            where:{
                email
            }
        })
        if (!usuario){
            return res.json({code:400, message: "Email o Password Incorrecto",})
        }

        let validacionPassword = bcrypt.compare(password, usuario.password)
        
        if(!validacionPassword){
            return res.json({code:400, message: "Email o Password Incorrecto",})
        }else{
            delete usuario.password
        }

        let token = jwt.sign({
            data: usuario,
        },
        "secreto",
        {expiresIn : "1h"}
        )
        req.token = token
        req.usuario = usuario
        next()

    } catch (error) {
        res.status(500).json({code: 500, message: "Error en el proceso de autenticación"})
    } 

}

const verificacionToken = (token) =>{
    return new Promise((resolve, reject) => {
        jwt.verify(token, "secreto",(error, decoded) =>{
            if(error){
                reject({
                    code: 401,
                    message: "El token proporcionado no fue emitido por el servidor, fue adulterado o está caducado"
                })
                
            }
            resolve(decoded)
        })
    })
}

export const verificarToken = async(req, res, next) =>{

    try {
        let {authorization} = req.headers
        let {token} = req.query
        let dataToken;
    
        if(authorization){
            let token = authorization.split(" ")[1]
            dataToken = await verificacionToken(token)
            
        }else if(token){
            dataToken = await verificacionToken(token)
        }else{
            return res.status(401).json({code:401, message: error})
        }

        req.usuario = dataToken.data
        next()
        
        
    } catch (error) {
        console.log(error)
        let code = 500
        let errorMessage = "Error el en proceso de autenticación"
        if(error.code){
            code = error.code
            errorMessage = error.message
        }
        res.status(code).json({code: code, message: errorMessage})
    }
}