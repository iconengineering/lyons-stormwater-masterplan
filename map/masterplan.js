mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/civjrd2la004z2immqynhr4fd',
    zoom: 14,
    center: [-105.27, 40.22],
    hash: true,
    preserveDrawingBuffer: true
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
    $('.layer-off').prop('checked', false);
    $('.layer-on').prop('checked', true);
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

$(document).ready(function() {
    $("#clear").click(function() {
        var checkBoxes = $("input[type=checkbox]");
        checkBoxes.prop("checked", false);
        map.setPaintProperty('atRisk','fill-opacity', 0);
        map.setPaintProperty('2yrFill','fill-opacity', 0);
        map.setPaintProperty('5yrFill','fill-opacity', 0);
        map.setPaintProperty('10yrFill','fill-opacity', 0);
        map.setPaintProperty('50yrFill','fill-opacity', 0);
        map.setPaintProperty('100yrFill','fill-opacity', 0);
        map.setPaintProperty('120pctFill','fill-opacity', 0);
        map.setPaintProperty('watersheds','fill-opacity', 0);
        map.setPaintProperty('2yrLine','line-opacity', 0);
        map.setPaintProperty('5yrLine','line-opacity', 0);
        map.setPaintProperty('10yrLine','line-opacity', 0);
        map.setPaintProperty('50yrLine','line-opacity', 0);
        map.setPaintProperty('100yrLine','line-opacity', 0);
        map.setPaintProperty('120pctLine','line-opacity', 0);
        map.setPaintProperty('subbasinLines','line-opacity', 0);
        map.setPaintProperty('conduits','line-opacity', 0);
        map.setPaintProperty('altAlignments','line-opacity', 0);
        map.setPaintProperty('junctions','circle-opacity', 0);
        map.setPaintProperty('conduitArrows','icon-opacity', 0);
        map.setPaintProperty('alternatives','text-opacity', 0);
        map.setPaintProperty('watershedLabels','text-opacity', 0);
        map.setPaintProperty('subbasinLabels','text-opacity', 0);
        map.setPaintProperty('subbasinLabels2','text-opacity', 0);
        map.setPaintProperty('conduitLabels','text-opacity', 0);
        map.setPaintProperty('junctionLabels','text-opacity', 0);
    });
});

