// Gettin GeoLocation when called
function getGeoData() {
    // api json link
    // var url = "http://ip-api.com/json"
    var url = "https://ipapi.co/json"
    //Ajax Request GET
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (data) {
        // console.log(data);

        // var lat = data.lat; //Latitude
        // var lon = data.lon; //Longitude
        // var city = data.city;  //City
        // var state = data.regionName; // State
        // var country = data.country; // country

        //new url HTTPS
        var lat = data.latitude; //Latitude
        var lon = data.longitude; //Longitude
        var city = data.city;  //City
        var state = data.region; // State
        var country = data.country; // country




        // change the inputboxes in the newentry journal form
        $("#input-lat").val(lat);
        $("#input-lon").val(lon);
        $("#input-city").val(city);
        $("#input-state").val(state);
        $("#input-country").val(country); 

        // Another API for getting the current weather condition:
        //We already have Latitude, and Longtitude info and we will get it from this API
        var fullURL = "https://api.darksky.net/forecast/9d227d38df82a82af5c132e981501faf/" + lat + "," + lon + "?extend=hourly&callback=?";
        $.getJSON(fullURL, function (data2) {

            //change the Temprateure and Weather condition inputs in the form:
            $("#input-temp").val(data2.currently.temperature);
            $("#input-w-condition").val(data2.currently.summary);

        });
    });

}