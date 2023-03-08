
// Variables
const formulario = document.querySelector('#formulario')
const btnEnviar = document.querySelector('#enviar');


// Variables Campos

const nombre = document.querySelector('#nombre')
const telefono = document.querySelector('#telefono')
const email = document.querySelector('#email')
const tipo = document.querySelector('#tipo')
const mensaje = document.querySelector('#mensaje')
const errores = document.querySelector('#errores')

const erEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();

function eventListeners() {


    document.addEventListener('DOMContentLoaded', iniciarApp);


    // Campos formulario
    nombre.addEventListener('blur', validarCampo);
    telefono.addEventListener('blur', validarCampo);
    email.addEventListener('blur', validarCampo);
    tipo.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);

}


// Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('boton-desactivado');
}


function validarCampo(e) {


    if(e.target.value.length > 0) {

        // Limpiar errores
        e.target.classList.remove('input-error');
        e.target.classList.add('input-exito');
    } else {
        e.target.classList.remove('input-exito');
        e.target.classList.add('input-error');
        mostrarAlerta('Todos los campos son obligatorios', 'error');
    }

    if(e.target.type === 'email'){
        if(!erEmail.test(e.target.value)) {
            e.target.classList.remove('input-exito');
            e.target.classList.add('input-error');
            mostrarAlerta('El Email no es válido', 'error')
        }
    }


    if (erEmail.test(email.value) && nombre.value !== '' && telefono.value !== '' && tipo.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false
        btnEnviar.classList.remove('boton-desactivado');
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('boton-desactivado');
    }
}

function mostrarAlerta(mensaje, tipo) {

    switch (tipo) {
        case 'error':
            const existeError = document.querySelector('.mensaje-error');
            if (!existeError) {
                const mensajeError = document.createElement('p')
                mensajeError.classList.add('mensaje-error')

                // mensaje de error
                mensajeError.textContent = mensaje

                formulario.appendChild(mensajeError);

                setTimeout(() => {
                    mensajeError.remove();
                }, 3000);

            }
            break;

        case 'exito':
            const existeExito = document.querySelector('.mensaje-exito');
            if (!existeExito) {
                "El nombre es obligatorio"
                const mensajeExito = document.createElement('p')
                mensajeExito.classList.add('mensaje-exito')

                // mensaje de error
                mensajeExito.textContent = mensaje
                formulario.appendChild(mensajeExito);

                setTimeout(() => {
                    mensajeExito.remove();
                    resetearFormulario()
                }, 5000);

            }
            break;
    }
}

function enviarEmail(e) {
    e.preventDefault();
    // Mostrar la alerta de exito 
    mostrarAlerta('El email ha sido enviado con éxito', 'exito')
}

// Funcion que resetea el formulario
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
    eliminarBordes();
}

function eliminarBordes() {
    nombre.classList.remove('input-exito');
    telefono.classList.remove('input-exito');
    email.classList.remove('input-exito');
    tipo.classList.remove('input-exito');
    mensaje.classList.remove('input-exito');
}

