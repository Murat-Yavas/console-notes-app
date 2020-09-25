const fs = require("fs");
const chalk = require("chalk");


const addNote = (title,body) =>{
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title); //bir array oluşturduk. eğer tekrarlanan öğe bulunursa, bu öğenin içine atılacak
    const duplicateNote = notes.find((note) => note.title === title);
    
    if(!duplicateNote) {
        notes.push({
            title:title,
            body:body
        })
    
        saveNotes(notes);
        console.log("New note added")
    }
    else {
        console.log("Note title taken")
    }
   
}

const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes =() =>{
    try{
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }

  
}

const removeNote = (title) =>{
    const notes = loadNotes();

    const length = notes.length;

    notes.forEach((note,index) =>{
        if(note.title === title){
            notes.splice(index,1);
        } 
    });
    if(length !== notes.length){
        console.log(chalk.green.bold("success"));
        saveNotes(notes);
    }
    else {
        console.log(chalk.red.bold("fail"));
    }
}


const listNote = () => {
    const notes = loadNotes();

    notes.forEach((note) => {
        console.log(chalk.red.inverse(`Your notes : ${note.title}`))
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) =>note.title === title);

    if(note){
       console.log(chalk.green.inverse(note.title))
       console.log(note.body)
    }else {
        console.log(chalk.red("unable to find"))
    }
    
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNote : listNote,
    readNote : readNote
}