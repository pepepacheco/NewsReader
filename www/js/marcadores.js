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
                $.ges_error.addChanelRejilla(alimentador);
                $.marcadores.save();
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
                            $.marcadores.lista.push(alimentador);                            $.ges_error.addChanelRejilla(alimentador);
                            $.marcadores.save();                      
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
    localStorage.setItem('canales',JSON.stringify($.marcadores.lista));
    // $.ges_error.generarRejilla($.marcadores.lista);
    $.ges_error.noerror();
};

// Carga de localStorage los marcadores
$.marcadores.load = function(){
    // lo inventamos para propósitos de desarrollo...
    /*$.marcadores.lista =  [
        {nombre:"Ideal Jaén", url:"http://www.ideal.es/jaen/rss/atom/portada",
        tipo:"atom"},
        {nombre:"Slashdot", url:"http://rss.slashdot.org/Slashdot/slashdotLinuxAtom", tipo:"atom"},
        {nombre:"CNN", url:"http://rss.cnn.com/rss/edition.rss", tipo:"rss"}
    ];*/
    $.marcadores.lista = JSON.parse(localStorage.getItem('canales'));
    if ($.marcadores.lista === null) {
        $.marcadores.lista = new Array(0);
        /* $.marcadores.lista = [
            {"nombre":"Diario Montañés","url":"http://www.eldiariomontanes.es/rss/atom/","tipo":"atom"},{"nombre":"Ideal Jaén","url":"http://www.ideal.es/jaen/rss/atom/portada","tipo":"atom"},{"nombre":"CNN","url":"http://rss.cnn.com/rss/edition.rss","tipo":"rss"},{"nombre":"Barrapunto","url":"http://rss.slashdot.org/Slashdot/slashdotLinuxAtom","tipo":"atom"}];
        $.marcadores.save();
        $.ges_error.generarRejilla($.marcadores.lista);*/
    } else {
        $.ges_error.generarRejilla($.marcadores.lista);
    }
};












