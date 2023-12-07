Created a note taking app by the help of Node.js and npm modules (fs, yargs, chalk).
User can create note by given note title and body from command line input using commands written below.
Commands:
   create   create a note. (title, body required)
   read     read a note. (title required)
   list     List of all notes
   updateT  update title in  notes. (title required)
   updateB  update body in notes. (title, body required)
   delete   delete a note. (title required)

Demo: create a note command is ...-> node app.js create --title="titlename" --body="note body"
