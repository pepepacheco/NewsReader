/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint

// este objeto me gestiona los errores y toda la parte de la vista


$.ges_error = {};

$.ges_error.alert = function(titulo, mensaje){
    $.afui.loadContent("#error",false,false,"up");
    $("#error").empty();
    $("#error").append('<h2>'+titulo+'</h2>');
    $("#error").append('<br/><br/><p>'+mensaje+'</p>');
};

$.ges_error.noerror = function(){
    $.afui.clearHistory();
    $.afui.loadContent("#grid",false,false,"up");
};


$.ges_error.generarRejilla = function(array_canales){
    /*
    PANEL:
    <div class="panel" data-title="Item 1" id="item1">
                <p>This is detail view for Item 1</p>
    </div>

    REJILLA:
    <li>
        <div class="grid-photo-box">
            <a href="#id_canal">NOMBRE DEL CANAL</a>
        </div>
    </li>
    */
    var caja, lista;
    for (var i=0; i< array_canales.length; i++){
        $.ges_error.addChanelRejilla(array_canales[i]);
    }
};


$.ges_error.addChanelRejilla = function(canal, pos){    
    var caja, lista;
    var donde;
    if (pos === undefined) {
        donde = $.marcadores.lista.length-1;
    } else {
        donde = pos;
    }
    // para los paneles
    caja = $("<div></div>");
    caja.addClass("panel");
    caja.attr("data-tittle", canal.nombre);
    caja.attr("id","item"+donde);
    $("#paneles").append(caja);
    // para la rejilla
    lista = $("<li></li>");
    caja = $("<div></div>");
    caja.attr('onClick', '$.ges_error.refreshChannel('+donde+')');
    caja.addClass("grid-photo-box");
    caja.append("<a href='#item"+donde+"'>"+ canal.nombre+" </a>");
    lista.append(caja);
    $("#rejilla").prepend(lista);
};


$.ges_error.refreshChannel = function(posicion){
    var url = $.marcadores.lista[posicion].url;
    var nombre = $.marcadores.lista[posicion].nombre; 
    // hay que actualizar #itemPOSICION
    if ($.marcadores.lista[posicion].tipo === 'rss') {
        // es rss
        $.ajax({
            url: "http://query.yahooapis.com/v1/public/yql",
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                q: "select * from rss where url=\""+url+"\"",
                format: "json"
            },
            success: function( response ) { 
                // Aquí proceso el código
                var i;
                var caja;
                // limpiamos la caja donde van las noticias
                $("#item"+posicion).empty();
                // Guardo el ARRAY de noticias de este canal
                var lista = response.query.results.item; 
                for (i=0;i<response.query.count;i++){
                    caja = $("<div></div>");
                    caja.addClass("well well-sm");
                    caja.attr("data-tittle", nombre);
                    caja.append("<h3>"+lista[i].title+"</h3><br/>");
                    if (lista[i].description!==undefined){
                        caja.append("<p>"+lista[i].description+"</p>");
                    }
                    caja.append("<p> <a href='"+lista[i].link+"'>Pulse aquí para abrir la noticia.</a></p>");
                    caja.append("<p>"+lista[i].pubDate+"</p>");                  
                    $("#item"+posicion).append(caja);
                }
            },
            error: function(XHR, textStatus, errorThrown) {
                $.ges_error.alert('Error de conexión', 'No ha sido posible añadir el canal, compruebe su conexión a Internet.');
            },
            timeout: 3000
        });
    } else {
        console.log("ATOM");
        // debe ser atom
        $.ajax({
            url: "http://query.yahooapis.com/v1/public/yql",
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                q: "select * from atom where url=\""+url+"\"",
                format: "json"
            },
            success: function( response ) { 
                // Aquí proceso el JSON
                var i;
                var caja;
                // Guardo el ARRAY de noticias de este canal
                var lista = response.query.results.entry;
                var n_noticias = response.query.count;
                // antes de añadir, hay que borrar lo antiguo
                $("#item"+posicion).empty();
                for (i=0;i<n_noticias;i++) {
                    caja = $("<div></div>");
                    caja.addClass("well well-sm");
                    caja.append("<h3>"+lista[i].title+"</h3><br/>");
                    if (lista[i].summary.content === undefined) {
                        caja.append("<p>"+lista[i].summary+"</p>");
                    } else {
                         caja.append("<br>"+lista[i].summary.content+"<br>");
                    }
                    caja.append("<p>"+lista[i].updated+"</p>");
                    caja.append("<p> <a href='"+lista[i].id+"'>Pulse aquí para abrir la noticia.</a></p>");

                    $("#item"+posicion).append(caja);
                }
            },
            error: function(XHR, textStatus, errorThrown) {
                $.ges_error.alert('Error de conexión', 'No ha sido posible añadir el canal, compruebe su conexión a Internet.');
            },
            timeout: 3000
        });
    }
};








