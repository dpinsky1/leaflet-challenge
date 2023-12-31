// Load earthquake data from the USGS GeoJSON feed
fetch('https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2023-09-21%2000:00:00&endtime=2023-09-28%2023:59:59&maxlatitude=50&minlatitude=24.6&maxlongitude=-65&minlongitude=-125&minmagnitude=0.5&orderby=time')
      .then(response => response.json())
      .then(data => {
          
        // Loop through the earthquake data and create markers
          data.features.forEach(feature => {
              var coordinates = feature.geometry.coordinates;
              var magnitude = feature.properties.mag;
              var depth = coordinates[2];
              
              // Create a marker with popup
              var marker = L.circleMarker([coordinates[1], coordinates[0]], {
                  radius: (magnitude * 2),
                  fillColor: getMarkerColor(depth),
                  color: 'gray',
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
              }).bindPopup(`<strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth} km`);
              marker.addTo(map);
          });
      });
  
      // Create a map centered at a specific location and with an initial zoom level
  var map = L.map('map').setView([0, 0], 2);
  
  // Add a tile layer for the base map (you can choose a different one)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Define a function to determine marker color based on earthquake depth
    //  Colors listed in general order of severity
  function getMarkerColor(depth) {
      if (depth < 10) {
          return 'green';
      } else if (depth < 30) {
          return 'yellow';
      } else if (depth < 50) {
          return 'orange';
      } else if (depth < 70) {
          return 'red';
      } else {
          return 'darkred';
      }
  }

  // Create legend
  var legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'legend');
      var depths = [0, 10, 30, 50, 70];
      var labels = ['#FF0000','#8B0000','#FFA500',
                    '#FFFF00','#008000'];
      for (var i = 0; i < depths.length; i++) {
          div.innerHTML +=
              '<i style="background:' + labels[i] + '"></i> ' +
              depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
      }
      return div;
  };
  legend.addTo(map);
console.log(labels)
  