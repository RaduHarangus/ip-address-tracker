
var ip = "8.8.8.8";
var api_key = "at_8ImEfWwvJg9bMIiN39bWGslexvvsF";
var mymap;
var marker;
  
mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    // id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmFkdWRlIiwiYSI6ImNrcGk0ZHVxcTA2YWMyb3BubTdxOWI4cDYifQ.J65VQR3ntJ3EEXLzhXZOXA'
}).addTo(mymap);

function getLocation(ipAddress) {
    $("#inputIp").val(ipAddress);
    $("#detailIp").html(ipAddress);
    $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data: {apiKey: api_key, ipAddress: ipAddress},
        success: function(data) {
            // console.log(JSON.stringify(data,"",2));
            const city = data.location.city; 
            const country = data.location.country; 
            const postalCode = data.location.postalCode || "no postal code";
            const timezone = data.location.timezone;
            $("#detailLocation").html(`${city}, ${country}, ${postalCode}`);
            $("#detailTimezone").html(`UTC ${timezone}`);
            $("#detailIsp").html(data.isp);
            const lat = data.location.lat;
            const lng = data.location.lng;
            mymap.setView([lat, lng], 13);
            marker = L.marker([lat, lng]).addTo(mymap);
        }
    });
}

document.getElementById("submit").addEventListener('click', 
    function() { 
        getLocation($("#inputIp").val());
    });

$.getJSON("https://api.ipify.org?format=json",
function(data) {
    ip = data.ip;
    getLocation(ip);
});




