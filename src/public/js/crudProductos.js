//Crear Nuevo Productos
const createform = document.getElementById("createform")
const nombre = document.getElementById("nombre")
const marca = document.getElementById("marca")
const precio = document.getElementById("precio")
const stock = document.getElementById("stock")


createform.addEventListener("submit", async(e) =>{
    e.preventDefault()
    const token = localStorage.getItem("token")
    const usuario = localStorage.getItem("usuario")
    try {   
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "nombre": nombre.value,
        "marca":marca.value,
        "stock": stock.value,
        "precio": precio.value
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        const response = await fetch(`http://localhost:3000/api/v1/productos?token=${token}`, requestOptions)
        const data = await response.json()

        if(data.code === 201){
            alert(data.message)
            location.reload()
        }else{
            alert(data.message)
        }
        
        } catch (error) {
            console.log(error);
        }
})


//Eliminar Producto

const tbody = document.querySelector("tbody")

if(tbody){
    tbody.addEventListener("click", async(e) =>{
        const elemento = e.target
        try {
            if(elemento.classList.contains("eliminar")){
                const id = elemento.dataset.id
                
                const confirmacion = confirm("Deseas eliminar este producto?")
                if(confirmacion){
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const requestOptions = {
                    method: "DELETE",
                    headers: myHeaders,
                    };

                    const response = await fetch(`http://localhost:3000/api/v1/productos/${id}`, requestOptions)
                    const data = await response.json()

                    if(data.code === 200){
                        alert(data.message)
                        location.reload()
                    }else{
                        alert(data.message)
                    }

                }
            }
            
        } catch (error) {
            console.log(error);
        }
    })
}