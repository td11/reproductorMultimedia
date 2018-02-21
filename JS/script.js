//----------VARIABLES GLOBALES----------
var seleccion, pistaSeleccionada = 0,
    estiloDeseleccion = document.getElementsByClassName('archivo')[1].style;

var listadoArchivos = ['Media/Audio/Papa Roach - Born For Greatness.mp3', 'Media/Videos/BatmanOpening.webm', 'Media/Audio/Papa Roach-Falling Apart.mp3', 'Media/Videos/mgs2.ogv', 'Media/Audio/Papa Roach - Last Resort.mp3', 'Media/Videos/VideoSubtitulado.mp4'];
var listaReproduccion = document.getElementsByClassName('archivo');
var pantallaContenido = document.getElementById('contenido');
var cancionSeleccionada;
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
            var caratula;
            limpiarListaEstilo();
            listaReproduccion[i].style.backgroundColor = 'grey';
            listaReproduccion[i].style.color = 'white';

            switch (this.getAttribute('tipo')) {
                case 'video':
                    contenido = document.createElement('video');
                    break;
                case 'audio':
                    contenido = document.createElement('audio');
                    break;
            }

            caratula = document.createElement('img');
            caratula.setAttribute('src', 'Media/Images/caratula.gif');
            contenido.setAttribute('src', listadoArchivos[i]);
            cancionSeleccionada = i;
            eliminaItem(pantallaContenido);

            if (this.getAttribute('tipo') == 'audio')
                pantallaContenido.appendChild(caratula);
            
            if (i == 5) {
                var subtitulos = document.createElement('track');
                subtitulos.setAttribute('src', 'Media/Videos/subtitulos.vtt');
                subtitulos.setAttribute('label', 'Subtitulo Español');
                subtitulos.setAttribute('kind', 'subtitles');
                subtitulos.setAttribute('srclang', 'es');
                subtitulos.setAttribute('default', '');
                contenido.appendChild(subtitulos);
            }

            pantallaContenido.appendChild(contenido);

            if (this.getAttribute('tipo') == 'audio')
                seleccion = document.getElementById('contenido').children[1];
            else
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
    limpiarListaEstilo();
    comprobarNumeroDeCanciones();
    var contenido = document.getElementById('contenido');
    var siguienteCancion = document.getElementById('panel').children[cancionSeleccionada];
    var caratula = document.createElement('img');
    
    listaReproduccion[cancionSeleccionada].style.backgroundColor = 'grey';
    listaReproduccion[cancionSeleccionada].style.color = 'white';

    caratula.setAttribute('src', 'Media/Images/caratula.gif');
    
    switch (siguienteCancion.getAttribute('tipo')) {
        case 'video':
            contenido = document.createElement('video');
            break;
        case 'audio':
            contenido = document.createElement('audio');
            break;
    }

    contenido.setAttribute('src', listadoArchivos[cancionSeleccionada]);
    eliminaItem(pantallaContenido);
    
    if (siguienteCancion.getAttribute('tipo') == 'audio') 
        pantallaContenido.appendChild(caratula);
    
    
    pantallaContenido.appendChild(contenido);

    
    if (siguienteCancion.getAttribute('tipo') == 'audio')    
        seleccion = document.getElementById('contenido').children[1];
    else 
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
            //listado[i].style.backgroundColor = 'white';
            //listado[i].style.color = 'black';
        } else {
            // listado[i].style.backgroundColor = 'grey';
            //listado[i].style.color = 'white';
        }
    }

}

/* Limpiar estilos de la lista de multimedia */
function limpiarListaEstilo() {
    var listado = document.getElementsByClassName('archivo');

    for (let i = 0; i < listado.length; i++) {
        listado[i].style.backgroundColor = 'grey';
        listado[i].style.color = 'black';
    }
}
