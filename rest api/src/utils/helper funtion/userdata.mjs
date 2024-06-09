import { fileURLToPath } from "node:url";

import path from "node:path";
import fs from "node:fs/promises";
const __dirname= path.dirname(fileURLToPath(import.meta.url))
const readdata = JSON.parse(
    await fs.readFile(path.join(__dirname, "../utils/database/eventsData.json"))
  );
export const userinfo = (req, res, next) => {
    const {
      params: { id },
    } = req;
    const parseid = parseInt(id);
    console.log(parseid);
  
  
    if (isNaN(parseid)) {
      return res.status(400).json({
        error: "Id must be a number!!!",
      });
    }
  
    const finduserid = readdata.findIndex((event) => {
      return event.id === parseid;
    });
  
    if (finduserid === -1) {
      return res.status(404).json({
        error: "Event does not exist",
        info: "learn what error 404 is!!!",
      });
    }
    req.finduserid = finduserid;
  
    next();
  };
  