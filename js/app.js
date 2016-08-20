navigator.geolocation.getCurrentPosition(function(position) {
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial&APPID=b535e8bc0e5402bb399f4994e847e3b3', function(json){
    var tempInfo = '';
    var icon;
    var units = 'F';

    if (json['cod'] === '404'){
      $('#justTemp').html("<h3>Oops! We're having trouble finding the weather near you.</h3>")
    }

    switch (json['weather'][0]['main']){
      case 'Rain':
        icon = "R"
        break;
      case 'Snow':
        icon = "W"
        break;
      case 'Clouds':
        icon = "Y"
      break;
      case 'Clear':
        icon = "A"
        break;
      case 'Thunderstorm':
        icon = "A"
        break;
      case 'Dizzle':
        icon = "Q"
        break;
    }
    
    $('#units').on('click', function(){
      if (units === 'F'){
        units = 'C';
        json['main']['temp'] = (json['main']['temp'] - 32) * (5/9);
      } else {
        units = 'F';
        json['main']['temp'] = json['main']['temp'] * 1.8 + 32;
      }
      $('#justTemp').html('<h2> ' + parseInt(json['main']['temp']) + ' ° ' + units + '</h2>');
    });

    $('#location').html('<h1>' + json['name'] + ' </h1>');
    $('#justTemp').html('<h2> ' + parseInt(json['main']['temp']) + ' ° ' + units + '</h2>');
    $('#image').html('<p data-icon="' + icon + '"></p>')
    $('#humid').html('<h3>Humidity: </strong>' + json['main']['humidity'] + '%');
  });
});
