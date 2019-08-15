window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let locationTimezone2 = document.querySelector(".location-timezone-2");
	
	var city;
	var timezone;
	var cutLocation;
	
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;
			
			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api =`${proxy}https://api.darksky.net/forecast/f34727f44bd2e4ee18d66b5144d0b17d/${lat},${long}`;
			
			fetch(api)
			.then(response =>{
				return response.json();
			})
		
			.then(data => {
				const {temperature, summary, icon} = data.currently;
				//Set DOM Elements from the API
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				
				city=data.timezone;
				timezone=data.timezone;
				
				cutLocation = city.indexOf("/");
				
				timezone = timezone.slice(0,cutLocation);
				city = city.slice((cutLocation+1),city.length);
				
				console.log(city);
				console.log(timezone);
				
				locationTimezone.textContent = city;
				locationTimezone2.textContent = timezone;
				setIcons(icon, document.querySelector(".icon"));
			});
		});	
	}
	
	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});