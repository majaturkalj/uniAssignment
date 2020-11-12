var map;

function initMap() {
	
//initialise variables
var osmlayer;
var point;
var safehouses;
var state_border_wms;
var state_border_wfs;
var zerotoone; 
var onetoten;
var tentothirty;
var morethanthirty;
var my_style_one;
var my_style_map_one;
var my_style_two;
var my_style_map_two;
var my_style_three;
var my_style_map_three;
var my_style_four;
var my_style_map_four;

//create new map object
map = new OpenLayers.Map("mymap");

//create new layer object
osmlayer = new OpenLayers.Layer.OSM("Open Street Map");

// Create a Style object by extending existing default vector style and modify styles
my_style_one = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style["default"]);
my_style_one.fillColor = "#ffb3b3";
my_style_two = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style["default"]);
my_style_two.fillColor = "#ff6666";
my_style_three = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style["default"]);
my_style_three.fillColor = "#ff1a1a";
my_style_four = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style["default"]);
my_style_four.fillColor = "#4d0000";


//Create a new Style Map object based on the Style object
my_style_map_one = new OpenLayers.StyleMap(my_style_one);
my_style_map_two = new OpenLayers.StyleMap(my_style_two);
my_style_map_three = new OpenLayers.StyleMap(my_style_three);
my_style_map_four = new OpenLayers.StyleMap(my_style_four);

//add GeoJSON layer
safehouses = new OpenLayers.Layer.Vector("Safe Houses",{
protocol: new OpenLayers.Protocol.HTTP({
url: "safehouses.geojson",
format: new OpenLayers.Format.GeoJSON()
}),
strategies: [new OpenLayers.Strategy.Fixed()],
});

zerotoone = new OpenLayers.Layer.Vector("0 - 1 % Prevalance",{
protocol: new OpenLayers.Protocol.HTTP({
url: "zerotoone.geojson",
format: new OpenLayers.Format.GeoJSON()
}),
strategies: [new OpenLayers.Strategy.Fixed()],
styleMap: my_style_map_one,
});

onetoten = new OpenLayers.Layer.Vector("1 % - 10 % Prevalance",{
protocol: new OpenLayers.Protocol.HTTP({
url: "onetoten.geojson",
format: new OpenLayers.Format.GeoJSON()
}),
strategies: [new OpenLayers.Strategy.Fixed()],
styleMap: my_style_map_two,
});

tentothirty = new OpenLayers.Layer.Vector("10 % - 30 % Prevalance",{
protocol: new OpenLayers.Protocol.HTTP({
url: "tentothirty.geojson",
format: new OpenLayers.Format.GeoJSON()
}),
strategies: [new OpenLayers.Strategy.Fixed()],
styleMap: my_style_map_three,
});

morethanthirty = new OpenLayers.Layer.Vector("> 30 % Prevalance",{
protocol: new OpenLayers.Protocol.HTTP({
url: "morethanthirty.geojson",
format: new OpenLayers.Format.GeoJSON()
}),
strategies: [new OpenLayers.Strategy.Fixed()],
styleMap: my_style_map_four,
});

//create WMS layers
state_border_wms = new OpenLayers.Layer.WMS("Tanzania Border (WMS)",
"http://34.217.48.236:8080/geoserver/web715/wms",
{
layers: "web715:state_border",
transparent: true,
}, {
projection: "EPSG:4326",
visibility: false,
}
);

//create WFS layers
state_border_wfs = new OpenLayers.Layer.Vector("Tanzania Border (WFS)",
{
strategies:[new OpenLayers.Strategy.BBOX()],
protocol: new OpenLayers.Protocol.WFS(
{
version: "1.1.0",
url: "http://34.217.48.236:8080/geoserver/wfs",
featureType: "state_border",
featurePrefix: "web715",
featureNS: "http://geoserver.org/web715",
}
),
visibility: false,
}
);

//add layer to the map
map.addLayer(osmlayer);
map.addLayer(safehouses);
map.addLayer(state_border_wms);
map.addLayer(state_border_wfs);
map.addLayer(zerotoone);
map.addLayer(onetoten);
map.addLayer(tentothirty);
map.addLayer(morethanthirty);

//add LayerSwitcher control object
map.addControl(new OpenLayers.Control.LayerSwitcher());

// define point as a new LonLat object and transfom
point = new OpenLayers.LonLat(36.00, -6.00);
point.transform("EPSG:4326", "EPSG:900913");

//center the map and set zoom level
map.setCenter(point,6);
}