"use strict";

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", function () {
    reiniciarRanking();
    cargarRanking();

    var botonTema = document.getElementById("boton-tema");

    if (botonTema) {
        botonTema.addEventListener("click", function () {
            var body = document.body;
            body.classList.toggle("tema-oscuro");

            if (body.classList.contains("tema-oscuro")) {
                botonTema.textContent = "☀️ Modo claro";
            } else {
                botonTema.textContent = "🌙 Modo oscuro";
            }
        });
    }

});
