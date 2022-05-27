// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}


// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validacion
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');

        return; // Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    };

    // Agregar al arreglo de tweets
    tweets = [ ...tweets, tweetObj ];

    // Una vez agregado vamos a crear el HTML
    crearHTML();

    // Reset Formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    if (document.querySelectorAll('.error').length === 0) {
        const mensajeError = document.createElement('P');
        mensajeError.textContent = error;
        mensajeError.classList.add('error');

        // Insertarlo en el contenido
        const contenido = document.querySelector('#contenido');
        contenido.appendChild(mensajeError);

        // Elimina la alerta
        setTimeout(() => {
            mensajeError.remove();
        }, 2600);
    }
}

// Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tw => {
            // Agregar un boton de eliminar 
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Agregar la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tw.id);
            }

            // Crear el HTML
            const li = document.createElement('LI');

            // Agregar texto
            li.textContent = tw.tweet;

            // Agregar el boton
            li.appendChild(btnEliminar);
            
            // Agregar a la lista
            listaTweets.appendChild(li);
        } )
    }

    sincronizarStorage();
}

// Agrega los tweets actuales a LocalStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar un Tweet
function borrarTweet(id){
    tweets = tweets.filter(tw => tw.id !== id);
    crearHTML();
}

// Limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}