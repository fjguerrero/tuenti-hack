/**
 * @author Francisco Javier Guerrero
 * @version 0.1
 * @url  http://fjguerrero.com/blog/hack-para-realizar-copias-de-seguridad-de-tus-fotos-en-tuenti
 * Pequeno script para automatizar las descargas de albunes de Tuenti.com
 * 
 * Copyright (c) 2013 Francisco Javier Guerrero
 * 
 * Permission is hereby granted, free of charge, to any
 * person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of
 * the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * Copyright (c) 2013 Francisco Javier Guerrero
 * 
 * Se autoriza por la presente, de forma gratuita, a cualquier
 * persona que haya obtenido una copia de este software y 
 * archivos asociados de documentación (el "Software"), para tratar en el
 * Software sin restricción, incluyendo sin ninguna limitación en lo que concierne
 * los derechos para usar, copiar, modificar, fusionar, publicar,
 * distribuir, sublicenciar, y / o vender copias de este
 * Software, y para permitir a las personas a las que se les proporcione el Software para 
 * hacer lo mismo, sujeto a las siguientes condiciones:
 * 
 * El aviso de copyright anterior y este aviso de permiso
 * tendrá que ser incluido en todas las copias o partes sustanciales de
 * este Software.
 * 
 * EL SOFTWARE SE ENTREGA "TAL CUAL", SIN GARANTÍA DE NINGÚN
 * TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO SIN LIMITARSE A GARANTÍAS DE
 * MERCANTIBILIDAD, CAPACIDAD DE HACER Y DE NO INFRACCIÓN DE COPYRIGHT. EN NINGÚN 
 * CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE 
 * NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, 
 * YA SEA EN UN LITIGIO, AGRAVIO O DE OTRO MODO, 
 * DERIVADAS DE, OCASIONADAS POR CULPA DE O EN CONEXION CON EL
 * SOFTWARE O SU USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.
 */

//IDs de los elementos a usar en el script [Default = photo_nav_next, photo_image]
var photoNavNext = "photo_nav_next", photoImage = "photo_image";

//Variables
var elementoFoto = null, urlFotoActual = "", urlFotoAnterior = "", intervalo = null;
//Numero de foto para comenzar [Default = 0]
var contador = 0;
//Velocidad de clickeo en foto en milisegundos, ajustar dependiendo de tu conexión. [Default = 3000ms]
var velocidad = 3000;

function intervalDescargarFoto() {
    try {
        elementoFoto = document.getElementById(photoImage);
        urlFotoActual = elementoFoto.getAttribute("src");

        if (urlFotoActual != urlFotoAnterior) {
            urlFotoAnterior = urlFotoActual;

            var nombre = (++contador) + ".jpg";

            while (nombre.length < 9) {
                nombre = "0" + nombre;
            }

            var enlace = document.createElement("a");
            enlace.href = urlFotoActual;
            enlace.download = nombre;
            enlace.target = "_blank";

            var evento = document.createEvent("Event");
            evento.initEvent("click", true, true);

            enlace.dispatchEvent(evento);
            (window.URL || window.webkitURL).revokeObjectURL(enlace.href);

            console.log("Foto descargada: " + nombre + " [" + urlFotoActual + "]");

            document.getElementById(photoNavNext).dispatchEvent(evento);
        }
    } catch(e) {
        console.log("ERROR: " + e);
    }
}

//Intervalo de ejecucion
intervalo = setInterval(intervalDescargarFoto, velocidad);
