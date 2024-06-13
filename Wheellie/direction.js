// An event listener to the document that will execute the following function once the HTML content is fully loaded.
document.addEventListener('DOMContentLoaded', function() {
    let map = L.map('map').fitWorld(); // Initialize a Leaflet map within the 'map' div, and adjust the view to encompass the entire globe.
    // Add a layer of map tiles from OpenStreetMap, specifying the maximum zoom level to prevent excessive zooming.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    let originalLatLng = null; // Variables to store the original latitude and longitude, and zoom level of the map.
    let originalZoom = null;
    let currentLocation = null; 
    // Variable to store the current location as it is found.
    const burgerKingLocation = L.latLng(50.841332321612974, 4.363517303320748); // Define a specific location for Burger King using latitude and longitude coordinates.

     // Function to handle the event when the map successfully locates the user.
    function onLocationFound(e) {
        // If this is the first location found, capture the map's initial center and zoom level.
        if (!originalLatLng) {
            originalLatLng = map.getCenter();
            originalZoom = map.getZoom();
        }

        currentLocation = e.latlng;  // Update the current location with the new location found.
        let radius = e.accuracy / 2; // Calculate the radius for accuracy indication from the location accuracy provided by the event.

        // Create an icon for marking the location on the map.
        let locationIcon = L.icon({
            iconUrl: 'main-img/pin.png', 
            iconSize: [80, 80], 
            iconAnchor: [40, 80] 
        });

        // Place a marker at the current location with the custom icon.
        L.marker(currentLocation, {icon: locationIcon}).addTo(map)
       
        // Draw a circle around the current location to visually represent the location accuracy.
        L.circle(currentLocation, radius).addTo(map);
        // Also, add a marker at the predefined Burger King location and provide a popup.
        L.marker(burgerKingLocation).addTo(map)
            .bindPopup("Burger King Location").openPopup();

        // Draw a line connecting the current location to the Burger King location, colored red.
        L.polyline([currentLocation, burgerKingLocation], {color: 'red'}).addTo(map);
    }

    // Function to handle errors when attempting to locate the user.
    function onLocationError(e) {
        alert("Error finding your location: " + e.message); // Display an alert message with the error detail.
    } 

    // Function to set up click handlers for elements classified as '.public-transport-option'.
    function setupBusInfoClickHandlers() {
        // Select all elements with the 'public-transport-option' class.
        const transportOptions = document.querySelectorAll('.public-transport-option');
        // Add a click event listener to each transport option to toggle visibility of its details.
        transportOptions.forEach(option => {
            option.addEventListener('click', () => {
                const details = option.querySelector('.transport-details');
                // Toggle the display property between 'block' (visible) and 'none' (hidden).
                if (details.style.display === 'none' || !details.style.display) {
                    details.style.display = 'block'; // Show details
                } else {
                    details.style.display = 'none'; // Hide details
                }
            });
        });
    }
    
    // Initialize the map and set it to listen for specific location-related events.
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    // Start locating the user with options to automatically set the view to the user's location and limit the max zoom level.
    map.locate({setView: true, maxZoom: 15});
    // Access the direction button and its text element by their IDs.
    const directionButton = document.getElementById('directionButton');
    const directionButtonText = document.getElementById('directionButtonText');
    // Add an event listener to handle clicks on the direction button.
    directionButton.addEventListener('click', function() {
        if (directionButtonText.textContent === "Direction") { // Toggle the button text and styling based on its current state.
            directionButtonText.textContent = "Cancel";
            directionButton.classList.add('cancel');
            map.setView(currentLocation, 18); // Zoom into the current location to provide a detailed view.
        } else {
            directionButtonText.textContent = "Direction";
            directionButton.classList.remove('cancel');
            map.setView(originalLatLng, originalZoom); // Reset the map view to the original location and zoom level.
        }
    });

     // Event listener for the back button to redirect the user to 'main.html'.
    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = 'main.html'; // Redirect to 'main.html'
    });

    // Event listeners for route buttons to display route information based on the selected mode (car, bus, walk).
    document.getElementById('carRoute').addEventListener('click', function() {
        updateRouteInfo('car');
        updateActiveClass(this);
    });

    document.getElementById('busRoute').addEventListener('click', function() {
        updateRouteInfo('bus');
        updateActiveClass(this);
    });

    document.getElementById('walkRoute').addEventListener('click', function() {
        updateRouteInfo('walk');
        updateActiveClass(this);
    });


    // Function to update the route information displayed on the map and user interface.
    function updateRouteInfo(mode) {
        const directionIcon = document.querySelector('.direction-icon');
        const address = document.querySelector('.adress');
        const timeKm = document.querySelector('.time-km');
        const carIcon = document.querySelector('.car-icon');
        const busInfo = document.querySelector('.bus-information');

        busInfo.style.display = 'none'; // Hide bus info by default
        // Update the UI elements based on the selected travel mode.
        if (mode === 'car') {
            directionIcon.src = 'img/direction-icon.svg';
            address.textContent = 'Chau. d/Ixelles 53, 1050, Ixelles';
            timeKm.textContent = '17 min (4.4 km)';
            carIcon.src = 'direction/Car Route Icon.svg';
        } else if (mode === 'bus') {
            busInfo.style.display = 'block';
          
            carIcon.src = 'direction/Bus Icon.svg';
        } else { // 'walk'
            directionIcon.src = 'img/walk-direction-icon.svg';
            address.textContent = 'Chau. d/Ixelles 53, 1050, Ixelles - Walking Path';
            timeKm.textContent = '44 min (3.1 km)';
            carIcon.src = 'direction/Walk Icon.svg';
        }
    }


    
    
    function updateActiveClass(selectedElement) {
        document.querySelectorAll('.route-buttons div').forEach(element => {
            element.classList.remove('active');
        });
        selectedElement.classList.add('active');
    }
});


document.addEventListener('DOMContentLoaded', initMap);


