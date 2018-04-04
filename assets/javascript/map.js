function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2
    });
    map.setCenter(new google.maps.LatLng(41.850033, -87.6500523));


    var flightPlanCoordinates = []; 

    database.ref().on("child_added", function (snap) {
        entryKey = snap.key;
        //initialize  vars
        var title = snap.val().title;
        var content = snap.val().content;
        var city = snap.val().city;
        var state = snap.val().state;
        var country = snap.val().country;
        var lon = parseFloat(snap.val().lon);
        var lat = parseFloat(snap.val().lat);
        var temp = snap.val().temp;
        var w_condition = snap.val().w_condtion;
        var date_time = snap.val().date_time;
        var iconBase = 'http://maps.google.com/mapfiles/kml/pal3';
        var icons = {
            journalEntry: {
                icon: iconBase + '/icon54.png'
            }
        };
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            icon: icons.journalEntry.icon,
            title: title
        });


       
        flightPlanCoordinates.push({ lat: lat, lng: lon });

        google.maps.event.addListener(marker, 'click', (function (marker) {
            return function () {
                displayJournalOn(title, content, city, state, country, lat, lon, temp, w_condition, date_time);
                //show journal
                //hide form div
                //show journal display div
                //make the button on map changed

                $("#display-journal").show();
                $("#display-form-div").hide();
                $(".createJournalWindow").show();
                if (mapViewStatus) {
                    $("#btnAdd").html("<h1>VIEW MAP</h1>");
                    mapViewStatus = false;
                }

                // console.log(title); 
            }
        })(marker, title));

        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });

        flightPath.setMap(map);
    });
    //console.log(flightPlanCoordinates);
    //console.log(testFlightPlanCoordinates);
}
