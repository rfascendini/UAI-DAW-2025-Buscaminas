"use strict";

(function () {
    var form = document.getElementById("form-contacto");
    var nombre = document.getElementById("nombre-contacto");
    var email = document.getElementById("email-contacto");
    var mensaje = document.getElementById("mensaje-contacto");

    var errorNombre = document.getElementById("error-nombre");
    var errorEmail = document.getElementById("error-email");
    var errorMensaje = document.getElementById("error-mensaje");

    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function limpiarErrores() {
        errorNombre.textContent = "";
        errorEmail.textContent = "";
        errorMensaje.textContent = "";
    }

    function validarFormulario(event) {
        limpiarErrores();
        var valido = true;

        if (nombre.value.trim() === "" || nombre.value.trim().length < 3) {
            errorNombre.textContent = "Debe ingresar un nombre válido.";
            valido = false;
        }
        if (email.value.trim() === "" || !regexEmail.test(email.value.trim())) {
            errorEmail.textContent = "Debe ingresar un email válido.";
            valido = false;
        }
        if (mensaje.value.trim() === "") {
            errorMensaje.textContent = "El mensaje no puede estar vacío.";
            valido = false;
        }
        if (!valido) event.preventDefault();
    }

    if (form) form.addEventListener("submit", validarFormulario, false);
})();
