/*
club
diaminds
hearts
spades
*/

let deck = []
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K']
let puntosJugador = 0,
    puntosComputadora = 0;

let puntosHTML = document.querySelectorAll('small')


//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador = document.querySelector('#jugador-cartas')


const crearDeck = ()=>{
    for( let i = 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo)
        }
    }
    for(let tipo of tipos){
        for(esp of especiales){
            deck.push(esp + tipo)
        }
    }
    
    //para desornedar el mazo se ocupa UNDERSCORE.JS una libreria
    deck = _.shuffle(deck) //ver documentacion para el shuffle
    return deck
}

crearDeck();


const pedirCarta = ()=>{

    if (deck.length === 0){
        throw 'No hay cartas en el deck'
    }
    const carta = deck.pop()
    return carta;

}

//pedirCarta()

const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length - 1);

return  (isNaN(valor)) ? ((valor === 'A') ? 11:10): valor*1

}


//Turno computadora

const turnoComputadora = (puntosMinimos) => {

}




//eventos

btnPedir.addEventListener('click', () =>{
 const carta = pedirCarta();

 puntosJugador = puntosJugador + valorCarta(carta);

 console.log(puntosJugador)

 puntosHTML[0].innerHTML = puntosJugador

// <img class="carta" src="/assets/cartas/10C.png"> 

const imgCarta = document.createElement('img')
imgCarta.src = `/assets/cartas/${carta}.png`;
imgCarta.classList.add('carta')
divCartasJugador.append(imgCarta)

if(puntosJugador>21){
    console.warn('Lo siento, Perdiste');
    btnPedir.disabled = true

}else if( puntosJugador === 21){
    console.warn('21, Ganaste')
    btnPedir.disabled = true
}

})