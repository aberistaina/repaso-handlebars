import Sequelize from "sequelize"

//Conexión base de datos

const sequelize = new Sequelize("handlebars", "postgres", "6108", {
    host: "localhost",
    dialect: "postgres",
    pool:{
        max:5,
        min: 0
    }
})

export default sequelize