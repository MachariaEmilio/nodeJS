const filesasync = require("fs").promises;
const path = require("path");

process.on("uncaughtException", (err) => {
  console.log(`this was the uncaught error: ${err} `);
  process.exit(1);
});

const allfiles = async () => {
  try {
     await filesasync
      .writeFile(
        path.join(__dirname, "asyncwritten.txt"),
        "This is written using writefile keyword "
      )
    
       await filesasync.appendFile(path.join(__dirname,"asyncwritten.txt"),"\nThis is git add ended text")

    
   data =  await   filesasync.readFile(path.join(__dirname ,"asyncwritten.txt" ),"utf8")
            console.log(data)
       await filesasync.rename(path.join(__dirname,"asyncwritten.txt"),path.join(__dirname,"newname.txt"))
        
       data1 =  await   filesasync.readFile(path.join(__dirname ,"newname.txt" ),"utf8")
            console.log(data1)
  
  } catch (error) {
    console.log(error);
  }
};
allfiles();
