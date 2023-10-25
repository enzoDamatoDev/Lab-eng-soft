// Initialize and add the map
let map;

async function initMap(lat, long) {
    // The location of Uluru
    const position = { lat: lat, lng: long };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
    const { drawing } = await google.maps.importLibrary("drawing"); 
    const { geometry } = await google.maps.importLibrary("geometry");

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerView({
        map: map,
        position: position,
        title: "Uluru",
    });

    var drawingManager = new google.maps.drawing.DrawingManager();
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (poli){
        console.log(google.maps.geometry.poly.containsLocation(position, poli));
    });
    /*google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        switch (event.type) {
            case 'circle':
                console.log(event.overlay.getBounds());
                console.log(google.maps.geometry.poly.containsLocation(position, event.overlay));
                break;
            case 'polyline':
                console.log(event.overlay.getPath());
                console.log(google.maps.geometry.poly.containsLocation(position, event.overlay.getPath()));
                break;
            case 'polygon':
                console.log(event.overlay.getPath());
                console.log(google.maps.geometry.poly.containsLocation(position, event.overlay))
                break;
            case 'rectangle':
                console.log(event.overlay.getBounds());
                console.log(google.maps.geometry.poly.containsLocation(position, event.overlay.getBounds()));
                break;
            case '':

                break;
        }*/
        /* if (event.type == 'circle') {
            var radius = event.overlay.getRadius();
        }
        if (event.type == 'Polyline') {
            var radius = event.overlay.getRadius();
        }* /
    });*/
}



/*function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 44.5452, lng: -78.5389 },
        zoom: 9,
    });
    const bounds = {
        north: 44.599,
        south: 44.49,
        east: -78.443,
        west: -78.649,
    };
    // Define a rectangle and set its editable property to true.
    const rectangle = new google.maps.Rectangle({
        bounds: bounds,
        editable: true,
        draggable: true,
    });

    rectangle.setMap(map);
    // listen to changes
    ["bounds_changed", "dragstart", "drag", "dragend"].forEach((eventName) => {
        rectangle.addListener(eventName, () => {
            console.log({ bounds: rectangle.getBounds()?.toJSON(), eventName });
        });
    });
}

window.initMap = initMap;*/

