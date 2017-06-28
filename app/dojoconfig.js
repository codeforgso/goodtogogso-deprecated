var package_path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));
var dojoConfig = {
  async: true,
  packages: [{
    name: "bootstrap",
    location: "https://esri.github.io/calcite-maps/dist/vendor/dojo-bootstrap"
  },
  {
    name: "calcite-maps",
    location: "https://esri.github.io/calcite-maps/dist/js/dojo"
  },
  {
    name: "validator",
    location: package_path + "/node_modules/validator"
  },
  {
    name: "voterReg",
    location: package_path + "/scripts",
    main: 'voterReg'
  },
  {
    name: "map",
    location: package_path + "/scripts",
    main: 'map'
  }]
};
