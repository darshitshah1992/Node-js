const fs = require('fs');
// const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs=require('yargs');

const titleNote ={
	describe: 'Title of Note', 
		demand: true,
		alias: 't'
};

const bodyNote ={
	describe: 'Body of Note', 
		demand: true,
		alias: 'b'
};

const argv = yargs.command('add','Add a new node',{
	title : titleNote,
	body : bodyNote
})
.command('list','List all notes')
.command('read', 'Read a note',{
	title: titleNote
})
.command('remove', 'Remove a note',{
	title: titleNote
})
.help().argv;
// var user = os.userInfo();
//console.log(user);
// fs.appendFile('greetings.txt',`Hello ${user.username}! Your are ${notes.age}.`, function(error){
// 	if(error){
// 		console.log('error occured');
// 	}
// });

//var result = notes.add(2,3);
//console.log(result);

// console.log(_.isString(true));
// console.log(_.isString('Darshit'));

// var filteredArray = _.uniq(['Abcdabcd',1,'Darshit',1,2,3,4]);
// console.log(filteredArray);

var command = argv._[0];

//console.log('Command: ',command);
//console.log('process: ',process.argv);
//console.log('yargs: ',argv);
//console.log(process.argv);
if(command === 'add'){
	var note = notes.addNote(argv.title, argv.body);

	if(typeof note === "undefined"){
		console.log('note already exist');
	}
	else {
		console.log('note created successfully');
		notes.logNote(note);
	}
}
else if(command === 'list'){
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => {
		notes.logNote(note);
	});
}
else if(command === 'remove'){
	var note = notes.removeNote(argv.title);
	var message = note ? `note with title ${argv.title} is removed successfully`: `note with title ${argv.title} does not exist`;
	console.log(message);
	
}
else if(command === 'read'){
	var filteredNotes = notes.readNote(argv.title);

	if(filteredNotes){
		notes.logNote(filteredNotes);
	}
	else
	{
		console.log(`Note does not exist`);
	}
}
else{
	console.log('not recognized');		
}