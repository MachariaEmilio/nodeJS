import express from "express"
import router from "./src/router/eventsrouter.mjs"

const app =express()

app.use(router)

app.listen(process.env.port||3000,()=>
console.log(`port running on 3000`))