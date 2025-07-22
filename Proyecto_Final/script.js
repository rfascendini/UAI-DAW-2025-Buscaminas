

    let filas = 8
    let columnas = 8
    let lado = 30 // tamaño de las celdas 

    let minas =  10
    let tablero = []

    let enJuego = true

    let juegoIniciado = false



function obtenervalor(){
{
  const selectElement = document.getElementById('dificultad');
  const valorseleccionado= selectElement.value;
  const valor=String(valorseleccionado)
  niveles(valor);
  nuevoJuego();
}
}


    nuevoJuego()

    function nuevoJuego() {
      niveles()
      reiniciarVariables()
      generarTableroHTML() //Gernera la estructura visual de la matriz
      generarTableroJuego() //Se encarla de generar las minas y los números para que sean descubiertos
      añadirEventos() //se añaden los eventos de mouse para las celdas
      refrescarTablero() //Se encarga del comportamiento lógico para mostrar los elementos
    }


    function reiniciarVariables() {
      marcas = 0
      enJuego = true
      juegoIniciado = false
    }

 // hay que modificar esta funcion para que reciba un argumento  string : easy , medio , dificil y segun la eleccion cree el tablero //
    function generarTableroHTML() {
         //   niveles("dificil"); // invocacion de funcion de dificultad 



      let html = ""
      for (let f = 0; f < filas; f++) {
        html += `<tr>`
        for (let c = 0; c < columnas; c++) {
          /*
              Generación de cada uno de los elementos de la matriz
              y se les asignará una coordenada, para poder tratar estos elementos
              de forma matemática, siguiendo patrones que fácilitarán la 
              estructura de algoritmos

              id="celda-${c}-${f}"
              es la instrucción más importante, asigna una coordenada a cada elemento
          */
          html += `<td id="celda-${c}-${f}" style="width:${lado}px;height:${lado}px">`
          html += `</td>`
        }
        html += `</tr>`
      }

      let tableroHTML = document.getElementById("tablero")
      tableroHTML.innerHTML = html
      tableroHTML.style.width = columnas * lado + "px"
      tableroHTML.style.height = filas * lado + "px"
      tableroHTML.style.background = "silver"
      

    }
