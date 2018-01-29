console.log('Starting app');

setTimeout(()=>{
	console.log('inside of callback');
},2000);

setTimeout(()=>{
	console.log('inside zero time callback');
},0);
console.log('Ending app');