mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/civjrd2la004z2immqynhr4fd',
    zoom: 12,
    center: [-105.27, 40.215],
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
        map.setPaintProperty('planningFill','fill-opacity', 0);
        map.setPaintProperty('2yrLine','line-opacity', 0);
        map.setPaintProperty('5yrLine','line-opacity', 0);
        map.setPaintProperty('10yrLine','line-opacity', 0);
        map.setPaintProperty('50yrLine','line-opacity', 0);
        map.setPaintProperty('100yrLine','line-opacity', 0);
        map.setPaintProperty('120pctLine','line-opacity', 0);
        map.setPaintProperty('subbasinLines','line-opacity', 0);
        map.setPaintProperty('conduits','line-opacity', 0);
        map.setPaintProperty('appleLines','line-opacity', 0);
        map.setPaintProperty('easternLines','line-opacity', 0);
        map.setPaintProperty('planningAreas','line-opacity', 0);
        map.setLayoutProperty('altAlignments','visibility', 'none');
        map.setLayoutProperty('junctions','visibility', 'none');
        map.setPaintProperty('conduitArrows','icon-opacity', 0);
        map.setLayoutProperty('alternatives','visibility', 'none');
        map.setPaintProperty('watershedLabels','text-opacity', 0);
        map.setLayoutProperty('subbasinLabels','visibility', 'none');
        map.setPaintProperty('conduitLabels','text-opacity', 0);
        map.setPaintProperty('appleLabels','text-opacity', 0);
        map.setPaintProperty('easternLabels','text-opacity', 0);
        map.setLayoutProperty('junctionLabels','visibility', 'none');
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
  map.addSource('planningAreas', {
      type: 'geojson',
      "data": 'planningAreas.geojson'
  });
  map.addSource('appleValley', {
      type: 'geojson',
      "data": 'appleValley.geojson'
  });
  map.addSource('easternCorridor', {
      type: 'geojson',
      "data": 'easternCorridor.geojson'
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
    "id": "planningFill",
    "source": "planningAreas",
    "type": "fill",
    "paint": {
        'fill-pattern': 'pedestrian-polygon',
        'fill-opacity': 0
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
      'id': 'easternLines',
      'type': 'line',
      'source': 'easternCorridor',
      'paint': {
          'line-width': .5,
          'line-opacity': 0,
          'line-color': '#b71c1c',
          'line-dasharray': [16,8]
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'appleLines',
      'type': 'line',
      'source': 'appleValley',
      'paint': {
          'line-width': .5,
          'line-opacity': 0,
          'line-color': '#1a237e',
          'line-dasharray': [16,8]
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'planningAreas',
      'type': 'line',
      'source': 'planningAreas',
      'paint': {
          'line-width': 3,
          'line-opacity': 0,
          'line-color': '#c6ff00'
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
      'layout': {
         "visibility": 'none'
       },
      'paint': {
          'circle-radius': 4,
          'circle-color': 'rgba(255,61,0 ,1)'
      }
  }, 'road-label-small');

  map.addLayer({
      'id': 'altAlignments',
      'type': 'line',
      'source': 'altAlignments',
      'layout': {
        'visibility': 'none'
      },
      'paint': {
          'line-width': 2,
          'line-color': '#00b0ff'
      }
  }, 'road-label-small');


  map.addLayer({
      'id': 'junctionLabels',
      'type': 'symbol',
      'source': 'junctions',
      'layout': {
         "visibility": 'none',
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
     }
  });

  map.addLayer({
      'id': 'easternLabels',
      'type': 'symbol',
      'source': 'easternCorridor',
      'layout': {
         "text-optional": true,
         "text-line-height": 1,
         "text-max-width":8,
         "text-size": {
             "stops": [[15, 8], [17, 12], [19, 14]]
         },
         "text-field": "Sub-basin {Name} {LYO_EasternCorridor_Junctions_Q100} cfs",
         'text-font': ['Roboto Regular','Open Sans Regular','Arial Unicode MS Regular'],
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#F8F4F0",
       "text-opacity":0,
       "text-halo-color": "#b71c1c",
       "text-halo-width": {"stops": [[15,.75],[17,1]]}
     }
  });

  map.addLayer({
      'id': 'appleLabels',
      'type': 'symbol',
      'source': 'appleValley',
      'layout': {
         "text-optional": true,
         "text-line-height": 1,
         "text-max-width":8,
         "text-size": {
             "stops": [[15, 8], [17, 12], [19, 14]]
         },
         "text-field": "Sub-basin {Name} {LYO_AppleValley_Junctions_Q100} cfs",
         'text-font': ['Roboto Regular','Open Sans Regular','Arial Unicode MS Regular'],
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#F8F4F0",
       "text-opacity":0,
       "text-halo-color": "#1a237e",
       "text-halo-width": {"stops": [[15,.75],[17,1]]}
     }
  });

  map.addLayer({
      'id': 'subbasinLabels',
      'type': 'symbol',
      'source': 'subbasinPoints',
      'layout': {
         "visibility": 'visible',
         "text-optional": true,
         "text-line-height": 1,
         "text-max-width":7,
         "text-size": {
             "stops": [[15, 8], [17, 12], [19, 14]]
         },
         "text-field": "Sub-basin {Name} {area_ac} Acres",
         'text-font': ['Roboto Regular','Open Sans Regular','Arial Unicode MS Regular'],
         "text-anchor": "top"
     },
     "paint": {
       "text-color": "#F8F4F0",
       "text-halo-color": "rgba(0,0,0,.87)",
       "text-halo-width": {"stops": [[15,.75],[17,1]]}
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
          'visibility': 'none',
          'symbol-placement': 'point',
          'text-field': '{ID}',
          'text-font': ['Roboto Bold','Open Sans Bold','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[13,16],[15,18],[17,20]]
          }
        },
        'paint': {
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
  var features = map.queryRenderedFeatures(e.point, { layers: ['alternatives','subbasinLabels','junctions'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];

    if (feature.layer.id == 'alternatives'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<div class="row"><h5>Alternative ' + feature.properties.ID + '</h5><br />' +
                '<p class="popup-content">' + feature.properties.Description + '</p></div>')
            .addTo(map);
      } else if (feature.layer.id == 'junctions'){
          var popup = new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML('<div><b>' + feature.properties.Name + ': </b><span class="indigo-text">' + feature.properties.Pk_100yr.toFixed(1) + ' cfs</span></div>')
              .addTo(map);
      } else if (feature.layer.id == 'subbasinLabels'){

        var col = feature.properties.Name;
        console.log(col);

        var	margin = {top: 10, right: 40, bottom: 30, left: 50},
          	width = 240 - margin.left - margin.right,
          	height = 240 - margin.top - margin.bottom;

          var	x = d3.scale.linear().range([0, width]);
          var	y = d3.scale.linear().range([height, 0]);

          x.domain([0, 240]);
          y.domain([0, 600]);

          var	xAxis = d3.svg.axis().scale(x)
          	.orient("bottom")
            .tickValues([60,120,180,240]);

          var	yAxis = d3.svg.axis().scale(y)
          	.orient("left").ticks(5);

          var	valueline = d3.svg.line()
          	.x(function(d) { return x(d.date); })
          	.y(function(d) { return y(d.basin100); });

          var	valueline2 = d3.svg.line()
          	.x(function(d) { return x(d.date); })
          	.y(function(d) { return y(d.basin10); });

          var div = window.document.createElement('div');
          div.innerHTML = '<div class="row"><b>Sub-basin ' + feature.properties.Name + ' Hydrograph</b></div>';

          var	svg = d3.select(div)
          	.append("svg")
          		.attr("width", width + margin.left + margin.right)
          		.attr("height", height + margin.top + margin.bottom)
          	.append("g")
          		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          // Get the 100 year data
          d3.csv("hydrographs-100.csv", function(error, data) {
          	data.forEach(function(d) {
          		d.date = +d.Time;
          		d.basin100 = +d[col];
          	});

          	var graph = svg.append("path")		// Add the valueline path.
          		.attr("class", "line")
          		.attr("d", valueline(data));

              var totalLength = graph.node().getTotalLength();

              graph
                .attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                  .duration(1000)
                  .ease("linear")
                  .attr("stroke-dashoffset", 0);

          	svg.append("g")			// Add the X Axis
          		.attr("class", "x axis")
          		.attr("transform", "translate(0," + height + ")")
          		.call(xAxis);

          	svg.append("g")			// Add the Y Axis
          		.attr("class", "y axis")
          		.call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 10)
                .attr("font-size", 8)
                .style("text-anchor", "end")
                .text("Flow (cfs)");

            svg.append("text")
                .attr("y", 4)
                .attr("x", 150)
                .attr("font-size", 10)
                .attr("font-weight", "bold")
                .attr("fill", "steelblue")
                .style("text-anchor", "end")
                .text("10-Year");

            svg.append("text")
                .attr("y", 16)
                .attr("x", 150)
                .attr("font-size", 10)
                .attr("font-weight", "bold")
                .attr("fill", "red")
                .style("text-anchor", "end")
                .text("100-Year");
            });

            // Get the 10 year data
            d3.csv("hydrographs-10.csv", function(error, data) {
            	data.forEach(function(d) {
            		d.date = +d.Time;
            		d.basin10 = +d[col];
            	});

              var graph = svg.append("path")		// Add the valueline2 path.
            		.attr("class", "line")
            		.style("stroke", "steelblue")
            		.attr("d", valueline2(data));

                var totalLength = graph.node().getTotalLength();

                graph
                  .attr("stroke-dasharray", totalLength + " " + totalLength)
                  .attr("stroke-dashoffset", totalLength)
                  .transition()
                    .duration(1000)
                    .ease("linear")
                    .attr("stroke-dashoffset", 0);
              });

          var d3popup = new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setDOMContent(div)
              .addTo(map);
        }
    });

map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['alternatives','subbasinLabels','junctions'] });

    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
