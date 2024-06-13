

document.addEventListener('DOMContentLoaded', function () {
        // Ensures that all HTML elements are fully loaded and accessible before executing any JavaScript, 
        // preventing any DOM manipulation errors.


    function initMap() {
        // Initializes and displays a map within the 'map' HTML div element. The 'fitWorld' method 
        // automatically adjusts the map's view to include the entire world when the page loads, 
        // which is useful for giving an initial global context before zooming in.


        let map = L.map('map').fitWorld();
        // Sets up and adds a layer of tiles to the map using OpenStreetMap as the source.
        // Tiles are square bitmap graphics displayed in a grid arrangement to show map data.
        // The 'maxZoom' option controls how close the map can be zoomed into the surface,
        // here limited to 18 to balance detail and performance.


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(map);
        // Defines what happens when the map successfully locates the user. The event object 'e'
        // contains the location data including latitude and longitude.


        function onLocationFound(e) {
            let radius = e.accuracy / 2;
        // Divides the location accuracy by 2 to use as the circle's radius, 
        // which represents the area around the location where the actual position is likely to be.


            let locationIcon = L.icon({         // Defines a visual marker using a custom icon to represent the user's location on the map.
                iconUrl: 'main-img/pin.png',    // Specifies the path to the image used as the marker icon.
                iconSize: [80, 80],             // Sets the size of the icon in pixels.
                iconAnchor: [20, 40]            // Anchors the icon so that this point of the icon image corresponds
            });

            L.marker(e.latlng, {icon: locationIcon}).addTo(map); // Adds a marker to the map at the user's current location using the defined icon and opens
            L.circle(e.latlng, radius).addTo(map);
            // Draws a circle centered at the user's location with the calculated radius, visually
            // indicating the area where the user is likely to be within.
        }


        // Function to handle cases where the map fails to find the user's location, which could be due to 
        // various reasons like the user denying permission to access location data.
        function onLocationError(e) {

            // Alerts the user with a message detailing the problem encountered while attempting to locate them.
            alert("Error finding your location: " + e.message);
        }


        // Registers the above functions as handlers for the respective events. This setup ensures that
        // when the map emits a 'locationfound' or 'locationerror' event, the appropriate functions are called.
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        // Initiates the process to obtain and display the user's current geographic location. The 'setView'
        // option automatically adjusts the map's center and zoom level to the user's location.
        map.locate({setView: true, maxZoom: 16});



        // Adding an event listener to the '.warning-icon'. When clicked, it will toggle the visibility of the '.report-base-BASIC' popup.
        document.querySelector('.warning-icon').addEventListener('click', function () {
            let popup = document.querySelector('.report-base-BASIC');
            // Checks the current display style of the popup and toggles it between 'none' (hidden) and 'flex' (visible).
            popup.style.display = window.getComputedStyle(popup).display !== 'none' ? 'none' : 'flex';
        });


        // Attaches a keypress event listener to the element with id 'searchInput'.
        document.getElementById('searchInput').addEventListener('keypress', function (event) {
            // Checks if the key pressed is the Enter key.
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevents the default action of the Enter key (form submission or other).
                let searchValue = document.getElementById('searchInput').value; // Retrieves the text entered in the search input.
                if (searchValue.trim().toLowerCase() === 'burger king') { // Converts the search value to lowercase and checks if it matches 'burger king'.
                    window.open('direction.html', '_blank'); // Opens the 'direction.html' page in a new tab if it matches.
                } else {
                    alert("Please enter 'Burger King' to proceed."); // Shows an alert if the entered text does not match.
                }
            }
        });


        // A mapping object that links feature names to their corresponding icon file paths.
        let iconMapping = {
            "Accessible": "report-tab/accessible-icon.svg",
            "Inaccessible": "report-tab/inaccessible-icon.svg",
            "Stairs": "report-tab/stairs-icon.svg",
            "Stairs Free": "report-tab/stairs-free-icon.svg",
            "Elevator": "report-tab/elevator-icon.svg",
            "Elevator Free": "report-tab/elevator-icon.svg",
            "Closed Road": "report-tab/closed-road-icon.svg",
            "Construction": "report-tab/construction-work-icon.svg",
            "Message": "report-tab/message-icon.svg"
        };


        // Selects all elements with the class '.icon-container'.
        let iconContainers = document.querySelectorAll('.icon-container');
        // Adds a click event listener to each icon container.
        iconContainers.forEach(function (container) { 
            container.addEventListener('click', function () {
                let featureName = this.textContent.trim(); // Gets the text content of the clicked container, trimmed of whitespace.
                let iconSrc = iconMapping[featureName];  // Retrieves the corresponding icon source URL from the mapping object.
                // Displays a confirmation dialog asking if the user wants to report this feature.
                if (confirm("Do you want to report this feature as " + featureName + "?")) {  // If confirmed, locate the user's position.
                    map.locate().on('locationfound', function (e) { // Creates a Leaflet icon with the specific icon source.
                        let icon = L.icon({
                            iconUrl: iconSrc,
                            iconSize: [50, 50],
                            iconAnchor: [16, 16]
                        });
                        L.marker(e.latlng, {icon: icon}).addTo(map); // Places a marker on the map at the found location with the custom icon.
                        document.querySelector('.report-base-BASIC').style.display = 'none';  // Hides the report popup once the feature is reported.
                    }).on('locationerror', function (e) {
                        alert("Error finding your location: " + e.message); // If location finding fails, display an error alert.
                    });
                }
            });
        });
    }

    initMap(); // Calls the function to initialize the map and its functionalities.
});
