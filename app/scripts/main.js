// import Map from 'esri/Map';
// import MapView from 'esri/views/MapView';
// import 'dojo/domReady!';
//
// var map = new Map({
//   basemap: 'streets'
// });
//
// var view = new MapView({
//   container: 'viewDiv',  // Reference to the DOM node that will contain the view
//   map: map               // References the map object created in step 3
// });
//
let app;

require([
  'esri/Map',
  'esri/views/MapView',
  // Bootstrap
  // "bootstrap/Collapse",
  // "bootstrap/Dropdown",
  // "bootstrap/Tab",
  // Calcite-maps
  // "calcite-maps/calcitemaps-v0.2",
  'validator/validator',
  'dojo/domReady!'
], function(Map, MapView, validator) {

  $('#voter-modal').modal('show');

  $('#voter-modal').on('shown.bs.modal', function() {
    $('#first-name').focus();
  });

  app = {
    map: null,
		mapView: null
  };

  app.map = new Map({
    basemap: "dark-gray",
  });

  app.mapView = new MapView( {
    container: 'mapViewDiv',
    map: app.map,
    center: [-79.7920, 36.0726],
    zoom: 11,
    constraints: {
			rotationEnabled: false
		},
    padding: {
      top: 46,
      bottom: 0
    }
  });

  $('#first-name').keyup(function(event) {
      if(event.keyCode == 13){
          $('#voter-name-input').click();
      }
  });
  $('#last-name').keyup(function(event) {
      if(event.keyCode == 13){
          $('#voter-name-input').click();
      }
  });

  $('#voter-name-input').click(function() {
    if ( validator.isNull( $('#first-name').val()) || validator.isNull( $('#last-name').val()) ) {
      alert('first name null');
    }
    else {
    $.ajax({
      url: 'http://vote.codeforgreensboro.org/GoodToGoGSOapi/' + $('#first-name').val() + '/' + $('#last-name').val(),
      data: {
        tables: 'voter'
      },
      success: function(data) {
        console.log(data);
        if (data.length === 1) {
          alert(data[0].first_name + ' ' + data[0].last_name + ' \nVoter Status: ' + data[0].voter_status_reason_desc);
        }
        else if (data.length > 1) {
          let voters = $("#select-voter")
          $('#select-voter-title').html('Select your address');
          $.each(data, function(i, obj) {
              voters.append('<li><a>' + obj.resident_address + '</a></li>')
          });
        }
        else {
          alert('No voter found, check your spelling!');
        }
      }
    });
  }
  });
});
