const{ v4 :uuidv4 }= require("uuid")
const {format}= require("date-fns")
const path =require("path")
const fs=require("fs")
const { log } = require("console")
const fspromise =require("fs").promises



async function logevents(){
    const uuid=uuidv4()
    const datetime=format(new Date(),'yyyy-MM-dd\tHH:mm:ss') 
    const message="this is the logitems"
    
   const logitems ={newuuid:uuid,date:datetime,message:message}
      console.log(logitems)
      
if (!fs.existsSync(path.join(__dirname,"logs"))) {
    console.log("exist");
  fspromise.mkdir(path.join(__dirname,"logs"))
  
  
  } else {
    console.log("existing");
  }
  
  if (fs.existsSync(path.join(__dirname,"logs"))) {
      fs.appendFile(path.join(__dirname,"logs","eventlogs.txt"),JSON.stringify(logitems), function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
        


  }
}
logevents()

module.exports={logevents}

