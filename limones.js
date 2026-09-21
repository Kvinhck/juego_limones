let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");
const ALTURA_SUELO=40;
const ALTURA_PERSONAJE=100;
const ANCHO_PERSONAJE=500;
const ANCHO_LIMON=40;
const ALTO_LIMON=40;
let personajeX=canvas.width/2; 
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje=0;
let vidas=3;
let velocidadCaida=200;
let intervalo;


function iniciar(){
    intervalo=setInterval(bajarLimon,velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    pintarLimon();
    aparecerLimon();    
}

function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="purple";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    pintarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function pintarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON);
}

function bajarLimon(){
    limonY=limonY+10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(((limonX+ANCHO_LIMON)>personajeX && limonX<(personajeX+ANCHO_PERSONAJE)) && ((limonY+ALTO_LIMON)>personajeY && limonY<(personajeY+ALTURA_PERSONAJE))){
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarSpan("txtPuntaje",puntaje);
        if(puntaje==3){
            velocidadCaida=150;
            clearInterval(intervalo);
            intervalo=setInterval(bajarLimon,velocidadCaida);
        }else if(puntaje==6){
            velocidadCaida=100;
            clearInterval(intervalo);
            intervalo=setInterval(bajarLimon,velocidadCaida);
        }else if(puntaje==10){
            alert("¡Proceso perfecto! Cosechaste suficientes limones para una ronda interminable de tequilas. 🍋🥃 ¡Salud al campeón!");
            clearInterval(intervalo);
        }
    }
}

function detectarPiso(){
    if(limonY+ALTO_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarSpan("txtVidas",vidas);
    }
    if(vidas==0){
        alert("PERDISTEEE JA JA JA!");
        clearInterval(intervalo);
    }
}

function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}

function reiniciar(){
    vidas=3;
    puntaje=0;
    velocidadCaida=200;
    mostrarSpan("txtPuntaje", puntaje);
    mostrarSpan("txtVidas",vidas);
    actualizarPantalla();
    iniciar();
}

function desaparecerPersonaje(){
    ctx.clearRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}