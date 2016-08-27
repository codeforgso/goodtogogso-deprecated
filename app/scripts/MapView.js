import declare from 'dojo/_base/declare';
import on from 'dojo/on';
import _WidgetBase from'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';
import Map from 'esri/map';

export default declare([_WidgetBase, _TemplatedMixin], {
  templateString: '<div class="map-container"></div>',
  postCreate() {
    var map = new Map(this.domNode, {
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
    this.set('map', map);
  }
});
