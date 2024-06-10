import { matchedData, validationResult } from "express-validator";
import { readdata } from "../utils/database/database.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getallevents = (req, res) => {
  res.status(200).json({
    status: "success",
    data: res.send(readdata),
  });
};
export const geteventbyid = (req, res) => {
  const { finduserid } = req;
  res.send(readdata[finduserid]);
};
export const createanevent = (req, res) => {
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
      path.join(__dirname, "../utils/database/eventsData.json"),
      JSON.stringify(readdata)
    );

    res.sendStatus(200).send(postData);
  }
};
export const updateevent = (req, res) => {
  const { finduserid, body } = req;
  readdata[finduserid] = { id: finduserid, ...body };
  fs.writeFile(
    path.join(__dirname, "../utils/database/eventsData.json"),
    JSON.stringify(readdata)
  );

  res.sendStatus(200);
};
export const deletevent = (req, res) => {
  const {
    finduserid,
    params: { id },
  } = req;
  readdata.splice(finduserid, 1);
  fs.writeFile(
    path.join(__dirname, "../utils/database/eventsData.json"),
    JSON.stringify(readdata)
  );
  res.send(`Event ${id} deleted successfully`);
};
