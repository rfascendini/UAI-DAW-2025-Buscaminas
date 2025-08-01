"use strict";

document.addEventListener("DOMContentLoaded", function () {
    cargarRanking(); // 🔹 Muestra el ranking actual
    reiniciarRanking(); // 🔹 Agrega el evento al botón de limpiar

});

function cargarRanking() {
    var tablaRanking = document.getElementById("filas-ranking");
    if (!tablaRanking) return;

    tablaRanking.innerHTML = "";

    var datos = localStorage.getItem("rankingJugadores");
    if (!datos) return mostrarFilaVacia(tablaRanking);

    var ranking = JSON.parse(datos).filter(
        (j) => j && j.nombre && typeof j.puntaje === "number"
    );

    if (ranking.length === 0) return mostrarFilaVacia(tablaRanking);

    ranking.sort((a, b) => b.puntaje - a.puntaje);

    ranking.slice(0, 10).forEach((j, i) => {
        var fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${j.nombre}</td>
            <td>${j.puntaje}</td>
            <td>${j.duracion}</td>
            <td>${j.fecha}</td>
        `;
        tablaRanking.appendChild(fila);
    });
}

function mostrarFilaVacia(tabla) {
    var fila = document.createElement("tr");
    var celda = document.createElement("td");
    celda.colSpan = 5;
    celda.textContent = "No hay registros";
    celda.style.textAlign = "center";
    fila.appendChild(celda);
    tabla.appendChild(fila);
}

function reiniciarRanking() {
    var btn = document.getElementById("btn-limpiar-ranking");
    if (!btn) return;

    btn.addEventListener("click", () => {
        if (confirm("¿Estás seguro que querés borrar el ranking?")) {
            localStorage.removeItem("rankingJugadores");
            cargarRanking(); // 🔹 Actualiza la tabla pero NO guarda nada
        }
    });
}
