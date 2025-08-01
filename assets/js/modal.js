"use strict";

// ====== VARIABLES DEL MODAL ======
var modal = document.getElementById("modal");
var modalCerrar = document.getElementById("modal-cerrar");

// Secciones internas del modal
var modalContacto = document.getElementById("modal-contacto");
var modalEstadisticas = document.getElementById("modal-estadisticas");
var modalMensaje = document.getElementById("modal-mensaje");
var modalNombre = document.getElementById("modal-nombre"); // Nuevo modal

// Elementos para mensaje de victoria/derrota
var tituloMensaje = document.getElementById("titulo-mensaje");
var detalleMensaje = document.getElementById("detalle-mensaje");
var cerrarMensajeBtn = document.getElementById("cerrar-mensaje");

// ====== FUNCIONES ======
function ocultarTodasLasSecciones() {
    var secciones = modal.querySelectorAll(".modal-seccion");
    for (var i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none";
    }
}

function abrirModal() {
    modal.style.display = "flex";
}

function cerrarModal() {
    modal.style.display = "none";
    ocultarTodasLasSecciones();
}

function abrirModalGenerico(seccion) {
    ocultarTodasLasSecciones();
    seccion.style.display = "block";
    abrirModal();
}

function abrirModalContacto() {
    abrirModalGenerico(modalContacto);
}

function abrirModalEstadisticas() {
    abrirModalGenerico(modalEstadisticas);
}

function abrirModalNombre() {
    abrirModalGenerico(modalNombre);
}

function abrirModalMensaje(tipo, texto) {
    abrirModalGenerico(modalMensaje);
    if (tipo === "victoria") {
        tituloMensaje.textContent = "¡Ganaste!";
        detalleMensaje.textContent = texto || "¡Felicitaciones! Has ganado la partida.";
    } else if (tipo === "derrota") {
        tituloMensaje.textContent = "¡Perdiste!";
        detalleMensaje.textContent = texto || "Has explotado una mina. ¡Intenta de nuevo!";
    }
}

// ====== EVENTOS ======
modalCerrar.addEventListener("click", cerrarModal);
cerrarMensajeBtn.addEventListener("click", cerrarModal);

window.addEventListener("click", function (e) {
    if (e.target === modal) cerrarModal();
});

var btnContacto = document.getElementById("btn-contacto");
if (btnContacto) btnContacto.addEventListener("click", abrirModalContacto);

var btnRanking = document.getElementById("btn-estadisticas");
if (btnRanking) btnRanking.addEventListener("click", abrirModalEstadisticas);

// Exponer global
window.abrirModalNombre = abrirModalNombre;
