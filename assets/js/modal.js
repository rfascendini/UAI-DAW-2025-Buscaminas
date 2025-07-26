// ====== VARIABLES DEL MODAL ======
const modal = document.getElementById("modal");
const modalCerrar = document.getElementById("modal-cerrar");

// Secciones internas del modal
const modalContacto = document.getElementById("modal-contacto");
const modalEstadisticas = document.getElementById("modal-estadisticas");
const modalMensaje = document.getElementById("modal-mensaje");

// Elementos para mensaje de victoria/derrota
const tituloMensaje = document.getElementById("titulo-mensaje");
const detalleMensaje = document.getElementById("detalle-mensaje");
const cerrarMensajeBtn = document.getElementById("cerrar-mensaje");


// ====== FUNCIONES PARA MOSTRAR MODAL ======
function ocultarTodasLasSecciones() {
    modalContacto.style.display = "none";
    modalEstadisticas.style.display = "none";
    modalMensaje.style.display = "none";
}

function abrirModal() {
    modal.style.display = "flex";
}

function cerrarModal() {
    modal.style.display = "none";
    ocultarTodasLasSecciones();
}

// Abrir modal con Contacto
function abrirModalContacto() {
    ocultarTodasLasSecciones();
    modalContacto.style.display = "block";
    abrirModal();
}

// Abrir modal con Ranking
function abrirModalEstadisticas() {
    ocultarTodasLasSecciones();
    modalEstadisticas.style.display = "block";
    abrirModal();
}

// Abrir modal con Mensaje de victoria o derrota
function abrirModalMensaje(tipo, texto) {
    ocultarTodasLasSecciones();
    modalMensaje.style.display = "block";

    if (tipo === "victoria") {
        tituloMensaje.textContent = "¡Ganaste!";
        detalleMensaje.textContent = texto || "¡Felicitaciones! Has ganado la partida.";
    } else if (tipo === "derrota") {
        tituloMensaje.textContent = "¡Perdiste!";
        detalleMensaje.textContent = texto || "Has explotado una mina. ¡Intenta de nuevo!";
    }
    abrirModal();
}

// ====== EVENTOS ======
modalCerrar.addEventListener("click", cerrarModal);
cerrarMensajeBtn.addEventListener("click", cerrarModal);

// Cierra el modal si hacés clic fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

var btnContacto = document.getElementById("btn-contacto");
if (btnContacto) {
    btnContacto.addEventListener("click", function () {
        abrirModalContacto();
    });
}

var btnRanking = document.getElementById("btn-estadisticas");
if (btnRanking) {
    btnRanking.addEventListener("click", function () {
        abrirModalEstadisticas();
    });
}