map.on('style.load', function (e) {

  map.addSource('footprints', {
      type: 'geojson',
      "data": 'footprints.geojson'
  });
  map.addSource('alternatives', {
      type: 'geojson',
      "data": 'alternatives.geojson'
  });
  map.addSource('altAlignments', {
      type: 'geojson',
      "data": 'altAlignments.geojson'
  });
  map.addSource('conduits', {
      type: 'geojson',
      "data": 'conduits.geojson'
  });
  map.addSource('junctions', {
      type: 'geojson',
      "data": 'junctions.geojson'
  });
  map.addSource('subbasinLines', {
      type: 'geojson',
      "data": 'subbasinLines.geojson'
  });
  map.addSource('subbasinPoints', {
      type: 'geojson',
      "data": 'subbasinPoints.geojson'
  });
  map.addSource('watersheds', {
      type: 'geojson',
      "data": 'watersheds.geojson'
  });
  map.addSource('results', {
      type: 'vector',
      url: 'mapbox://iconeng.f28db60c'
  });

  map.addLayer({
      'id': 'watersheds',
      'type': 'fill',
      'source': 'watersheds',
      'paint': {
          'fill-opacity': 0.4,
          'fill-color': {
              property: 'OBJECTID',
              stops: [
                  ['1', '#FFEE58'],
                  ['2', '#AB47BC'],
                  ['3', '#5C6BC0'],
                  ['4', '#29B6F6'],
                  ['5', '#26A69A'],
                  ['6', '#9CCC65'],
                  ['7', '#ef5350'],
                  ['8', '#FFA726'],
                  ['9', '#8D6E63'],
                  ['10', '#78909C'],
                  ['11', '#D4E157']
                  ]
          }
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'footprints',
      'type': 'fill',
      'source': 'footprints',
      'paint': {
          'fill-opacity': 0.13,
          'fill-color': '#000000'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': '120pctFill',
      'type': 'fill',
      'source': 'results',
      'source-layer': '120pctSmooth',
      'paint': {
          'fill-opacity': 0,
          'fill-color': 'rgb(245,194,152)'
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '120pctLine',
      'type': 'line',
      'source': 'results',
      'source-layer': '120pctSmooth',
      'paint': {
          'line-width': .5,
          'line-opacity': 0,
          'line-color': 'rgb(245,194,152)'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': '100yrFill',
      'type': 'fill',
      'source': 'results',
      'source-layer': '100yrSmooth',
      'paint': {
          'fill-opacity': 0,
          'fill-color': 'rgb(227,147,138)'
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '100yrLine',
      'type': 'line',
      'source': 'results',
      'source-layer': '100yrSmooth',
      'paint': {
          'line-width': .5,
          'line-opacity': 0,
          'line-color': 'rgb(227,147,138)'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': '50yrFill',
      'type': 'fill',
      'source': 'results',
      'source-layer': '50yrSmooth',
      'paint': {
          'fill-opacity': 0,
          'fill-color': 'rgb(199,101,134)'
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '50yrLine',
      'type': 'line',
      'source': 'results',
      'source-layer': '50yrSmooth',
      'paint': {
          'line-width': .5,
          'line-opacity': 0,
          'line-color': 'rgb(199,101,134)'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': '10yrFill',
      'type': 'fill',
      'source': 'results',
      'source-layer': '10yrSmooth',
      'paint': {
          'fill-opacity': 0,
          'fill-color': 'rgb(161,59,139)'
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '10yrLine',
      'type': 'line',
      'source': 'results',
      'source-layer': '10yrSmooth',
      'paint': {
          'line-width': .5,
          'line-opacity': 0,
          'line-color': 'rgb(161,59,139)'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': '5yrFill',
      'type': 'fill',
      'source': 'results',
      'source-layer': '5yrSmooth',
      'paint': {
          'fill-opacity': 0,
          'fill-color': 'rgb(109,23,143)'
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '5yrLine',
      'type': 'line',
      'source': 'results',
      'source-layer': '5yrSmooth',
      'paint': {
          'line-width': .5,
          'line-opacity': 0,
          'line-color': 'rgb(109,23,143)'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': '2yrFill',
      'type': 'fill',
      'source': 'results',
      'source-layer': '2yrSmooth',
      'paint': {
          'fill-opacity': 0,
          'fill-color': 'rgb(14,9,135)'
      }
  }, 'road-label-small');
  map.addLayer({
      'id': '2yrLine',
      'type': 'line',
      'source': 'results',
      'source-layer': '2yrSmooth',
      'paint': {
          'line-width': .5,
          'line-opacity': 0,
          'line-color': 'rgb(14,9,135)'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'atRisk',
      'type': 'fill',
      'source': 'footprints',
      'filter': ['==', 'Fut2', 'T'],
      'paint': {
          'fill-opacity': 0,
          'fill-color': '#1de9b6'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'subbasinLines',
      'type': 'line',
      'source': 'subbasinLines',
      'paint': {
          'line-width': .5,
          'line-opacity': 1,
          'line-color': 'rgba(0,0,0,.87)',
          'line-dasharray': [16,8]
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'conduits',
      'type': 'line',
      'source': 'conduits',
      'paint': {
          'line-width': 4,
          'line-opacity': 0,
          'line-color': 'rgba(26,35,126 ,1)'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'conduitArrows',
      'type': 'symbol',
      'source': 'conduits',
      'layout': {
        'symbol-placement': 'line',
        'symbol-spacing': 50,
        "icon-image": "oneway-white-small",
        "icon-allow-overlap": true,
        "text-rotation-alignment": "map",
        "icon-size": 1,
        "text-keep-upright": false,
        "icon-padding": 0,
        "icon-ignore-placement": true
      },
      'paint': {
        'icon-opacity':0
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'conduitLabels',
      'type': 'symbol',
      'source': 'conduits',
      'layout': {
        "text-optional": true,
        'symbol-placement': 'line',
        'symbol-spacing': 100,
        'text-field': '{Name}',
        'text-font': ['Roboto Regular','Open Sans Regular','Arial Unicode MS Regular'],
        'text-size': 10,
        "text-padding": 100,
      },
      'paint': {
        'text-opacity':0,
        'text-color': '#F8F4F0',
        'text-halo-color': 'rgba(26,35,126 ,.9)',
        'text-halo-width': 1
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'junctions',
      'type': 'circle',
      'source': 'junctions',
      'paint': {
          'circle-radius': 4,
          'circle-opacity': 0,
          'circle-color': 'rgba(255,61,0 ,1)'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'altAlignments',
      'type': 'line',
      'source': 'altAlignments',
      'paint': {
          'line-width': 2,
          'line-opacity': 0,
          'line-color': '#00b0ff'
      }
  }, 'road-label-small');


  map.addLayer({
      'id': 'junctionLabels',
      'type': 'symbol',
      'source': 'junctions',
      'layout': {
         "text-optional": true,
         "text-line-height": 1,
         "text-size": 10,
         "text-field": "{Name}",
         'text-font': ['Roboto Regular','Open Sans Regular','Arial Unicode MS Regular'],
         "text-offset": [0, 1],
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "rgba(255,61,0 ,1)",
       "text-halo-color": "#F8F4F0",
       "text-halo-width": 1,
       "text-opacity": 0
     }
  });

  map.addLayer({
      'id': 'subbasinLabels2',
      'type': 'symbol',
      'source': 'subbasinPoints',
      'layout': {
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[15, 8], [17, 12], [19, 14]]
         },
         "text-field": "{area_ac} Acres",
         'text-font': ['Roboto Regular','Open Sans Regular','Arial Unicode MS Regular'],
         'text-offset':{ "stops": [[15,[0,1.5]],[17,[0,1.5]]] },
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#F8F4F0",
       "text-halo-color": "rgba(0,0,0,.87)",
       "text-halo-width":  {"stops": [[15,.75],[17,1]]},
       "text-opacity":0
     }
  });

  map.addLayer({
      'id': 'subbasinLabels',
      'type': 'symbol',
      'source': 'subbasinPoints',
      'layout': {
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[15, 8], [17, 12], [19, 14]]
         },
         "text-field": "Subbasin {Name}",
         'text-font': ['Roboto Regular','Open Sans Regular','Arial Unicode MS Regular'],
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#F8F4F0",
       "text-halo-color": "rgba(0,0,0,.87)",
       "text-halo-width": {"stops": [[15,.75],[17,1]]},
       "text-opacity":0
     }
  });

  map.addLayer({
      'id': 'watershedLabels',
      'type': 'symbol',
      'source': 'watersheds',
      'layout': {
         "text-optional": true,
         "text-line-height": 1,
         "text-size": {
             "stops": [[15, 11], [17, 14]]
         },
         "text-field": "{Name}",
         'text-font': ['Roboto Bold','Open Sans Bold','Arial Unicode MS Regular'],
         "symbol-placement": "point"
     },
     "paint": {
       "text-color": "#F8F4F0",
       "text-halo-color": "rgba(0,150,136,1)",
       "text-halo-width": {"stops": [[15,.75],[17,1]]},
       "text-opacity":1
     }
  });

  map.addLayer({
        'id': 'alternatives',
        'type': 'symbol',
        'source': 'alternatives',
        'layout': {
          'symbol-placement': 'point',
          'text-field': '{ID}',
          'text-font': ['Roboto Bold','Open Sans Bold','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[13,16],[15,18],[17,20]]
          }
        },
        'paint': {
          'text-opacity':0,
          'text-color': '#0091ea',
          'text-halo-color': 'rgba(250,250,250 ,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 0.5
        }
    });

});

var filterList = document.getElementById('filters');
var radios = filterList.getElementsByTagName('input');

function switchFilter(filter) {
    var filterId = filter.target.value;
    map.setFilter('atRisk', ['==', filterId, 'T']);
}

for (var i = 0; i < radios.length; i++) {
    radios[i].onclick = switchFilter;
}

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['alternatives'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];
  var opacity = map.getPaintProperty('alternatives', 'text-opacity');

    if (feature.layer.id == 'alternatives' && opacity != 0){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<div class="row"><h5>Alternative ' + feature.properties.ID + '</h5><br />' +
                '<p class="popup-content">' + feature.properties.Description + '</p></div>')
            .addTo(map);
      }
    });

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['alternatives'] });

    var opacity = map.getPaintProperty('alternatives', 'text-opacity');

    if (opacity != 0){
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  }
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
