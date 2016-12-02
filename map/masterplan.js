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
        map.setPaintProperty('2yrLine','line-opacity', 0);
        map.setPaintProperty('5yrLine','line-opacity', 0);
        map.setPaintProperty('10yrLine','line-opacity', 0);
        map.setPaintProperty('50yrLine','line-opacity', 0);
        map.setPaintProperty('100yrLine','line-opacity', 0);
        map.setPaintProperty('120pctLine','line-opacity', 0);
    });
});

map.on('style.load', function () {

  map.addSource('footprints', {
      type: 'geojson',
      "data": 'footprints.geojson'
  });
  map.addSource('results', {
      type: 'vector',
      url: 'mapbox://iconeng.f28db60c'
  });

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
          'fill-opacity': 1,
          'fill-color': '#1de9b6'
      }
  }, 'road-label-small');

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

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
