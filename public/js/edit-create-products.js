// alert("HOLA")

let form = document.querySelector("form.register")
let nameProduct = document.getElementById("name")
let price = document.getElementById("price")
let image = document.getElementById("image")
let description = document.getElementById("description")
let small = document.querySelectorAll("small")

form.addEventListener("submit", e=>{
    let errors = 0
    small.forEach(element => {
        element.innerHTML = ""
    });

    if (nameProduct.value == "" || nameProduct.value.trim().length == 0){
        document.querySelector("small.name").innerHTML+="Ingresá el nombre del producto"
        errors +=1
    }else if(nameProduct.value.length < 5 || nameProduct.value.trim().length < 5){
        document.querySelector("small.name").innerHTML+="Ingresá un nombre de al menos 5 caracteres"
        errors +=1
    }

    if(price.value == "" || price.value==0){
        document.querySelector("small.price").innerHTML+="Ingresá el precio del producto"
        errors +=1
    }

    if ((description.value.length > 0 && description.value.length < 20) || (description.value.length > 0 && description.value.trim().length < 20)){
        document.querySelector("small.description").innerHTML+="La descripción debe tener al menos 20 caracteres"
        errors +=1
    }

    // if(image.value){
    //     document.querySelector("small.image").innerHTML+="Mensaje"
    //     errors +=1
    // }

    if(errors>0){
        e.preventDefault()
    }
})

