// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
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

    console.log('Agregando Tweet');
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