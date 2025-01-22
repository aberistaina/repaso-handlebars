export const login = async(req, res) =>{
    try {

        res.status(200).json({
            code: 200,
            message: "Login Exitoso",
            usuario: req.usuario,
            token: req.token
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Ha ocurrido un error interno en el servidor"
        })
    }
}