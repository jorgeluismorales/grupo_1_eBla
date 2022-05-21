let form = document.querySelector("form.login")
let email = document.getElementById("email")
let password = document.getElementById("password")
let small = document.querySelectorAll("small")

let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

form.addEventListener("submit", e=>{
    let errors = 0
    small.forEach(element => {
        element.innerHTML = ""
    });

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
    }

    if (errors>0){
        e.preventDefault()
    }
})