// Code to compute distance between coords
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude); var startLongRads = degreesToRadians(startCoords.longitude); var destLatRads = degreesToRadians(destCoords.latitude); var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371; // radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}
function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180; return radians;
}
// End

// Code to display the map
var map;
function showMap(coords) {
    var googleLatandLong =
        new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
        zoom: 17,
        center: googleLatandLong,
        mapTypeId: google.maps.MapTypeId.ROaDMaP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);

    // add marker
    var title = "Your Location";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatandLong, title, content);
}

function addMarker(map, latlong, title, content) {
    var markerOptions = {
        position: latlong, map: map,
        title: title, clickable: true
    };
    var marker = new google.maps.Marker(markerOptions);
    var infoWindowOptions = { content: content, position: latlong
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker, "click", function() { infoWindow.open(map);});
}
//End

function scrollMapToPosition(coords) {
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latlong = new google.maps.LatLng(latitude, longitude);
    
    map.panTo(latlong);
    addMarker(map, latlong, "Your new location", "You moved to: " + latitude + ", " + longitude);
}

var watchId = null;

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLoc, displayError);
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    const locDiv = document.getElementById("location");
    locDiv.innerHTML = `Error: ${errorTypes[error.code]}`;

}

function displayLoc(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const locDiv = document.getElementById("location");
    locDiv.innerHTML = `You are at lat: ${latitude}, lon: ${longitude}.`;
    locDiv.innerHTML += " (with " + position.coords.accuracy + " meters accuracy)";

    const coCoord = {
        latitude: 1.346867,
        longitude: 103.7301947
    };
    const km = computeDistance(position.coords, coCoord);
    const distDiv = document.getElementById("distance");
    distDiv.innerHTML = `You and me are ${Math.round(km)}km appart.`;

    // showMap(position.coords);
    if (map == null) {
        showMap(position.coords);
    } else {
        scrollMapToPosition(position.coords);
    }


}

function getMyLocation() {
    if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(displayLoc, displayError);
        var watchButton = document.getElementById("watch"); 
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    }
    else {
        console.log("Location Disabled!");
    }
}

// setInterval(displayLoc, 3000);

window.onload = getMyLocation;