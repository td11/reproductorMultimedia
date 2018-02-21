//----------VARIABLES GLOBALES----------
var seleccion, pistaSeleccionada = 0,
    estiloDeseleccion = document.getElementsByClassName('archivo')[1].style;

var listadoArchivos = ['Media/Audio/Papa Roach - Born For Greatness.mp3', 'Media/Videos/BatmanOpening.webm', 'Media/Audio/Papa Roach-Falling Apart.mp3', 'Media/Videos/mgs2.ogv', 'Media/Audio/Papa Roach - Last Resort.mp3', 'Media/Videos/VideoSubtitulado.mp4'];
var listaReproduccion = document.getElementsByClassName('archivo');
var pantallaContenido = document.getElementById('contenido');
var cancionSeleccionada;
var contenedorSvg, svgPlay, svgPause, dataSVGPlay, dataSVGPause;
var comprobarReproduccion = true;
//--------------------------------------

cargaScript();

/**
 * Carga el script inicial.
 */
function cargaScript() {

    cargaEventos();


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


            seleccionArchivo();

            contenido.setAttribute('src', listadoArchivos[i]);
            cancionSeleccionada = i;
            eliminaItem(pantallaContenido);

            if (i == 5) {
                var subtitulos = document.createElement('track');
                subtitulos.setAttribute('src','Media/Videos/subtitulos.vtt');
                subtitulos.setAttribute('label','Subtitulo Español');
                subtitulos.setAttribute('kind','subtitles');
                subtitulos.setAttribute('srclang','es');
                subtitulos.setAttribute('default',''); 
                contenido.appendChild(subtitulos);
            }

            pantallaContenido.appendChild(contenido);

            seleccion = document.getElementById('contenido').children[0];

        });
    }

    document.getElementById('btnPlay').addEventListener('click', function () {

        if (seleccion.paused) {
            seleccion.play();
        }

        comprobarReproduccion = true;

        seleccion.ontimeupdate = function () {

            document.getElementById('tiempoTranscurrido').innerHTML = Math.floor(seleccion.currentTime / 60) + ':' + Math.floor(seleccion.currentTime % 60) + ' / ' + Math.floor(seleccion.duration / 60) + ':' + Math.floor(seleccion.duration % 60);
            document.getElementById('barraTiempo').max = seleccion.duration;
            document.getElementById('barraTiempo').value = seleccion.currentTime;

            if (seleccion.ended) {
                reproducirSiguiente();
            }

        }


    }, false);

    document.getElementById('btnPause').addEventListener('click', function () {

        comprobarReproduccion = false;
        seleccion.pause();

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

function comprobarNumeroDeCanciones() {
    if (cancionSeleccionada > 5) {
        cancionSeleccionada = 0;
    } else {
        cancionSeleccionada++;
    }
}

function reproducirSiguiente() {
    comprobarNumeroDeCanciones();
    var contenido = document.getElementById('contenido');
    var siguienteCancion = document.getElementById('panel').children[cancionSeleccionada];

    switch (siguienteCancion.getAttribute('tipo')) {
        case 'video':
            contenido = document.createElement('video');
            break;
        case 'audio':
            contenido = document.createElement('audio');
            break;
    }

    seleccionArchivo();
    contenido.setAttribute('src', listadoArchivos[cancionSeleccionada]);
    eliminaItem(pantallaContenido);
    pantallaContenido.appendChild(contenido);

    seleccion = document.getElementById('contenido').children[0];
    seleccion.play();

    seleccion.ontimeupdate = function () {

        document.getElementById('tiempoTranscurrido').innerHTML = Math.floor(seleccion.currentTime / 60) + ':' + Math.floor(seleccion.currentTime % 60) + ' / ' + Math.floor(seleccion.duration / 60) + ':' + Math.floor(seleccion.duration % 60);
        document.getElementById('barraTiempo').max = seleccion.duration;
        document.getElementById('barraTiempo').value = seleccion.currentTime;

        if (seleccion.ended) {
            reproducirSiguiente();
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


/**
 * Limpia la seleccion de la lista de reproduccion.
 */
function seleccionArchivo() {

    var listado = document.getElementsByClassName('archivo');

    for (let i = 0; i < listado.length; i++) {
        if (listado[i].getAttribute('seleccionada') == 'false') {
            //listado[i] = estiloDeseleccion;
        } else {
            //listado[i].style.backgroundColor = 'grey';
            //listado[i].style.color = 'white';
        }
    }

}
