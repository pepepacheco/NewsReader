/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint

var ges_error = {};

ges_error.alert = function(titulo, mensaje){
    $.afui.loadContent("#error",false,false,"up");
    $("#error").empty();
    $("#error").append('<h2>'+titulo+'</h2>');
    $("#error").append('<p>'+mensaje+'</p>');
};

ges_error.noerror = function(){
    $.afui.clearHistory();
    $.afui.loadContent("#grid",false,false,"up");
};