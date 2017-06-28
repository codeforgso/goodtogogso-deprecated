define([
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/FeatureLayer'],function(Map, MapView, FeatureLayer) {
  return {
    mainMap: function() {
      // Update center and zoom to customize for your community.
      app = {
        map: null,
        mapView: null,
        center: [-79.7920, 36.0726],
        zoom: 11
      };
      // var center, zoom;
      // $.getJSON("./config.json")
      // .done(function (config) {
      // center = config.map.center;
      // zoom = config.map.zoom;
      // });
      // var config = (function () {
      //   var json;
      //   $.ajax({
      //       async: false,
      //       global: false,
      //       url: './config.json',
      //       dataType: 'json',
      //       success: function (data) {
      //         json = data;
      //         console.log(data);
      //       },
      //       error: function(e) {
      //         console.log(e.abort.arguments);
      //       }
      //   });
      //   return json;
      // })();

      var councilTemplate = {
        title: "Council District {DISTRICT}",
        content: "<p>Council Member: <b>{MEMBER}</b></p> </br> <p>Test: <a href={HYPERLINK} target='_blank'>{HYPERLINK}</a></p></br><a href='http://www.greensboro-nc.gov/index.aspx?page=93' target='_blank'>Contact me</a>"

      };

      var commissionerTemplate = {
        title: "Commissioner District {DISTRICT}",
        content: "<p>Commissioner: <b>{REPRESENTATIVE}</b></p>"//+ </br> <p>Test: <a href='{HYPERLINK}' target='_blank'>{HYPERLINK}</a></p>"
      };

      var councilDist = new FeatureLayer({
        url: "https://gis.greensboro-nc.gov/arcgis/rest/services/OpenGateCity/OpenGateCityLaunch/MapServer/3/query?outFields=*&where=1%3D1",
        outFields: ["*"],
        popupTemplate: councilTemplate,
        opacity: 0.4
      });

      var commissionerDist = new FeatureLayer({
        url: "http://gis.co.guilford.nc.us/arcgis/rest/services/Basemaps/All_Map_Layers/MapServer/27",
        outFields: ["*"],
        visible: true,
        popupTemplate: commissionerTemplate,
        minScale: 0
      });

      app.map = new Map({
        basemap: "dark-gray",
        layers: [councilDist, commissionerDist]
      });

      app.mapView = new MapView( {
        container: 'mapViewDiv',
        map: app.map,
        center: app.center,
        zoom: app.zoom,
        // center: [-79.7920, 36.0726],
        // zoom: 11,
        constraints: {
    			rotationEnabled: false
    		},
        padding: {
          top: 46,
          bottom: 0
        }
      });
    }
  }
});
