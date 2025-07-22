"use strict";

// Función para cargar y mostrar el ranking
function cargarRanking() {
    var tablaRanking = document.getElementById("filas-ranking");

    // Verificar si hay datos en localStorage
    var datosGuardados = localStorage.getItem("rankingJugadores");

    // Si no hay, creamos uno ficticio
    if (!datosGuardados) {
        var jugadoresFicticios = [
            {
                nombre: "Renzo",
                puntaje: 980,
                duracion: "01:10",
                fecha: "2025-07-01 14:23",
            },
            {
                nombre: "Agustin",
                puntaje: 950,
                duracion: "01:22",
                fecha: "2025-07-03 10:11",
            },
            {
                nombre: "Lucía",
                puntaje: 920,
                duracion: "01:18",
                fecha: "2025-07-04 08:45",
            },
            {
                nombre: "Martín",
                puntaje: 890,
                duracion: "01:35",
                fecha: "2025-07-05 16:55",
            },
            {
                nombre: "Valentina",
                puntaje: 870,
                duracion: "01:27",
                fecha: "2025-07-07 12:02",
            },
            {
                nombre: "Julián",
                puntaje: 850,
                duracion: "01:40",
                fecha: "2025-07-08 17:35",
            },
            {
                nombre: "Emilia",
                puntaje: 830,
                duracion: "01:30",
                fecha: "2025-07-09 09:15",
            },
            {
                nombre: "Sofía",
                puntaje: 810,
                duracion: "01:50",
                fecha: "2025-07-10 13:50",
            },
            {
                nombre: "Diego",
                puntaje: 790,
                duracion: "02:00",
                fecha: "2025-07-12 18:00",
            },
            {
                nombre: "Camila",
                puntaje: 770,
                duracion: "01:45",
                fecha: "2025-07-14 11:32",
            },
        ];
        localStorage.setItem(
            "rankingJugadores",
            JSON.stringify(jugadoresFicticios)
        );
        datosGuardados = localStorage.getItem("rankingJugadores"); // actualizar
    }

    // Parsear
    var ranking = JSON.parse(datosGuardados);

    // Ordenar por puntaje descendente
    ranking.sort(function (a, b) {
        return b.puntaje - a.puntaje;
    });

    // Limpiar tabla anterior
    while (tablaRanking.firstChild) {
        tablaRanking.removeChild(tablaRanking.firstChild);
    }

    // Limitar a 10
    var limite = Math.min(ranking.length, 10);
    for (var i = 0; i < limite; i++) {
        var jugador = ranking[i];

        console.log("Jugador:", jugador);

        // Validación mínima
        if (!jugador || !jugador.nombre) continue;

        // Crear <tr>
        var fila = document.createElement("tr");

        var celdaPosicion = document.createElement("td");
        celdaPosicion.textContent = i + 1;

        var celdaNombre = document.createElement("td");
        celdaNombre.textContent = jugador.nombre;

        var celdaPuntaje = document.createElement("td");
        celdaPuntaje.textContent = jugador.puntaje;

        var celdaDuracion = document.createElement("td");
        celdaDuracion.textContent = jugador.duracion;

        var celdaFecha = document.createElement("td");
        celdaFecha.textContent = jugador.fecha;

        fila.appendChild(celdaPosicion);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPuntaje);
        fila.appendChild(celdaDuracion);
        fila.appendChild(celdaFecha);

        tablaRanking.appendChild(fila);
    }
}


// Botón para limpiar el ranking
function reiniciarRanking() {
    var btnLimpiarRanking = document.getElementById("btn-limpiar-ranking");

    if (btnLimpiarRanking) {
        btnLimpiarRanking.addEventListener("click", function () {
            var confirmar = confirm("¿Estás seguro que querés borrar el ranking?");
            if (confirmar) {
                // Eliminar del localStorage
                localStorage.removeItem("rankingJugadores");

                // Limpiar la tabla visualmente
                var tablaRanking = document.getElementById("filas-ranking");
                if (tablaRanking) {
                    tablaRanking.innerHTML = "";
                }
            }
        });
    }
}