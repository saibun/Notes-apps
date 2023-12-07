/**
 * Title - Command Page.
 * Description - Creating my commands for build notes.
 * Author - Saikat Chatterjee.
 * Date - 12.07.23.
 */

//Dependencies
const yargs = require("yargs");
const notes = require(`${__dirname}/notes.js`);
//scaffolding

//create command for adding note
yargs.command({
    command: "create",
    description: "create a note",
    builder:{
        title:{
            description: "Title for note",
            demandOption: true,
            type:"string",
        },
        body:{
            description: "write your note",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv){
        notes.create(argv.title,argv.body);
    },
})

//read command for reading all notes
yargs.command({
    command: "read",
    description: "read a note",
    builder:{
        title:{
            description:"appropriate title for reading notes",
            deamandOption: true,
            type: "string",
        }

    },
    handler(argv){
        notes.read(argv.title);
    }
})

//list command for all notes list
yargs.command({
    command: "list",
    description: "List of all notes",
    handler(){
        notes.list();
    }
   

})

//title update command 
yargs.command({
    command: "updateT",
    description: "update title in  notes",
    builder:{
        title: {
            description:"previous title name",
            demandOption: true,
            type: "string",
        },
        newTitle:{
            description:"new title name",
            demandOption: true,
            type: "string",

        },
    },
    handler(argv){
        notes.updateT(argv.title,argv.newTitle);
    }
})
//body update command 
yargs.command({
    command: "updateB",
    description: "update body in notes",
    builder:{
        title: {
            description:"title name",
            demandOption: true,
            type: "string",
        },
        body:{
            description:"Edit notes",
            demandOption: true,
            type: "string",

        },
    },
    handler(argv){
        notes.updateB(argv.title,argv.body);
    }
})

//delete note command
yargs.command({
    command: "delete",
    description: "delete a note",
    builder:{
        title:{
            description: "title of particular note want to delete",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv){
        notes.delete(argv.title);
    }
})
//calling yargs
yargs.parse();