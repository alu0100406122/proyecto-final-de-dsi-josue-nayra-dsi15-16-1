// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

var map;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markers = [];
var flightPlanCoordinates = [];
var flightPath;
var puntos_intermedios = [];
var user_actual = "Josue";
function generar_mapa()
{
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 28.678373, lng: -17.850015},
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  google.maps.event.addListener(map, 'click', function(event)
  {
      console.log("Datos:"+event.latLng.lat());
      console.log("Datos1:"+event.latLng.lng());
      var aux = new Object();
      aux["latitud"] = event.latLng.lat();
      aux["longitud"] = event.latLng.lng();
      puntos_intermedios.push(aux);
      addMarker(event.latLng, map);
  });
}

function generar_linea_sendero(coordenadas, map)
{
  var flightPath = new google.maps.Polyline({
    path: coordenadas,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
  clearMarkers();
}

function setMapOnAll(map) {
  for (var i = 1; i < markers.length-1; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

  // Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  console.log("Location:"+location);
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
  markers.push(marker);
}


$(document).ready(() => {
    //Hacemos la lectura del JSON
    //$.get("senderos.json", botones_ejemplos, 'json');
    $("#generar_mapa").click(function()
    {
        //initMap(origen,destino);    
        console.log("Generando mapa");
        generar_mapa();
    });
       
    $("#mostrar_camino").click(function()
    {

     });
     
     $("#guardar_camino").click(function(event)
     {
        console.log("Guardando camino");
        event.preventDefault();
        
        console.log("Mostrando camino");
        console.log("Camino:"+markers);
        $.each(markers,function(key,value)
        {
          console.log("Key:"+key+",Value:"+value.position);
          flightPlanCoordinates.push(value.position);
        });
        generar_linea_sendero(flightPlanCoordinates,map);
        var puntos_sendero = JSON.stringify(puntos_intermedios);
        //puntos_sendero = JSON.parse(puntos_sendero);
        //var origen_sendero = puntos_sendero[0].latitud;
        //var destino_sendero = puntos_sendero[puntos_sendero.length-1];
        
        console.log("Puntos sendero:"+puntos_sendero);
        
        /*$.get("/nuevo_camino",{usuario: user_actual, nombre_mapa: $("#nombre_mapa").val(), descripcion_mapa: $("#descripcion_mapa").val(), puntos: puntos_sendero}, data_respuesta => {
            console.log("Data_respuesta:"+data_respuesta);
        });*/
     });
});
})();

