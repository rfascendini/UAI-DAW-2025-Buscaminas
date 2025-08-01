"use strict";

/* ============================
   VARIABLES GLOBALES
============================ */
var filas = 8;
var columnas = 8;
var lado = 30;
var minas = 10;
var nivelActual = 1;
var tablero = [];
var enJuego = true;
var juegoIniciado = false;
var marcas = 0;
var tiempo = 0;
var intervalo;
var jugadorActual = null;
var contadorTiempo = document.getElementById("timer");
var contadorMinas = document.getElementById("minas");


// =====================
// VARIABLES DE SONIDO
// =====================

// Fondo
var sonidoFondoClaro = new Audio("assets/sounds/fondo/fondo-claro.mp3");
var sonidoFondoOscuro = new Audio("assets/sounds/fondo/fondo-oscuro.mp3");
var sonidoFondoActual = sonidoFondoClaro;

// Victoria
var sonidoVictoriaClaro = new Audio("assets/sounds/victoria/victoria-claro.mp3");
var sonidoVictoriaOscuro = new Audio("assets/sounds/victoria/victoria-oscuro.mp3");
var sonidoVictoriaActual = sonidoVictoriaClaro;

// Instrucciones
var sonidoInstruccionesClaro = new Audio("assets/sounds/instrucciones/instrucciones-claro.mp3");
var sonidoInstruccionesOscuro = new Audio("assets/sounds/instrucciones/instrucciones-oscuro.mp3");
var sonidoInstruccionesActual = sonidoInstruccionesClaro;

// Derrota
var sonidoDerrotaClaro = new Audio("assets/sounds/derrota/derrota-claro.mp3");
var sonidoDerrotaOscuro = new Audio("assets/sounds/derrota/derrota-oscuro.mp3");
var sonidoDerrotaActual = sonidoDerrotaClaro;


document.oncontextmenu = function () {
    return false; // Desactiva menú contextual
};

/* ============================
   INICIALIZACIÓN
============================ */
document.addEventListener("DOMContentLoaded", function () {
    contadorMinas.style.visibility = "hidden";
    contadorTiempo.style.visibility = "hidden";

    var botonNuevoJuego = document.getElementById("juego-nuevo");
    var botonInstrucciones = document.getElementById("btn-instrucciones");
    var btnGuardarNombre = document.getElementById("btn-guardar-nombre");

    if (botonInstrucciones) {
        botonInstrucciones.addEventListener("click", reproducirInstrucciones);
    }

    if (botonNuevoJuego) {
        botonNuevoJuego.addEventListener("click", abrirModalNombre);
    }

    if (btnGuardarNombre) {
        btnGuardarNombre.addEventListener("click", guardarNombreJugador);
    }
});

/* ============================
   GESTIÓN DE JUGADOR
============================ */
function guardarNombreJugador() {
    var inputNombre = document.getElementById("nombre-jugador");
    var errorNombre = document.getElementById("error-nombre-jugador");
    var selectDificultad = document.getElementById("dificultad");

    var nombre = inputNombre.value.trim();
    var dificultad = parseInt(selectDificultad.value);

    if (nombre.length < 3) {
        errorNombre.textContent = "Debe tener al menos 3 caracteres.";
        return;
    }

    errorNombre.textContent = "";

    nivelActual = dificultad; // <-- Guarda la dificultad seleccionada globalmente

    jugadorActual = {
        nombre: nombre,
        puntaje: 0,
        duracion: "00:00",
        fecha: obtenerFechaActual(),
        dificultad: nivelActual // <-- Guarda para el ranking si querés mostrarlo
    };

    niveles(nivelActual); // Ahora funciona siempre bien
    cerrarModal();
    iniciarNuevoJuego();
}

function agregarJugador(jugador) {
    var datos = localStorage.getItem("rankingJugadores");
    var ranking = datos ? JSON.parse(datos) : [];
    ranking.push(jugador);

    localStorage.setItem("rankingJugadores", JSON.stringify(ranking));

    if (typeof cargarRanking === "function") {
        cargarRanking();
    }
}

/* ============================
   AUDIO
============================ */
function reproducirInstrucciones() {
    if (sonidoInstruccionesActual.paused) {
        sonidoInstruccionesActual.play();
    } else {
        sonidoInstruccionesActual.pause();
    }
}

