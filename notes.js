/**
 * Title - Command Operations.
 * Description - Handling my commands operation for building notes.
 * Author - Saikat Chatterjee.
 * Date - 12.07.23.
 */

//Dependencies
const chalk = require("chalk");
const fs = require("fs");
const { json } = require("stream/consumers");

//scaffolding
const n = {};
const log = console.log;

//create comand operation
n.create = (title,body)=>{

    //check any notes exist or note
    const allNote = n.loadNote();
    
    //check title allreay present or not
    const checkTitle = n.checkTitle(allNote,title);

    //condition for title
    if(!checkTitle){
        //push the new title and body into note array
        allNote.push({
            title: title,
            body: body,
        })

        //write into file
        n.writeIntoFile(allNote);

        //print a message
        console.log(chalk.bgGreen("Note stored successfully....."));


    }else{
        console.log(chalk.bgRed("opps! title already used......"));
    }
}

//read command operation
n.read = (title) =>{
    //load all note
    const allNote = n.loadNote();
    //check that title present or not
    const checkTitle = n.checkTitle(allNote,title);
    //check condition
    if(checkTitle){
        console.log(`${chalk.inverse(checkTitle.title)}:--> ${checkTitle.body}`);
    }else{
        console.log(chalk.bgRed("opps! title does not exist......"))
    }

}

//list command operation
n.list = () => {
    const allNote = n.loadNote();
    log(chalk.inverse("List of notes are ..."));
    allNote.forEach(element => log(element.title));
    
}



//update notes title
n.updateT = (title,newTitle)=>{
    //load all notes
    const allNote = n.loadNote();
    //check old title
    const checkTitle = n.checkTitle(allNote,title);
    
    //change into new if previous match
    if(checkTitle){
        //fetche the position of title
        const indexPos = allNote.indexOf(checkTitle);
        //change the title in seperate array
        checkTitle.title = newTitle;
        //update the original array
        allNote.splice(indexPos,1,checkTitle)
        //write the new arrya into notes.json file
        n.writeIntoFile(allNote);
        //print a message
        log(chalk.bgGreen("Successfully! title updated....."))
        
    }else{
        log(chalk.bgRed("oops! title does not match....."))
    }
}

//update notes body
n.updateB = (title,body)=>{
    //load all notes
    const allNote = n.loadNote();
    //check old title
    const checkTitle = n.checkTitle(allNote,title);
    
    //change into new if previous match
    if(checkTitle){
        //fetche the position of title
        const indexPos = allNote.indexOf(checkTitle);
        //change the title in seperate array
        checkTitle.body = body;
        //update the original array
        allNote.splice(indexPos,1,checkTitle)
        //write the new arrya into notes.json file
        n.writeIntoFile(allNote);
        //print a message
        log(chalk.bgGreen("Successfully! note updated....."))
        
    }else{
        log(chalk.bgRed("oops! title does not match....."))
    }
}

//delete notes
n.delete = (title)=>{
    //load note
    const allNote = n.loadNote();
    const keepNote = allNote.filter( e => e.title !== title );
    if(keepNote.length < allNote.length){
        n.writeIntoFile(keepNote);
        log(chalk.bgGreen("Successfully! note delete"));
    }else{
        log(chalk.bgRed("Not present!"));
    }
}
//deleteAll notes
n.deleteAll = ()=>{
    let allNote = n.loadNote();
    allNote = [];
    n.writeIntoFile(allNote);
    log(chalk.bgGreen("Successfully! all notes deleted"));
}
//load all notes
n.loadNote =()=>{
    try{
        const dataInBuffer = fs.readFileSync('notes.json');
        const dataInString = dataInBuffer.toString();
        const dataInObj = JSON.parse(dataInString);
        return dataInObj;

    }catch(e){
        return []
    }
} 

//check a title already present or note
n.checkTitle = (allNote,title)=>{
   const presentTitle =  allNote.find( n => n.title === title);
   return presentTitle;
}

//write data into notes.json file
n.writeIntoFile = (data) => fs.writeFileSync("notes.json",JSON.stringify(data));

//module exports
module.exports = n;