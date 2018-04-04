
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC9W6aHLQG_E1_OtEpNonHfIlun9l5-ikw",
    authDomain: "mytraveljournal-c5500.firebaseapp.com",
    databaseURL: "https://mytraveljournal-c5500.firebaseio.com",
    projectId: "mytraveljournal-c5500",
    storageBucket: "",
    messagingSenderId: "670018236818"
  };
  firebase.initializeApp(config);
var database = firebase.database();

//ebstablish  variable from viewing mode
var mapViewStatus = true;

// show/hide jounral entry form or map view 
$("#btnAdd").click(function () {
    // get updated API INFO FROM GEO LOCATION FUNCTION:
    getGeoData();

    //show display-form div
    //hide display-journal div
    $("#display-journal").hide();
    $("#display-form-div").show();
    
    $("#alert").hide();
    if (mapViewStatus) {
        $(".createJournalWindow").show();
        $("#input-title").focus();
        $("#btnAdd").html("<h1>VIEW MAP</h1>");
        mapViewStatus = false;
    } else {
        $(".createJournalWindow").hide();
        $("#btnAdd").html("<h1>ADD JOURNAL</h1>");
        mapViewStatus = true;
    }
});

$("#btnTog").on("click", toggleListView);

var listofJournalsD = true;
function toggleListView(){
    if(listofJournalsD){
        $("#listofJournalsD").hide();
        $("#btnTog").html("<");
        $("#mapcontainer").attr("class", "col-lg-12 no-float");
        listofJournalsD = false;
    }else{
        $("#listofJournalsD").show();
        $("#btnTog").html(">");
        $("#mapcontainer").attr("class", "col-lg-9 no-float");
        listofJournalsD = true;
    }
}


//cancel button for form
$("#cancel-button").click(function(){
    $("#alert").hide();
    if (mapViewStatus) {
        $(".createJournalWindow").show();
        $("#btnAdd").html("<h1>VIEW MAP</h1>");
        mapViewStatus = false;
    } else {
        $(".createJournalWindow").hide();
        $("#btnAdd").html("<h1>ADD JOURNAL</h1>");
        mapViewStatus = true;
    }
});


//cancel button for display
$("#cancel-button-journal").click(function(){
    if (mapViewStatus) {
        $(".createJournalWindow").show();
        $("#btnAdd").html("<h1>VIEW MAP</h1>");
        mapViewStatus = false;
    } else {
        $(".createJournalWindow").hide();
        $("#btnAdd").html("<h1>ADD JOURNAL</h1>");
        mapViewStatus = true;
    }
    // 3 seconds after the center of the map has changed, pan back to the
            // marker.
                
           
            
});

//id='submit-button' on click
$("#submit-button").click(function () {
    // alert("you clicked submit.");

    var title = $("#input-title").val().trim();
    var content = $("#input-content").val().trim();

    var city = $("#input-city").val().trim();
    var country = $("#input-country").val().trim();
    var state = $("#input-state").val().trim();

    var lon = $("#input-lon").val().trim();
    var lat = $("#input-lat").val().trim();
    var temp = $("#input-temp").val().trim();
    var w_condition = $("#input-w-condition").val().trim();
    var date_time = moment().format();
    // console.log(date_time);

    //data validation:
if(title !=="" && content !==""){
    $("#alert").hide();
    //make an object
    var dataObject = {
        title: title,
        content: content,
        country, country,
        state, state,
        city: city,
        lon: lon,
        lat: lat,
        temp: temp,
        w_condition: w_condition,
        date_time: date_time
    }

    //save it to firebase
    database.ref().push(dataObject);

    //clean the form 
    $("#input-title").val("");
    $("#input-content").val("");
    $("#input-city").val("");
    $("#input-country").val("");
    $("#input-state").val("");
    $("#input-lon").val("");
    $("#input-lat").val("");
    $("#input-temp").val("");
    $("#input-w-condition").val("");
    //focus on the first line
    $("#input-title").focus();
    // alert("saved")
    $(".createJournalWindow").hide();

        $("#btnAdd").html("<h1>ADD JOURNAL</h1>");
        mapViewStatus = true;



}else{
    $("#input-title").focus();
    $("#alert").show();
}

});


