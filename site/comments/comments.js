L.mapbox.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var base = new Firebase('https://lyonscomments.firebaseio.com/'),

color = '#' + [
        (~~(Math.random() * 16)).toString(16),
        (~~(Math.random() * 16)).toString(16),
        (~~(Math.random() * 16)).toString(16)].join('');

var map = L.mapbox.map('map','iconeng.kei97ole',{
      zoomControl: false,
      infoControl: true,
      maxZoom:19
    })
      .setView([40.22,-105.27], 14);

    new L.Control.Zoom({ position: 'topright' }).addTo(map);

var url = 'https://{s}.tiles.mapbox.com/v4/iconeng.f28db60c/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var vectorTileOptions = {
    vectorTileLayerStyles: {

        '100yrSmooth': {
            weight: 0,
            fillColor: 'rgb(109,23,143)',
            fillOpacity: .6,
            fill: true
        },
        '2yrSmooth':[],
        '5yrSmooth':[],
        '10yrSmooth':[],
        '50yrSmooth':[],
        '120pctSmooth':[]
    }
};

var layer = L.vectorGrid.protobuf(url, vectorTileOptions).addTo(map);

var footprints = L.mapbox.featureLayer(null, {style: {color: '#1de9b6', weight: 1, fillOpacity:.8}})
    .loadURL('../map/footprints.geojson')
    .setFilter(function(feature){return (feature.properties.Fut100 === 'T')})
    .addTo(map);

var marker = L.marker([40.22,-105.27], {
    draggable: true,
    icon: L.mapbox.marker.icon({
        'marker-color': '#e74c3c'
    })
    // Add a form to that marker that lets them specify a message and click Add
    // to add the data.
})
  .bindPopup('<div class="row popup"><div class="col s12"><div class="row"><div class="input-field col s12"><input id="name" name="name" type="text"><label for="name">Name</label></div></div><div class="row"><div class="input-field col s12"><input id="phone" name="phone" type="tel"><label for="phone">Phone Number</label></div></div><div class="row"><div class="input-field col s12"><input id="email" name="email" type="email"><label for="email">Email</label></div></div><div class="row"><div class="input-field col s12"><textarea id="message" name"message" class="materialize-textarea"></textarea><label for="message">Comment</label></div></div><div class="row"><div class="input-field col s12"><button id="add-button" class="btn waves-effect waves-light right" type="submit" name="add-button">Submit<i class="material-icons right">send</i></button></div></div></div></div></div>')
    .addTo(map);

// Every time the marker is dragged, update the form.
marker.on('dragend', function(e) {
    marker.openPopup();
    // When the user clicks Add
    L.DomEvent.addListener(L.DomUtil.get('add-button'), 'click', function() {
        // First, clean the potential-HTML they've added to the value.
        var name = L.DomUtil.get('name').value;
        var email = L.DomUtil.get('email').value;
        var phone = L.DomUtil.get('phone').value;
        var message = L.DomUtil.get('message').value;
        // Get the current draggable marker's position and GeoJSON representation
        var geojson = marker.toGeoJSON();
        geojson.properties['marker-color'] = '#2c3e50';
        geojson.properties.description = message;
        geojson.properties.name = name;
        geojson.properties.email = email;
        geojson.properties.phone = phone;
        // And save it to Firebase
        base.push(geojson);
        marker.closePopup();
    });
});

// With a cap of 200, listen for new markers being added to the map.
base.limit(200).on('child_added', function(snapshot) {
    // And for each new marker, add a featureLayer.
    L.mapbox.featureLayer(snapshot.val())
        .eachLayer(function(l) {
            // Which positions markers below the marker you drag, so that
            // they don't overlap in the z-index.
            l.setZIndexOffset(-1000)
            // And each marker should have a label with its title.
            var geojson = l.toGeoJSON();

        })
        .addTo(map);
});
