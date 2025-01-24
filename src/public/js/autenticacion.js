//Registrar usuario

const formRegistro = document.getElementById("formRegistro")
const nombreRegistro = document.getElementById("nombreRegistro")
const apellidoRegistro = document.getElementById("apellidoRegistro")
const emailRegistro = document.getElementById("emailRegistro")
const passwordRegistro = document.getElementById("passwordRegistro")
const passwordRegistroConfirm = document.getElementById("passwordRegistroConfirm")

formRegistro.addEventListener("submit", async(e) =>{
    e.preventDefault()
    if(passwordRegistro.value != passwordRegistroConfirm.value){
        alert("Las contraseñas no coinciden")
    }else{
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
            "nombre": nombreRegistro.value,
            "apellido": apellidoRegistro.value,
            "email": emailRegistro.value,
            "password": passwordRegistro.value
            });

            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            };

            let response = await fetch("http://localhost:3000/api/v1/usuarios/", requestOptions)
            let data = await response.json()

            if (data.code === 201) {
                alert(data.message)
                location.reload()
            }
            else{
                alert(data.message)
            }
    }
    try {
        
    } catch (error) {
        console.log(error);
    }
})



//Login Usuario

const formLogin = document.getElementById("formLogin")
const emailLogin = document.getElementById("emailLogin")
const passwordLogin = document.getElementById("passwordLogin")

formLogin.addEventListener("submit", async(e) =>{
    try {
        e.preventDefault()

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
            "email": emailLogin.value,
            "password": passwordLogin.value
            });

            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            };
            
            let response = await fetch("http://localhost:3000/api/v1/usuarios/login", requestOptions)
            let data = await response.json()
            if (data.code === 200) {
                alert(data.message)
                localStorage.setItem("token", data.token)
                localStorage.setItem("usuario", JSON.stringify(data.usuario))
            }
            else{
                alert(data.message)
            }
        
    } catch (error) {
        console.log(error); 
    }
})
