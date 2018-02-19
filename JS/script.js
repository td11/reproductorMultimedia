//----------VARIABLES GLOBALES----------
var seleccion, pistaSeleccionada = 1,
    estiloDeseleccion = document.getElementsByClassName('archivo')[1].style;

var listadoArchivos = ['Media/Audio/Papa Roach - Born For Greatness.mp3', 'Media/Videos/BatmanOpening.mp4', 'Media/Audio/Papa Roach-Falling Apart.mp3', 'Media/Videos/mgs2.mp4', 'Media/Audio/Papa Roach - Last Resort.mp3', 'Media/Videos/trailer_deadpool.mp4'];
var listaReproduccion = document.getElementsByClassName('archivo');
var pantallaContenido = document.getElementById('contenido');
var acc = document.getElementsByClassName("accordion");
var i, cancionSeleccionada;
var contenedorSvg, svgPlay, svgPause, svgVolumenUp, svgVolumenDown, svgAdelantar;
//--------------------------------------

cargaScript();

/**
 * Carga el script inicial.
 */
function cargaScript() {

    seleccionArchivo();
    cargaEventos();

    //Menu acordeon
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

}

function inicializarSVG() {
    //= '<object data="Media/Images/play.svg" type="image/svg+xml"><img src="Media/Images/icons8-play-26.png" /></object>';
    contenedorSvg = document.createElement('object');
    svgPlay = document.createElement('img');
    svgPlay.setAttribute('src', 'Media/Images/icons8-play-26.png');
    svgPause = document.createElement('img');
    svgPause.setAttribute('src', 'Media/Images/iconopause.png');
    svgAdelantar = document.createElement('img');
    svgAdelantar.setAttribute('src', 'Media/Images/adelantaricono.png');
    svgVolumenUp = document.createElement('img');
    svgVolumenUp.setAttribute('src', 'Media/Images/up_volumen.png');
    svgVolumenDown = document.createElement('img');
    svgVolumenDown.setAttribute('src', 'Media/Images/low_volume.png');
}

/* Alterna la visibilidad del boton svg Play y Pause */
function svgPlayPause() {

}

/**
 * Carga los eventos de los botones.
 */
function cargaEventos() {

    for (let i = 0; i < listaReproduccion.length; i++) {
        listaReproduccion[i].addEventListener('click', function () {

            var contenido;

            switch (this.getAttribute('tipo')) {
                case 'video':
                    contenido = document.createElement('video');
                    break;
                case 'audio':
                    contenido = document.createElement('audio');
                    break;
            }

            document.getElementById('btnPlay').append = 'Play';

            seleccionArchivo();
            contenido.setAttribute('src', listadoArchivos[i]);
            contenido.setAttribute('id', 'archivoReproducir');
            cancionSeleccionada = i;
            eliminaItem(pantallaContenido);
            pantallaContenido.appendChild(contenido);

            seleccion = document.getElementById('contenido').children[0];

        });
    }

    document.getElementById('btnPlay').addEventListener('click', function () {
        if (seleccion.paused) {
            seleccion.play();
            this.textContent = 'Pause';
        } else {
            seleccion.pause();
            this.textContent = 'Play';
        }

        seleccion.ontimeupdate = function () {

            document.getElementById('tiempoTranscurrido').innerHTML = Math.floor(seleccion.currentTime / 60) + ':' + Math.floor(seleccion.currentTime % 60) + ' / ' + Math.floor(seleccion.duration / 60) + ':' + Math.floor(seleccion.duration % 60);
            document.getElementById('barraTiempo').max = seleccion.duration;
            document.getElementById('barraTiempo').value = seleccion.currentTime;

            if (seleccion.ended) {
                barraDuracion.setAttribute('value', seleccion.currentTime);
                //reproducirSiguiente();
            }

        }


    }, false);

    document.getElementById('btnAdelantar').addEventListener('click', function () {
        seleccion.currentTime = seleccion.currentTime + 10;
    }, false);

    document.getElementById('btnSubirVolumen').addEventListener('click', function () {
        seleccion.volume += 0.1;
        document.getElementById('volumen').value = seleccion.volume;
    }, false);

    document.getElementById('btnBajarVolumen').addEventListener('click', function () {
        seleccion.volume -= 0.1;
        document.getElementById('volumen').value = seleccion.volume;
    }, false);

    document.getElementById('volumen').addEventListener('change', function (e) {
        seleccion.volume = e.target.value;
    });

}


function reproducirSiguiente() {
    var contenido = document.getElementById('contenido');
    var siguienteCancion = document.getElementById('')

    switch (this.getAttribute('tipo')) {
        case 'video':
            contenido = document.createElement('video');
            break;
        case 'audio':
            contenido = document.createElement('audio');
            break;
    }

    document.getElementById('btnPlay').textContent = 'Play';

    seleccionArchivo();
    contenido.setAttribute('src', listadoArchivos[i]);
    contenido.setAttribute('id', 'archivoReproducir');
    cancionSeleccionada = i;
    eliminaItem(pantallaContenido);
    pantallaContenido.appendChild(contenido);

    seleccion = document.getElementById('contenido').children[0];
}

/**
 * Elimina el item que recibe por parámetro.
 */

function eliminaItem(item) {

    if (item.hasChildNodes()) {
        while (item.childNodes.length >= 1) {
            item.removeChild(item.firstChild);
        }
    }

}

/**
 * Limpia la seleccion de la lista de reproduccion.
 */
function seleccionArchivo() {

    var listado = document.getElementsByClassName('archivo');

    for (let i = 0; i < listado.length; i++) {
        if (listado[i].id == pistaSeleccionada) {
            listado[i].style.backgroundColor = 'gray';
            listado[i].style.color = 'white';
        } else {
            listado[i].style = estiloDeseleccion;
        }
    }

}

/**
 * Elimina el item que recibe por parámetro.
 */

function eliminaItem(item) {

    if (item.hasChildNodes()) {
        while (item.childNodes.length >= 1) {
            item.removeChild(item.firstChild);
        }
    }

}
