if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
  $.getJSON("https://api.wunderground.com/api/099ff2702a458d9e/conditions/q/" + position.coords.latitude + "," + position.coords.longitude + ".json", function(json){
    var icon = json.current_observation.icon_url.replace(/http/g, 'https');
    console.log(icon);
    var units = 'F';
    $('#units').on('click', function(){
      if (units === 'F'){
        this.innerHTML = "Show °F";
        units = 'C';
        json.current_observation.temp_f = (json.current_observation.temp_f - 32) * (5/9);
      } else {
        this.innerHTML = "Show °C";
        units = 'F';
        json.current_observation.temp_f = json.current_observation.temp_f * 1.8 + 32;
      }
      $('#justTemp').html('<h2> ' + parseInt(json.current_observation.temp_f) + ' ° ' + units + '</h2>');
    });
    $('#location').html('<h1>' + json.current_observation.display_location.full + ' </h1>');
    $('#justTemp').html('<h2> ' + parseInt(json.current_observation.temp_f) + ' ° ' + units + '</h2>');
    $('#image').html('<img src="' + icon + '">');
    $('#humid').html('<h3>Humidity: </strong>' + json.current_observation.relative_humidity);
  }).fail(function(jqXHR){
    if (jqXHR.status !== 200){
      $('#justTemp').html("<h3>Oops! We're having trouble finding the weather near you.</h3>");
    }
  });
}, function(error){
  if (error.code === error.PERMISSION_DENIED){
    $('#justTemp').html('<h3>Browser geolocation required for this page to report the weather.</h3>');
  }
});
}
