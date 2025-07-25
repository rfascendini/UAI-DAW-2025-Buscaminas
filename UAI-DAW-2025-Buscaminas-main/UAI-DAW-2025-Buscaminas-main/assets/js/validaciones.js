const nombre =document.getElementById("nombre-contacto")
const email =document.getElementById("email-contacto")
const mensaje =document.getElementById("mensaje-contacto")
const form =document.getElementById("form-contacto")
const submit=document.getElementById("submit")


function validateInputs()
{
const emailregex =/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const name=/^[a-zA-Z\-]+$/;


if(name.test(nombre.value  ||  nombre.value=="")  ){
alert("Complete el Nombre  ")
nombre.style.border="1px solid red";
return false

}
if(!emailregex.test(email.value)  || email.value=="")
{
alert("Ingresar el formato requerido  ej: email@ejemplo.com")
email.style.border= "1px solid red";
return false

}
if(mensaje.value===""){
alert("Campo mensaje vacio")
mensaje.style.border="1px solid red";
return false

}

alert(" !Enviado, Muchas Gracias  ")
localStorage.setItem("nombre",JSON.stringify(nombre));
localStorage.setItem("email",JSON.stringify(email));
localStorage.setItem("mensaje",JSON.stringify(mensaje));
return true
}


document.addEventListener("click", (e)=>{
if(e.target===submit){
    e.preventDefault();
    validateInputs();
}

})

//Local Storage 
