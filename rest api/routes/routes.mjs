import { Router } from "express";
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { valid_schema } from "../utils/schema/schema.mjs";

const route = Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const events_data = JSON.parse(
  await fs.readFile(path.join(__dirname, "../src","eventsData.json"))
);


const findUser = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const id_num = parseInt(id);
  console.log(id_num);


  if (isNaN(id_num)) {
    return res.status(400).json({
      error: "Id must be a number!!!",
    });
  }

  const get_index = events_data.findIndex((event) => {
    return event.id === id_num;
  });

  if (get_index === -1) {
    return res.status(404).json({
      error: "Event does not exist",
      info: "learn what error 404 is!!!",
    });
  }
  req.get_index = get_index;

  next();
};


route.use(express.json());

route.get("/", (req, res) => {
  res.send(events_data);
});

route.get("/events/:id", findUser, (req, res) => {
  const { get_index } = req;
  res.send(events_data[get_index]);
});

route.put("/events/:id", findUser, (req, res) => {
  const { get_index, body } = req;
  events_data[get_index] = { id: get_index, ...body };
  fs.writeFile(
    path.join(__dirname, "eventsData.json"),
    JSON.stringify(events_data)
  );

  res.sendStatus(200);
});

route.post("/events", checkSchema(valid_schema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors);
  } else {
    const data = matchedData(req);

    const postData = {
      id: events_data[events_data.length - 1].id + 1,
      ...data,
    };
    events_data.push(postData);
    fs.writeFile(
      path.join(__dirname, "eventsData.json"),
      JSON.stringify(events_data)
    );

    res.sendStatus(200).send(events_data);
  }
});

route.delete("/events/:id", findUser, (req, res) => {
  const {
    get_index,
    params: { id },
  } = req;
  events_data.splice(get_index, 1);
  fs.writeFile(
    path.join(__dirname, "eventsData.json"),
    JSON.stringify(events_data)
  );
  res.send(`Event ${id} deleted successfully`);
});


export default route