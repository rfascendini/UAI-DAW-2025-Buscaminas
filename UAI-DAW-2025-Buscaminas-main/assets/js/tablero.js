// === VARIABLES GLOBALES ===
var filas = 8
var columnas = 8
var lado = 30
var minas = 10
var tablero = []
var enJuego = true
var juegoIniciado = false
var marcas = 0
var bandera = Boolean =false
var segundos =0 
var intervalId
var banderaintervalo =false


document.oncontextmenu = function(){return false}

// === FUNCIÓN PRINCIPAL ===
nuevoJuego()


function obtenerValor() {
  const valor = document.getElementById('dificultad').value
  niveles(valor)
  nuevoJuego()
}

function nuevoJuego() {
  
  reiniciarVariables()
  generarTableroHTML()
  generarTableroJuego()
  añadirEventos()
  refrescarTablero()
  Tiempo(true )
  
}

function reiniciarVariables() {
  marcas = 0
  enJuego = true
  juegoIniciado = false
  

  
}
  let ElementoSonidoBomba=document.getElementById("Sonido_bomba")
  let ElementoSonidoPerder=document.getElementById("Sonido_perder")
  let ElementoSonidoVictoria=document.getElementById("Sonido_ganar")

function sonidos(compas)
{
  if(compas===1){
  
    ElementoSonidoVictoria.play();
    return
    }
    if(compas===2){
  
    ElementoSonidoPerder.play();
    return
    }
    if(compas===3){
    
    ElementoSonidoBomba.play();
    return
    }
  }


function Tiempo(bandera , segundos)
{
    

  if(bandera===false) 
  {
    const Segundos=() =>{
    document.getElementById("timer").innerHTML=(segundos)
    segundos = segundos + 1
    return
    }
    if(banderaintervalo===false)
    {
    intervSec = setInterval(Segundos, 1000) 
    banderaintervalo=true
    return
    }
    

  
  }else if(bandera===true  )
  {
    
    clearInterval(intervSec);
    banderaintervalo=false 
    document.getElementById("timer").innerHTML=0
  }
  return
}



function niveles(dificultad) {
  if (dificultad === "1") {
    columnas = filas = 8
    minas = 10
  } else if (dificultad === "2") {
    columnas = filas = 12
    minas = 25
  } else if (dificultad === "3") {
    columnas = filas = 16
    minas = 40
  } else if (dificultad === "4") {
    columnas = filas = 32
    minas = 100
    lado = 25
  }
  return
}

function generarTableroHTML() {
  let html = ""
  for (let f = 0; f < filas; f++) {
    html += `<tr>`
    for (let c = 0; c < columnas; c++) {
      html += `<td id="celda-${c}-${f}" style="width:${lado}px;height:${lado}px"></td>`
    }
    html += `</tr>`
  }
  const tableroHTML = document.getElementById("tablero")
  tableroHTML.innerHTML = html
  tableroHTML.style.width = columnas * lado + "px"
  tableroHTML.style.height = filas * lado + "px"
  tableroHTML.classList.add("tablero")
}

function añadirEventos() {
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      const celda = document.getElementById(`celda-${c}-${f}`)
      celda.addEventListener("dblclick", e => dobleClic(celda, c, f, e))
      celda.addEventListener("mouseup", e => clicSimple(celda, c, f, e))
    }
  }
}

function dobleClic(celda, c, f) {
  if (!enJuego) return
  abrirArea(c, f)
  refrescarTablero()
  Tiempo(false )
}

function clicSimple(celda, c, f, me) {
  if (!enJuego || tablero[c][f].estado === "descubierto") 
    return

  switch (me.button) {
    case 0:
      if (tablero[c][f].estado === "marcado") break
      while (!juegoIniciado && tablero[c][f].valor === -1) generarTableroJuego()
      tablero[c][f].estado = "descubierto"
      juegoIniciado = true
      if (tablero[c][f].valor === 0) abrirArea(c, f)
      break
    case 2:
      if (tablero[c][f].estado === "marcado") {
        tablero[c][f].estado = undefined
        marcas--
      } else {
        tablero[c][f].estado = "marcado"
        marcas++
      }
      break
  }



  refrescarTablero()
  Tiempo(false , segundos)

}

function abrirArea(c, f) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue
      try {
        if (tablero[c + i][f + j].estado !== "descubierto" && tablero[c + i][f + j].estado !== "marcado") {
          tablero[c + i][f + j].estado = "descubierto"
          if (tablero[c + i][f + j].valor === 0) abrirArea(c + i, f + j)
        }
      } catch (e) {}
    }
  }
}

function refrescarTablero() {
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      const celda = document.getElementById(`celda-${c}-${f}`)
      if (tablero[c][f].estado === "descubierto") {
        celda.style.boxShadow = "none"
        if (tablero[c][f].valor === -1) {
          celda.innerHTML = `<img src="assets/images/tablero/mina.png" alt="mina">`
          celda.style.color = "red"
          celda.style.background = "red"
          Tiempo(true)
        } else if (tablero[c][f].valor !== 0) {
          celda.innerHTML = tablero[c][f].valor
        }
      } else if (tablero[c][f].estado === "marcado") {
        celda.innerHTML = `<img src="assets/images/tablero/flag.png" alt="flag">`
        celda.style.background = "green"
      } else {
        celda.innerHTML = ""
        celda.style.background = ""
      }
    }
  }
  verificarGanador()
  verificarPerdedor()
  actualizarPanelMinas()
}

function actualizarPanelMinas() {
  document.getElementById("minas").innerHTML = minas - marcas
}

function verificarGanador() {
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      if (tablero[c][f].estado !== "descubierto" && tablero[c][f].valor !== -1) 
        return
    }
  }
  document.getElementById("tablero").style.background = "green"
  Tiempo(true)
  enJuego = false

}

function verificarPerdedor() {
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      if (tablero[c][f].valor === -1 && tablero[c][f].estado === "descubierto") {
        enJuego = false
        Tiempo(true)
        sonidos(2)
      }
    }
  }
  if (!enJuego) {
    for (let f = 0; f < filas; f++) {
      for (let c = 0; c < columnas; c++) {
        if (tablero[c][f].valor === -1) {
          const celda = document.getElementById(`celda-${c}-${f}`)
          celda.innerHTML = `<img src="assets/images/tablero/mina.png" alt="mina" class="bomba">`
          celda.style.background = "red"
         Tiempo(true)
            
        }
      }
    }
  }
}

function generarTableroJuego() {
  
  vaciarTablero()
  ponerMinas()
  contadoresMinas()



  
}

function vaciarTablero() {
  tablero = []
  for (let c = 0; c < columnas; c++) tablero.push([])
}

function ponerMinas() {
  for (let i = 0; i < minas; i++) {
    let c, f
    do {
      c = Math.floor(Math.random() * columnas)
      f = Math.floor(Math.random() * filas)
    } while (tablero[c][f])
    tablero[c][f] = { valor: -1 }
  }
}

function contadoresMinas() {
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      if (!tablero[c][f]) {
        let contador = 0
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue
            try {
              if (tablero[c + i][f + j].valor === -1) contador++
            } catch (e) {}
          }
        }
        tablero[c][f] = { valor: contador }
      }
    }
  }
}