/* ============================
   INICIO DE JUEGO
============================ */
function iniciarNuevoJuego() {
    contadorMinas.style.visibility = "visible";
    contadorTiempo.style.visibility = "visible";

    sonidoFondoActual.play();
    sonidoFondoActual.loop = true;

    reiniciarVariables();
    generarTableroHTML();
    generarTableroJuego();
    añadirEventos();
    refrescarTablero();
    iniciarTimer();
}

function reiniciarVariables() {
    marcas = 0;
    enJuego = true;
    juegoIniciado = false;
    tiempo = 0;
}

/* ============================
   CONFIGURAR NIVELES
============================ */
function niveles(dificultad) {
    if (dificultad === 1) {
        columnas = filas = 8;
        minas = 10;
        lado = 30;
    } else if (dificultad === 2) {
        columnas = filas = 12;
        minas = 25;
        lado = 30;
    } else if (dificultad === 3) {
        columnas = filas = 16;
        minas = 40;
        lado = 30;
    } else if (dificultad === 4) {
        columnas = filas = 32;
        minas = 100;
        lado = 25;
    }
}

/* ============================
   TABLERO HTML Y EVENTOS
============================ */
function generarTableroHTML() {
    var html = "";
    for (var f = 0; f < filas; f++) {
        html += "<tr>";
        for (var c = 0; c < columnas; c++) {
            html +=
                '<td id="celda-' +
                c +
                "-" +
                f +
                '" style="width:' +
                lado +
                "px;height:" +
                lado +
                'px"></td>';
        }
        html += "</tr>";
    }

    var tableroHTML = document.getElementById("tablero");
    tableroHTML.innerHTML = html;
    tableroHTML.style.width = columnas * lado + "px";
    tableroHTML.style.height = filas * lado + "px";
    tableroHTML.classList.add("tablero");
}

function añadirEventos() {
    for (var f = 0; f < filas; f++) {
        for (var c = 0; c < columnas; c++) {
            var celda = document.getElementById("celda-" + c + "-" + f);

            celda.addEventListener("dblclick", function () {
                var partes = this.id.split("-");
                dobleClic(this, parseInt(partes[1]), parseInt(partes[2]));
            });

            celda.addEventListener("mouseup", function (e) {
                var partes = this.id.split("-");
                clicSimple(this, parseInt(partes[1]), parseInt(partes[2]), e);
            });
        }
    }
}

/* ============================
   LÓGICA DEL JUEGO
============================ */
function dobleClic(celda, c, f) {
    if (!enJuego) return;
    abrirArea(c, f);
    refrescarTablero();
}

function clicSimple(celda, c, f, e) {
    if (!enJuego || tablero[c][f].estado === "descubierto") return;

    if (e.button === 0) {
        if (tablero[c][f].estado === "marcado") return;

        while (!juegoIniciado && tablero[c][f].valor === -1) {
            generarTableroJuego();
        }

        tablero[c][f].estado = "descubierto";
        juegoIniciado = true;
        if (tablero[c][f].valor === 0) abrirArea(c, f);
    } else if (e.button === 2) {
        if (tablero[c][f].estado === "marcado") {
            tablero[c][f].estado = undefined;
            marcas--;
        } else {
            tablero[c][f].estado = "marcado";
            marcas++;
        }
    }

    refrescarTablero();
}

function abrirArea(c, f) {
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            try {
                if (
                    tablero[c + i][f + j].estado !== "descubierto" &&
                    tablero[c + i][f + j].estado !== "marcado"
                ) {
                    tablero[c + i][f + j].estado = "descubierto";

                    if (tablero[c + i][f + j].valor === 0) {
                        abrirArea(c + i, f + j);
                    }
                }
            } catch (e) {}
        }
    }
}

/* ============================
   REFRESCAR TABLERO Y PANEL
============================ */
function refrescarTablero() {
    for (var f = 0; f < filas; f++) {
        for (var c = 0; c < columnas; c++) {
            var celda = document.getElementById("celda-" + c + "-" + f);

            if (tablero[c][f].estado === "descubierto") {
                celda.style.boxShadow = "none";

                if (tablero[c][f].valor === -1) {
                    celda.innerHTML =
                        '<img src="assets/images/tablero/mina.png" alt="mina">';
                    celda.style.background = "red";
                } else if (tablero[c][f].valor !== 0) {
                    celda.textContent = tablero[c][f].valor;
                }
            } else if (tablero[c][f].estado === "marcado") {
                celda.innerHTML =
                    '<img src="assets/images/tablero/flag.png" alt="flag">';
                celda.style.background = "green";
            } else {
                celda.innerHTML = "";
                celda.style.background = "";
            }
        }
    }

    verificarGanador();
    verificarPerdedor();
    contadorMinas.textContent = minas - marcas;
}

