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

var marcadores = {};

marcadores.lista = [];

marcadores.add = function(nombre, url) {
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
                marcadores.lista.push(alimentador);
                ges_error.noerror();
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
                            marcadores.lista.push(alimentador);
                            ges_error.noerror();
                        } else {
                            // ERROR
                            ges_error.alert('Error al procesar el canal', 'No he podido comprobar el tipo de canal RSS-ATOM. Compruebe que la URL es correcta.');  
                        }
                    }
                });
            }
        }
    });
};

// Vuelca a localStorage los marcadores
marcadores.save = function(){
    
};

// Carga de localStorage los marcadores
marcadores.load = function(){
    
};












