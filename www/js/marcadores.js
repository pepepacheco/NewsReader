/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint

/*
var marcadores = [ 
    {nombre:"Ideal Jaén", url:"http://....", tipo:"atom"},
    {nombre:"Slashdot", url:"http://....", tipo:"rss"},
    {nombre:"CNN", url:"http://....", tipo:"rss"}
];
*/

$.marcadores = {};

$.marcadores.lista = [];

$.marcadores.add = function(nombre, url) {
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            q: "select * from rss where url=\""+url+"\"",
            format: "json"
        },
        success: function( response ) {
            if (response.query.count >0) {
                // añadir RSS
                var alimentador = {
                    "nombre":nombre, 
                    "url":url, 
                    "tipo":"rss"};
                $.marcadores.lista.push(alimentador);
                $.ges_error.noerror();
            } else {
                // probar con atom               
                $.ajax({
                    url: "http://query.yahooapis.com/v1/public/yql",
                    jsonp: "callback",
                    dataType: "jsonp",
                    data: {
                        q: "select * from atom where url=\""+url+"\"",
                        format: "json"
                    },
                    success: function( response ) {
                        if (response.query.count >0) {
                            // añadir ATOM
                            var alimentador = {
                                "nombre":nombre, 
                                "url":url, 
                                "tipo":"atom"};
                            $.marcadores.lista.push(alimentador);
                            $.ges_error.noerror();
                        } else {
                            // ERROR
                            $.ges_error.alert('Error al procesar el canal', 'No he podido comprobar el tipo de canal RSS-ATOM. Compruebe que la URL es correcta.');
                        }
                    }
                });
            }
        },
        error: function(XHR, textStatus, errorThrown) {
            $.ges_error.alert('Error de conexión', 'No ha sido posible añadir el canal, compruebe su conexión a Internet.');
        },
        timeout: 3000
    });
};

// Vuelca a localStorage los marcadores
$.marcadores.save = function(){
    // TO-DO
};

// Carga de localStorage los marcadores
$.marcadores.load = function(){
    // lo inventamos para propósitos de desarrollo...
    $.marcadores.lista =  [
        {nombre:"Ideal Jaén", url:"http://www.ideal.es/jaen/rss/atom/portada",
        tipo:"atom"},
        {nombre:"Slashdot", url:"http://rss.slashdot.org/Slashdot/slashdotLinuxAtom", tipo:"atom"},
        {nombre:"CNN", url:"http://rss.cnn.com/rss/edition.rss", tipo:"rss"}
    ];
};












