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
    $("#rejilla").append(lista);
};


$.ges_error.refreshChannel = function(posicion){
    // hay que actualizar #itemPOSICION
    if ($.marcadores.lista[posicion].tipo === 'rss') { //rss
        
    } else { // atom
        
    }
};








