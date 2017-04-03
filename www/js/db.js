/*jslint browser:true, devel:true */
/*global $:false */

var db = {};

db.SQLite = window.cordova.require('cordova-sqlite-plugin.SQLite');

db.sqlite = new db.SQLite('example');

db.sqlite.open(function(err) {
  if (err) throw err;
  db.sqlite.query('CREATE TABLE IF NOT EXISTS alimentadores(nombre,tipo,url)', function(err, res) {
    if (err) throw err;
    console.log("hecho");
  });
});
