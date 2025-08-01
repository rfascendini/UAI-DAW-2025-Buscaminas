"use strict";

var botonTema = document.getElementById("boton-tema");
if (botonTema) {
    botonTema.addEventListener("click", function () {
        var body = document.body;
        var modoOscuro = body.classList.toggle("tema-oscuro");
        botonTema.textContent = modoOscuro ? "Modo claro" : "Modo oscuro";

        // Cambiar todas las referencias de sonidos "actuales"
        sonidoFondoActual.pause();
        sonidoFondoActual.currentTime = 0;
        sonidoVictoriaActual.pause();
        sonidoVictoriaActual.currentTime = 0;
        sonidoInstruccionesActual.pause();
        sonidoInstruccionesActual.currentTime = 0;
        sonidoDerrotaActual.pause();
        sonidoDerrotaActual.currentTime = 0;

        // Actualizar las referencias a los sonidos según el modo
        sonidoFondoActual = modoOscuro ? sonidoFondoOscuro : sonidoFondoClaro;
        sonidoVictoriaActual = modoOscuro
            ? sonidoVictoriaOscuro
            : sonidoVictoriaClaro;
        sonidoInstruccionesActual = modoOscuro
            ? sonidoInstruccionesOscuro
            : sonidoInstruccionesClaro;
        sonidoDerrotaActual = modoOscuro
            ? sonidoDerrotaOscuro
            : sonidoDerrotaClaro;

        // --- Reiniciar juego completamente ---
        finalizarJuego();
    });
}
