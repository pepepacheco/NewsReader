/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint

var log = window.log = function(message) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(message));
  document.body.appendChild(div);
};

window.addEventListener('error', function(err) {
  log(err.message);
}, false);

document.addEventListener('deviceready', onDeviceReady, false);


/** Al cargar la aplicación **/ 
function onDeviceReady() {
    // cargar marcadores
    $.marcadores.load();
    generarRejilla();
    /* var SQLite = window.cordova.require('cordova-sqlite-plugin.SQLite');

    var sqlite = new SQLite('waste.db');

    sqlite.open(function(err) {
        if (err) {
            console.log(err);
        } else {
            sqlite.query('CREATE TABLE DataM (Name VARCHAR (100) NOT NULL, Price DECIMAL NOT NULL, Quantity INT NOT NULL, Date DATETIME NOT NULL', [], function(err, res) {
                if (err) throw err;
                console.log(res.rows[0].solution);
            });
        }
    });*/

/*    
  log('SQLite Example');
  var SQLite = window.cordova.require('cordova-sqlite-plugin.SQLite');
  var sqlite = new SQLite('example');
  sqlite.open(function(err) {
    log('Connection opened');
    if (err) throw err;
    sqlite.query('SELECT ? + ? AS solution', [2, 3], function(err, res) {
      if (err) throw err;
      log(JSON.stringify(res));
      // log(res.rows[0].solution);
      sqlite.close(function(err) {
        if (err) throw err;
        log('Connection closed');
        SQLite.deleteDatabase('example', function(err) {
          if (err) throw err;
          log('Database deleted');
        });
      });
    });
  });*/
}


function addChannel(){
    $.marcadores.add($("#nombreAli").val(), $("#urlAli").val() );
}

function generarRejilla(){
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
    for (var i=0; i< $.marcadores.lista.length; i++){
        // para los paneles
        caja = $("<div></div>");
        caja.addClass("panel");
        caja.attr("data-tittle", $.marcadores.lista[i].nombre);
        caja.attr("id","item"+i);
        $("#paneles").append(caja);
        // para la rejilla
        lista = $("<li></li>");
        caja = $("<div></div>");
        caja.addClass("grid-photo-box");
        caja.append("<a href='#item"+i+"'>"+ $.marcadores.lista[i].nombre+" </a>");
        lista.append(caja);
        $("#rejilla").append(lista);
    }
}








