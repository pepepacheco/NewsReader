/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint

/**
    Nuestra "clase" alimentadores.
    -- "cuelga" de window.document.feed --
 */

$.feed = {};

/**
    Función que carga un alimentador en una caja.
    
    Parámetros:
    *url: La URL del XML donde está el RSS o el ATOM
    *tipo: [rss|atom]
    *caja: el id (jQuery, con "#") del DIV donde vamos a escribir el resultado
*/
$.feed.cargarAlimentador = function (url, tipo, caja){
    // Using YQL and JSONP
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql",
        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",
        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
        // Tell YQL what we want and that we want JSON
        data: {
            q: "select * from "+tipo+" where url=\""+url+"\"",
            format: "json"
        },
        // Work with the response
        success: function( response ) {
            var cantidad = response.query.count;
            var arrayNoticias = response.query.results.item;
            
            // vacío mi caja para ir escribiendo noticias           
            $(caja).empty();
            
            // para cada ITEM tengo: description, link, pubDate, title
            for (var i=0; i<cantidad; i++){
                var item = $("<div></div>");
                
                var ancla = $("<a href='"+arrayNoticias[i].link+"' target='_blank' data-rel='external'>"+arrayNoticias[i].title+"</a>");
                
                item.append(ancla);
                
                var fecha = $("<p>"+arrayNoticias[i].pubDate+"</p>");
                
                item.append(fecha);
                
                var descipcion = $("<p><i>" + arrayNoticias[i].description + "</i></p>");
                
                item.append(descipcion);
                                
                $(caja).append(item);
            }
        }
    });
};

$.feed.cargarAlimentador("http://www.ideal.es/jaen/rss/2.0/portada", "rss", "#item1" );


                         
                         

                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         