function niveles(dificultad) // dificultad  del juego 
{
if(dificultad==="1")
{

  columnas=8;
    filas=8;
    minas=10;
}
if(dificultad==="2")
{
  filas=12;
  columnas=12;
  minas =25;
}
if(dificultad==="3")
{
  filas=16;
  columnas=16;
  minas=40;
}
if(dificultad==="4")
{
  filas=32;
  columnas=32;
  minas=100;
  lado= 25;
  
}

}


    /*
        Una vez generado el tablero HTML se le añaden los eventos de clic
        a cada una de las celdas para que el usuario pueda interactuar con el juego
    */
    function añadirEventos() {
      for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
          let celda = document.getElementById(`celda-${c}-${f}`)
          celda.addEventListener("dblclick", function(me) {
            dobleClic(celda, c, f, me)
          })
          celda.addEventListener("mouseup", function(me) {
            clicSimple(celda, c, f, me)
          })
        }
      }
    }

    /*
        Está función se encargará de destapar las celdas que rodean a la celda
        a la que se le dio doble clic
    */
    function dobleClic(celda, c, f, me) {
      if (!enJuego) {
        return
      }
      abrirArea(c, f)
      refrescarTablero()
    }

    /*
        Esta función se encargará de los comportamientos de clic derecho y clic izquierdo
        para descubrir las celdas, o marcarlas para protegerlas de ser descubiertas
    */
    function clicSimple(celda, c, f, me) {
      if (!enJuego) {
        return //El juego ha finalizado
      }
      if (tablero[c][f].estado == "descubierto") {
        return //Las celdas descubiertas no pueden ser redescubiertas o marcadas
      }
      switch (me.button) {




        case 0: //0 es el código para el clic izquierdo
          if (tablero[c][f].estado == "marcado") { //la celda está protegida
            break
          }   
          while (!juegoIniciado && tablero[c][f].valor == -1) {
            generarTableroJuego()
          }
          tablero[c][f].estado = "descubierto"

          juegoIniciado = true //aquí se avisa que el jugador ha descubierto más de 1 celda
          if (tablero[c][f].valor == 0) {
            /*
                                    Si acertamos en una celda que no tenga minas alrededor, entonces hay que 
                                    destapar toda el área de ceros
                                */
            abrirArea(c, f)
          }
          break;


        case 1: //1 es el código para el clic medio o scroll
          break;



        case 2: //2 es el código para el clic derecho
          if (tablero[c][f].estado == "marcado") {

            tablero[c][f].estado = undefined
            marcas--
            
          } else { tablero[c][f].estado = "marcado"
            marcas++

          }
          break;
        default:
          break;
      }
      refrescarTablero()
    }

    function abrirArea(c, f) {
      //Hay que abrir los demás números que están al rededor
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i == 0 && j == 0) {
            //Está condición es obligadoria para que no se encierre en un bucle infinito
            continue
          }
          try { //Hay que cuidarse de las posiciones negativas
            if (tablero[c + i][f + j].estado != "descubierto") {
              if (tablero[c + i][f + j].estado != "marcado") {
                tablero[c + i][f + j].estado = "descubierto" //aquí es donde se abren las celdas circundantes
                
                if (tablero[c + i][f + j].valor == 0) { //si la celda que se abre es otro 0, se le pasa la responsabilidad
                  abrirArea(c + i, f + j)
                }
              }
            }
          } catch (e) {}
        }
      }
    }

    /*
        Aquí nos encargaremos del comportamiento visual según el estado 
        lógico del tablero de juego y los eventos del maus 
    */
    function refrescarTablero()
     {
       
      for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
          let celda = document.getElementById(`celda-${c}-${f}`)
          if (tablero[c][f].estado == "descubierto") {
            celda.style.boxShadow = "none"
            switch (tablero[c][f].valor) {
              case -1: // si hay una mina  al refrescar el tablero  se pone el icono bomba el fondo de naranja en la celda  y se ejecutan  las siguientes funciones para avisarle al jugador que perdio
                celda.innerHTML = `<i class="fas fa-bomb"></i>`
                celda.style.color = "black"
                celda.style.background = "orange"
                break;
              case 0: 
                break
              default://si no pasa nada solo le damos la informacion de la matriz a una variable celda  para despues hacer consultas con un IF
                celda.innerHTML = tablero[c][f].valor
                break;
            }
          }
          if (tablero[c][f].estado == "marcado") { // si al reflescar el table esa celda  tiene el estado marcado sucede lo siguiente ---> se  colorea verde y se pone el icono flag
            celda.innerHTML = `<i class="fas fa-flag"></i>`
            celda.style.background = `green`
          }
          if (tablero[c][f].estado == undefined) { // sino  tiene ningun estado no se hace nada recordemos que las celdas pueden tener 3 estados , indefinido ,marcado , descubierto 
            celda.innerHTML = ``
            celda.style.background = ``
          }
        }
      }
      verificarGanador()
      verificarPerdedor()
      actualizarPanelMinas()
    }

    function actualizarPanelMinas() {
      let panel = document.getElementById("minas")
      panel.innerHTML = minas -marcas // marcas con valor inicial 0 
    }

    function verificarGanador() {
      /*
      Hay que verificar que todas las minas estén tapadas y que las demás
      estén descubiertas
      */
      for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
          if (tablero[c][f].estado != `descubierto`) { //Si la mina está cubeirta
            if (tablero[c][f].valor == -1) { //y es una mina
              //entonces vamos bien
              continue
            } else {
              //Si encuentra una celda cubierta, que no sea una mina, aún no se ha ganado
              return
            }
          }
        }
      }
      //Si al finalizar la comprobación, todas las celdas cubiertas son minas, entonces se ha ganado
      let tableroHTML = document.getElementById("tablero")
      tableroHTML.style.background = "green"
      enJuego = false // se cambia el booleano a false para avisar al sistema que el juego acabo 
      
    }

    function verificarPerdedor() {
      for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
          //Si hay una mina descubierta, entonces se ha perdido
          if (tablero[c][f].valor == -1) {
            if (tablero[c][f].estado == `descubierto`) {
              let tableroHTML = document.getElementById("tablero")
              tableroHTML.style.background = "red"
              enJuego = false
            
            }
          }
        }
      }
      if (enJuego) {
        return
      }
      //Hay que mostrar las demás minas que están ocultas
      for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
          if (tablero[c][f].valor == -1) {
            let celda = document.getElementById(`celda-${c}-${f}`)
            celda.innerHTML = `<i class="fas fa-bomb"></i>`
            celda.style.color = "black"
          }
        }
      }
    }

    /*
        Este servirá para dar un seguimiento lógico de 
        los elementos que el jugador no puede ver
    */
    function generarTableroJuego() {

      vaciarTablero() //para que no hayan interferencias con posibles partidas pasadas
      ponerMinas() //representadas númericamente con el número -1
      contadoresMinas() //son los números que dan pistas de las minas
      
    }

    /*
        Se encarga de poner el tablero en un estado inicial para insertar elementos
    */
    function vaciarTablero() {
      tablero = []
      for (let c = 0; c < columnas; c++) {
        tablero.push([])
      }
    }

    function ponerMinas()
    {
      
      for (let i = 0; i < minas; i++) {
        let c
        let f

        do {
          c = Math.floor(Math.random() * columnas) //Genera una columna aleatoria en el tablero
          f = Math.floor(Math.random() * filas) //Genera una fila aleatoria en el tablero
        } while (tablero[c][f]); //Se encarga de verificar que en la celda no haya una mina

        tablero[c][f] = {
          valor: -1 //el -1 representa una mina en el tablero matriz 
        } //Se inserta la mina en la celda disponible
      }
    }

    function contadoresMinas() {
      for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
          if (!tablero[c][f]) {
            let contador = 0
            //Se van a recorrer todas las celdas que están al rededor de la misma, 8 en total
            for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                  continue
                }
                try { //hay que evitar errores con las posiciones negativas
                  if (tablero[c + i][f + j].valor == -1) {
                    contador++
                  }
                } catch (e) {}
              }
            }
            tablero[c][f] = {  valor: contador
            }
          }
        }
      }
    }