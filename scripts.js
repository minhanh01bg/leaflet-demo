var map = L.map('map').setView([21.027, 105.852], 13);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

// var marker = L.marker([21.03, 105.8]).addTo(map)
//     .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();

// var circle = L.circle([51.508, -0.11], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 500
// }).addTo(map).bindPopup('I am a circle.');

// var polygon = L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(map).bindPopup('I am a polygon.');


var popup = L.popup();


// marker.on('dragend', function(e) {
//     updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
// });

var markerpeek;
// var markers = L.layerGroup();

function onMapClick(e) {
    // popup
    //     .setLatLng(e.latlng)
    //     .setContent('You clicked the map at ' + e.latlng.toString())
    //     .openOn(map);
    // markers.removeAll();
    if (!markerpeek) {
        markerpeek = L.marker(e.latlng)
            .addTo(map).openPopup();
    } else {
        markerpeek.setLatLng(e.latlng).openPopup();
    }
    // markers.addLayer(markerpeek);
}

map.on('click', onMapClick);

// tag.latitude, tag.longitude
function gps() {
    map.locate({
        setView: true,
        maxZoom: 14
    });


    if (!navigator.geolocation) {
        console.log("Your browser does not support geolocation");
    }
    else {
        navigator.geolocation.getCurrentPosition(getPosition);
    }   
    function getPosition(position){
        // console.log(position);
        if (!markerpeek) {
            markerpeek = L.marker([position.coords.latitude, position.coords.longitude])
                        .addTo(map)
                        .openPopup();
        } else {
            markerpeek.setLatLng([position.coords.latitude, position.coords.longitude])
                        .addTo(map)
                        .openPopup();
        }
    }
}