database.ref().on("child_added", function (snap) {
    entryKey = snap.key;

    //initialize  vars
    var title = snap.val().title;
    var content = snap.val().content;
    var city =snap.val().city;
    var country =snap.val().country;
    var state =snap.val().state;

    var lon = snap.val().lon;
    var lat = snap.val().lat;
    var temp = snap.val().temp;
    var date_time = snap.val().date_time;
    var w_condition = snap.val().w_condition;
    //changes happened here above

    //creating container div
    var containerDiv = $("<div>");
    containerDiv.attr("class", "articleDiv");

    // creating buttons
    var entryButton = $("<button>");
    entryButton.attr("class", "journalEntry")
    entryButton.attr("data-title", title);
    entryButton.attr("data-content", content);
    entryButton.attr("data-city", city);
    entryButton.attr("data-country", country);
    entryButton.attr("data-state", state);
    entryButton.attr("data-lon", lon);
    entryButton.attr("data-lat", lat);
    entryButton.attr("data-temp", temp);
    entryButton.attr("data-w-condition", w_condition);
    entryButton.attr("data-date-time", date_time);

    entryButton.html("<h4>Title: "+title+"</h4>");
    // entryButton.append("<h3><b>Content: </b>"+content+"</h3>");
    entryButton.append("<p class='btnTimeStampHuman' data-date-time='"+date_time+"'>"+moment.duration(moment().diff(date_time)).humanize()+ " ago."+"</p");
    entryButton.append("<p>Ln: "+lon+", Lt: "+lat+"</p");
    entryButton.append("<p>City: "+city+", State: "+state+", Country: "+country+"</p");
    entryButton.append("<p>Temp: "+temp+", Weather: "+w_condition+"</p");
   
    
    containerDiv.append(entryButton);


 
    $("#listOfJournals").prepend(containerDiv);
})


// populates the Entry Display when Article Button is clicked
$(document).on("click", ".journalEntry", function(event){
    event.preventDefault();
    
    //hide display-form div
    //show display-journal div
    $("#display-journal").show();
    $("#display-form-div").hide();
       // displays the form/results window
    $(".createJournalWindow").show();
    if (mapViewStatus) {
        $("#btnAdd").html("<h1>VIEW MAP</h1>");
        mapViewStatus = false;
    } 

  


    // put entry data into variables
    var entryTitle = $(this).attr("data-title");
    var entryContent = $(this).attr("data-content");
    var entryCity = $(this).attr("data-city");
    var entryCountry = $(this).attr("data-country");
    var entryState = $(this).attr("data-state");

    var entryLon = $(this).attr("data-lon");
    var entryLat = $(this).attr("data-lat");
    var date_time = $(this).attr("data-date-time");
    var entryTemp = $(this).attr("data-temp");
    var entryWeather = $(this).attr("data-w-condition");
    displayJournalOn(entryTitle, entryContent, entryCity, entryState, entryCountry, entryLat, entryLon, entryTemp, entryWeather,date_time);

});



function displayJournalOn(title, content, city, state, country, lat, lon, temp, w_condition, date_time){
    $("#view-titleX").html(title);
    // moment(date_time).format("MMM Do YYYY, h:mm:ss:a")
    $("#view-date-timeX").html(moment(date_time).format("MMM Do YYYY, h:mm:ss:a"));
  
    $("#view-cityX").html(city);
    $("#view-stateX").html(state);
    $("#view-countryX").html(country);
    $("#view-latX").html(lat);
    $("#view-lonX").html(lon);
    $("#view-weather-tempX").html(temp + " F");
    $("#view-weather-conditionX").html(w_condition);
    $("#view-contentX").html(content);
    
    initMap();
    //center the map
    

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4
    });

    map.setCenter(new google.maps.LatLng(lat, parseFloat(lon)+30.00));
    var flightPlanCoordinates = []; 
    database.ref().on("child_added", function (snap) {
        entryKey = snap.key;
        //initialize  vars
        var title = snap.val().title;
        var content = snap.val().content;
        var city = snap.val().city;
        var state = snap.val().state;
        var country = snap.val().country;
        var lon = snap.val().lon;
        var lat = snap.val().lat;
        var temp = snap.val().temp;
        var w_condition = snap.val().w_condition;
        var date_time = snap.val().date_time;
        var iconBase = 'http://maps.google.com/mapfiles/kml/pal3';
        var icons = {
            journalEntry: {
                icon: iconBase + '/icon54.png'
            }
        };
        
        flightPlanCoordinates.push({ lat: parseFloat(lat), lng: parseFloat(lon) });

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            icon: icons.journalEntry.icon,
            title: title
        });

       

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
}

setInterval(updateHumanDate, 10000);

function updateHumanDate(){

    $(".btnTimeStampHuman").each(function(i, element){
        var date_time =$(this).attr("data-date-time");
        date_time = moment(date_time);
        $(this).html(moment.duration(moment().diff(date_time)).humanize() + " ago.");
        

    });
}