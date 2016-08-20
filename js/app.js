if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  $.getJSON("https://api.wunderground.com/api/099ff2702a458d9e/conditions/q/" + position.coords.latitude + "," + position.coords.longitude + ".json", function(json){
    var icon;
    var units = 'F';
    $('#units').on('click', function(){
      if (units === 'F'){
        units = 'C';
        json.current_observation.temp_f = (json.current_observation.temp_f - 32) * (5/9);
      } else {
        units = 'F';
        json.current_observation.temp_f = json.current_observation.temp_f * 1.8 + 32;
      }
      $('#justTemp').html('<h2> ' + parseInt(json.current_observation.temp_f) + ' ° ' + units + '</h2>');
    });
    $('#location').html('<h1>' + json.current_observation.display_location.full + ' </h1>');
    $('#justTemp').html('<h2> ' + parseInt(json.current_observation.temp_f) + ' ° ' + units + '</h2>');
    $('#image').html('<img src="' + json.current_observation.icon_url + '">');
    $('#humid').html('<h3>Humidity: </strong>' + json.current_observation.relative_humidity);
  }).fail(function(jqXHR){
    if (jqXHR.status !== 200){
      $('#justTemp').html("<h3>Oops! We're having trouble finding the weather near you.</h3>");
    }
  });
});
} else {
  $('#justTemp').html('<h3>Browser geolocation required for this page to report the weather.</h3>');
}
