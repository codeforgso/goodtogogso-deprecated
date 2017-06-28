let app;

require([
  'voterReg',
  'map',
  'dojo/domReady!'
], function( VoterReg, Map ) {

  VoterReg.modal();
  Map.mainMap();

});