/* ============================
   GANAR / PERDER
============================ */
function verificarGanador() {
    for (var f = 0; f < filas; f++) {
        for (var c = 0; c < columnas; c++) {
            if (
                tablero[c][f].estado !== "descubierto" &&
                tablero[c][f].valor !== -1
            ) {
                return;
            }
        }
    }
    finalizarJuego(true);
}

function verificarPerdedor() {
    for (var f = 0; f < filas; f++) {
        for (var c = 0; c < columnas; c++) {
            if (
                tablero[c][f].valor === -1 &&
                tablero[c][f].estado === "descubierto"
            ) {
                finalizarJuego(false);
                return;
            }
        }
    }
}

function finalizarJuego(gano) {
    enJuego = false;
    detenerTimer();
    sonidoFondoActual.pause();
    sonidoFondoActual.currentTime = 0;

    if (gano) {
        sonidoVictoriaActual.play();
        document.getElementById("tablero").style.background = "green";

        if (jugadorActual) {
            jugadorActual.puntaje = calcularPuntaje();
            jugadorActual.duracion = formatearTiempo(tiempo);
            agregarJugador(jugadorActual);
        }
    } else {
        mostrarTodasLasMinas();
    }
}

function mostrarTodasLasMinas() {
    for (var f = 0; f < filas; f++) {
        for (var c = 0; c < columnas; c++) {
            if (tablero[c][f].valor === -1) {
                var celda = document.getElementById("celda-" + c + "-" + f);
                celda.innerHTML =
                    '<img src="assets/images/tablero/mina.png" alt="mina">';
                celda.style.background = "red";
            }
        }
    }
}

/* ============================
   GENERACIÓN DEL TABLERO
============================ */
function generarTableroJuego() {
    vaciarTablero();
    ponerMinas();
    contadoresMinas();
}

function vaciarTablero() {
    document.getElementById("tablero").style.background = "#ffffff";
    tablero = [];
    for (var c = 0; c < columnas; c++) tablero.push([]);
}

function ponerMinas() {
    for (var i = 0; i < minas; i++) {
        var c, f;
        do {
            c = Math.floor(Math.random() * columnas);
            f = Math.floor(Math.random() * filas);
        } while (tablero[c][f]);
        tablero[c][f] = { valor: -1 };
    }
}

function contadoresMinas() {
    for (var f = 0; f < filas; f++) {
        for (var c = 0; c < columnas; c++) {
            if (!tablero[c][f]) {
                var contador = 0;
                for (var i = -1; i <= 1; i++) {
                    for (var j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        try {
                            if (tablero[c + i][f + j].valor === -1) contador++;
                        } catch (e) {}
                    }
                }
                tablero[c][f] = { valor: contador };
            }
        }
    }
}

/* ============================
   TIMER
============================ */
function iniciarTimer() {
    detenerTimer();
    tiempo = 0;
    actualizarTimer();
    intervalo = setInterval(function () {
        tiempo++;
        actualizarTimer();
    }, 1000);
}

function detenerTimer() {
    clearInterval(intervalo);
}

function actualizarTimer() {
    contadorTiempo.textContent = formatearTiempo(tiempo);
}

function formatearTiempo(segundos) {
    var minutos = Math.floor(segundos / 60);
    var seg = segundos % 60;
    if (seg < 10) seg = "0" + seg;
    return minutos + ":" + seg;
}

/* ============================
   UTILIDADES
============================ */
function obtenerFechaActual() {
    var fecha = new Date();
    var yyyy = fecha.getFullYear();
    var mm = ("0" + (fecha.getMonth() + 1)).slice(-2);
    var dd = ("0" + fecha.getDate()).slice(-2);
    var hh = ("0" + fecha.getHours()).slice(-2);
    var min = ("0" + fecha.getMinutes()).slice(-2);
    return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min;
}

function calcularPuntaje() {
    // Puedes ajustar este cálculo según el nivel
    var multiplicador = 1;
    if (nivelActual === 2) multiplicador = 2;
    if (nivelActual === 3) multiplicador = 3;
    if (nivelActual === 4) multiplicador = 4;
    return Math.max(Math.floor((1000 - tiempo * 5) * multiplicador), 0);
}
