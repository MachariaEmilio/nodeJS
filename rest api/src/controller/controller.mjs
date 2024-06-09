import { matchedData,validationResult } from 'express-validator';
import { fileURLToPath } from "node:url";

import path from "node:path";
import fs from "node:fs/promises";
const __dirname= path.dirname(fileURLToPath(import.meta.url))
const readdata = JSON.parse(
    await fs.readFile(path.join(__dirname, "../utils/database/eventsData.json"))
  );
  
export const getallevents=(req,res)=>
    {
        res.status(200).json({
            status: 'success',
            data:res.send(readdata)
        })
    }
export const geteventbyid=()=>{
    const { finduserid } = req;
    res.send(readdata[finduserid]);
}
export const createanevent=()=>{
   
  const error_results = validationResult(req);
  if (!error_results.isEmpty()) {
    return res.send(error_results);
  } else {
    const data = matchedData(req);

    const postData = {
      id: readdata[readdata.length - 1].id + 1,
      ...data,
    };
    readdata.push(postData);
    fs.writeFile(
      path.join(__dirname, "eventsData.json"),
      JSON.stringify(readdata)
    );

    res.sendStatus(200).send(readdata);
  } 
}
export const updateevent=()=>{
    const { finduserid, body } = req;
    readdata[finduserid] = { id: finduserid, ...body };
    fs.writeFile(
      path.join(__dirname, "eventsData.json"),
      JSON.stringify(readdata)
    );
  
    res.sendStatus(200);
}
export const deletevent =()=>{
    const {
        finduserid,
        params: { id },
      } = req;
      readdata.splice(finduserid, 1);
      fs.writeFile(
        path.join(__dirname, "eventsData.json"),
        JSON.stringify(readdata)
      );
      res.send(`Event ${id} deleted successfully`);
}