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
const divCartasComputador = document.querySelector('#computadora-cartas')

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

do{
    const carta = pedirCarta();

 puntosComputadora = puntosComputadora + valorCarta(carta);

 console.log(puntosComputadora)

 puntosHTML[1].innerHTML = puntosComputadora

// <img class="carta" src="/assets/cartas/10C.png"> 

const imgCarta = document.createElement('img')
imgCarta.src = `/assets/cartas/${carta}.png`;
imgCarta.classList.add('carta')
divCartasComputador.append(imgCarta)


if(puntosMinimos > 21){
    break;
}

} while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))
  

    if (puntosComputadora === puntosJugador){
        alert('Empate')
    }else if(puntosComputadora > 21){
        alert('Ganastes')
    }else if(puntosMinimos > 21){
        alert('perdiste')
    }else{
        console.log('computador gana')
    }   

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
    alert('Lo siento, Perdiste')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora( puntosJugador)

}else if( puntosJugador === 21){
    console.warn('21, Ganaste')
    alert('21 puntos, ¡Ganaste!')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora( puntosJugador)

}
2
})



btnDetener.addEventListener('click',()=>{

    btnPedir.disabled = true
    btnDetener.disabled = true

    turnoComputadora(puntosJugador)
})


btnNuevo.addEventListener('click',()=>{
    deck = []
    deck = crearDeck()

    btnPedir.disabled = false
    btnDetener.disabled = false

  puntosJugador = 0,
  puntosComputadora = 0; 
  
  divCartasComputador.innerHTML = '';
  divCartasJugador.innerHTML  = '';

  puntosHTML[0].innerText= 0;
  puntosHTML[1].innerText= 0;

})