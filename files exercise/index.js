const EventEmitter = require("events");
// const logevents = require("./Logevents");
const{logger}=require("./logevents")
const eventLogger = new EventEmitter();
 
eventLogger.on("log", (message) => logger.logevents(message))
 
setTimeout(() => eventLogger.emit("log", "new event id and "), 2000)

// logevents.logevents("mine")