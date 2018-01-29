const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
})
.help('help','h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response)=>{
	if(response.data.status==='ZERO_RESULTS'){
		throw new Error('Unable to find the address');
	}
	
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherURL = `https://api.darksky.net/forecast/5ffafc2b7a17ba1a4b190df62f93260d/${lat},${lng}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherURL);
})
.then((response)=>{
	var temp = response.data.currently.temperature;
	var apertTemp = response.data.currently.apparentTemperature;
	console.log(`It's ${temp} and it feels like ${apertTemp}`);
})
.catch((errorMessage)=>{
	if(errorMessage.code==='ENOTFOUND'){
		console.log('Unable to connect to google server');
	}
	else{
		console.log(errorMessage.message);
	}
	
});