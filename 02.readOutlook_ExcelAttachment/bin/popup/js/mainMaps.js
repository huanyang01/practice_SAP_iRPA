var geocoder;
var map = null; // Map
var view = null; // StreetView
var markers = new Array();
var i = 0;


ctx.initializeMaps = function (obj) {
	// initialize default bootbox dialog
	ctx.initialize(obj);
	// insert Maps object
	if (typeof obj.maps === 'object') {
		geocoder = new google.maps.Geocoder();
		$(obj.content).append('<div id="mapsDiv" class="row"></div>');
		obj.maps.id = obj.maps.id  || '#mapsDiv';
		obj.maps.width = obj.maps.width  || 400;
		obj.maps.height = obj.maps.height  || 300;
		obj.maps.center = obj.maps.center  || { lat: 48.8566667, lng: 2.3509871 }; // default position (Paris)
		var mapProp = {
			zoom: obj.maps.zoom || 14,
			mapTypeId: (obj.maps.satellite ? (obj.maps.legend ? google.maps.MapTypeId.HYBRID : google.maps.MapTypeId.SATELLITE) : (obj.maps.legend ? google.maps.MapTypeId.TERRAIN : google.maps.MapTypeId.ROADMAP )),
			center: obj.maps.center,
			//pov: {heading: 165, pitch: 0},
			position: obj.maps.center
		};
		//mapProp.center = new google.maps.LatLng(obj.maps.center.lat, obj.maps.center.lng);
		if (obj.maps.address) ctx.codeAddress(obj.maps.address);
		var node = $(obj.maps.id);
		if (node) {
			node.css({ "width": obj.maps.width + "px", "height": obj.maps.height + "px" });
			if (obj.maps.streetview) {
				view = new google.maps.StreetViewPanorama(node.get(0), mapProp);
			} else {
				map = new google.maps.Map(node.get(0), mapProp);
			}
		}
	}
}

ctx.codeAddress = function (address) {
	// call geocoder service
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			// update StreetView position
			if (view) { 
				view.setPosition(results[0].geometry.location); 
			}
			// update Maps position
			if (map) { 
				map.setCenter(results[0].geometry.location); 
				// show a marker/
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
				// Remove previous markers
				markers.push(marker);
				if (markers.length > 1) { markers[(i-1)].setMap(null); }
				i++;
			}
		}
	});
}

// function aliases
initialize = ctx.initializeMaps;

