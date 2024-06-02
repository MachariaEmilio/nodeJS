const path =require("path")
const files = require("fs");

process.on("uncaughtException", (err) => {
  console.log(`there was uncaught error: ${err}`);
  process.exit(1);
});

files.writeFile("new.txt", "i am written 😂😂😂", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("done writing ");
});
files.appendFile(
  "new.txt",
  "\n i have appended this 😂😂😂",
  (err, data) => {
    if (err) {
      throw err;
    }
    console.log("done appending ");
  }
);

files.readFile("new.txt", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(`this is what has been found \n ${data}`);
});
files.readFile(path.join(__dirname ,"new.txt") ,"utf8",(err,data)=>
{
    if(err){
        throw err
    }
    console.log(data)
})
