// create url for geoJSON
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// create map object (coordinates are center of earth)
var map = L.map('map').setView([20, 0], 2);

// add tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// grab the data 
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
    .then(response => response.json())
    .then(data => {
        // Call a function to add the GeoJSON layer
        addGeoJSONLayer(data.features);
    });

    // add geoJSON layer 
    function addGeoJSONLayer(features) {
        L.geoJSON(features, {
            pointToLayer: function (feature, latlng) {
                var magnitude = feature.properties.mag;
                var color = getColor(feature.geometry.coordinates[2]); 
                return L.circleMarker(latlng, {
                    radius: magnitude * 3, 
                    fillColor: color,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).bindPopup("Magnitude: " + magnitude + "<br>Depth: " + feature.geometry.coordinates[2] + " km");
            }
        }).addTo(map);
    }
    
    function getColor(depth) {
        return depth > 100 ? '#FF0000' :
               depth > 50  ? '#FF7F00' :
               depth > 20  ? '#FFFF00' :
               depth > 0   ? '#7FFF00' :
                             '#00FF00';
    }