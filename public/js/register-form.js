let form = document.querySelector("form.register")
let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let email = document.getElementById("email")
let password = document.getElementById("password")
let image = document.getElementById("image")
let submit = document.getElementById("submit")
let small = document.querySelectorAll("small")


let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/

form.addEventListener("submit", e=>{
    
    let errors = 0
    small.forEach(element => {
        element.innerHTML = ""
    });

    if (firstname.value == "" || firstname.value.trim().length == 0){
        document.querySelector("small.firstname").innerHTML+="Ingresá un nombre"
        errors +=1
    }else if(firstname.value.length <2 || firstname.value.trim().length < 2){
        document.querySelector("small.firstname").innerHTML+="Ingresá un nombre de al menos 2 caracteres"
        errors +=1
    }

    if (lastname.value =="" || lastname.value.trim().length == 0){
        document.querySelector("small.lastname").innerHTML+="Ingresá un apellido"
        errors +=1
    }else if(lastname.value.length <2 || lastname.value.trim().length < 2){
        document.querySelector("small.lastname").innerHTML+="Ingresá un apellido de al menos 2 caracteres"
        errors +=1
    }

    if (email.value ==""){
        document.querySelector("small.email").innerHTML+="Ingresá un email"
        errors +=1
    }else if(!regExpEmail.test(email.value)){
        document.querySelector("small.email").innerHTML+="Ingresá un email válido"
        errors +=1
    }

    if (password.value ==""){
        document.querySelector("small.password").innerHTML+="Ingresá una contraseña"
        errors +=1
    }else if (!regExpPassword.test(password.value)){
        document.querySelector("small.password").innerHTML+="La contraseña debe tener entre 8 y 15 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial. No se admiten espacios."
        errors +=1
    }

    // if (image.value){
    //     document.querySelector("small.image").innerHTML+="Mensaje"
    //     errors +=1
    // }

    if (errors>0){
        e.preventDefault()
    }
})

