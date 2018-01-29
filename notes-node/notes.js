// console.log(module);

// module.exports.addNote = () =>{
// 	console.log('addNote');
// 	return 'New note';
// };

// module.exports.add = (a,b)=>{
// 	console.log('add');
// 	return a+b;
// };

const fs = require('fs');

var fetchNotes = () => {

	try{
		var stringNote = fs.readFileSync('note-data.json');
		notes = JSON.parse(stringNote);
		return notes;
	}
	catch(e){
		return [];
	}

};

var saveNotes = (notes) => {

	fs.writeFileSync('note-data.json', JSON.stringify(notes));

};

var addNote = (title, body) => {
	//console.log('Adding note', title, body);
	var notes = fetchNotes();	
	var note = {
		title,
		body
	};
	var duplicateNotes = notes.filter((note)=> note.title === title);
	
	if(duplicateNotes.length===0){
	notes.push(note);
	saveNotes(notes);
	return note;
	}
};

var getAll = () =>{
	//console.log('Getting all notes');
	var allNotes = fetchNotes();
	return allNotes;
};

var removeNote = (title) => {
	var notes = fetchNotes();
	var updatedNotes = notes.filter((note)=> note.title !== title);
	saveNotes(updatedNotes);
	return notes.length!==updatedNotes.length;
};

var readNote = (title) => {
	//console.log('reading note with title: ', title);
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note)=> note.title === title);
	return filteredNotes[0];
};

var logNote = (note) => {
	debugger;
	console.log('--');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}

module.exports = {
	addNote,
	getAll,
	removeNote,
	readNote,
	logNote
};