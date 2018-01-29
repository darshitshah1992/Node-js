const request = require('request');

var getWeather=(latitude, longitude, callback)=>{
	
	request({
			url: `https://api.darksky.net/forecast/5ffafc2b7a17ba1a4b190df62f93260d/${latitude},${longitude}`,
			json: true
		},(error, response, body)=>{
	
		if(!error && response.statusCode===200){
			callback(undefined,{
				temperature: body.currently.temperature,
				actual_temperature: body.currently.apparentTemperature
			});
		}
		else{
			callback('Unable to fetch weather.');
		}	
	});
};

module.exports={
	getWeather
};

