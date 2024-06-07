import { Router } from "express";
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { key_schema } from "../utils/schema/schema.mjs";
const route = Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readdata = JSON.parse(
  await fs.readFile(path.join(__dirname, "../eventsData.json"))
);


const userinfo = (req, res, next) => {
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


route.use(express.json());

route.get("/", (req, res) => {
  res.send(readdata);
});

route.get("/events/:id", userinfo, (req, res) => {
  const { finduserid } = req;
  res.send(readdata[finduserid]);
});

route.put("/events/:id", userinfo, (req, res) => {
  const { finduserid, body } = req;
  readdata[finduserid] = { id: finduserid, ...body };
  fs.writeFile(
    path.join(__dirname, "eventsData.json"),
    JSON.stringify(readdata)
  );

  res.sendStatus(200);
});

route.post("/events", checkSchema(key_schema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors);
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
});

route.delete("/events/:id", userinfo, (req, res) => {
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
});


export default route