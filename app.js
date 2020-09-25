const chalk = require("chalk");
const { argv } = require("yargs");
const yargs = require("yargs");
const notes = require("./notes.js");

// Customize yargs version
yargs.version("1.1.0");

//Create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption:true,
            type:"string"
        },
        body:{
            describe:"Note body",
            demandOption:true,
            type:"string"
            
        }

    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }

});

//Create remove command
yargs.command({
    command: "remove",
    describe: "remove a new note",
    builder: {
        title: {
            describe:"Note title",
            demandOption:true, //true ise title verilmesini zorunlu kılar
            type:"string"
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }

});

//Create list command
yargs.command({
    command: "list",
    describe: "list your notes",
    handler (){
        notes.listNote();
    }
});


//Create read command
yargs.command({
    command: "read",
    describe: "read all notes",
    builder: {
        title: {
            describe:"Note title",
            demandOption:true, 
            type:"string"
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }

});

yargs.parse();
// console.log(yargs.argv)
