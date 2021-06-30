// 9cb1f6e8f6f8be6bad988c51f6323f3b
function displayWeather() {
	fetch("http://api.openweathermap.org/data/2.5/weather?id=484907&appid=9cb1f6e8f6f8be6bad988c51f6323f3b&units=metric")
	.then(function(resp) {
		return resp.json();
	})
	.then(function(data) {
		document.querySelector(".city-name").innerHTML = data.name;
		document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "&#176;C" + " (" + Math.round(data.main.feels_like) + "&#176;C)";
		document.querySelector(".description__inner").innerHTML = data.weather[0].description;
		document.querySelector(".icon").innerHTML = `<img class="icon__inner" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="30" height="30">`;
		document.querySelector(".arrow__inner").style.transform = 'rotate(' + data.wind.deg + 'deg)';
		document.querySelector(".wind__speed").innerHTML = `${Math.round(data.wind.speed)} m/s`
	});
}

displayWeather();
setInterval(displayWeather, 60000);