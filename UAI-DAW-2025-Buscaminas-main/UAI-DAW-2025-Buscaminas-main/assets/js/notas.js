var bandera = false;
var minutos
var segundos

function start(){
    console.log(bandera)
    if (bandera == false){
        document.getElementById("contador_min").innerHTML = "00:";
         segundos = 59
         minutos  = 24
    }
    bandera = false;

    const Segundos =  () => {
        document.getElementById('contador_seg').innerHTML = (segundos)
         segundos = segundos - 1

        if (segundos == 0){
            segundos = 59
            minutos -= 1
        }
    }
    
    intervSec = setInterval(Segundos, 1000) 
    interMin = setInterval(Minutos, 60000)
}

function stop(){
    bandera = true;
    clearInterval(intervSec);
    clearInterval(interMin);
}

function reset(){
    stop();
    document.getElementById("contador_min").innerHTML = "25 :";
    segundos = 59
    minutos  = 24
    document.getElementById("contador_seg").innerHTML = " 00"
    bandera = false 
}
    