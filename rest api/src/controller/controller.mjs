import { matchedData, validationResult } from "express-validator";
import { read_data } from "../utils/database/database.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const  get_all_events = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: 
    read_data

  });
};
export const get_event_by_id = (req, res) => {
  const { find_user_id } = req;
  res.send(read_data[find_user_id]);
};
export const create_an_event = (req, res) => {
  const error_results = validationResult(req);
  if (!error_results.isEmpty()) {
    return res.send(error_results);
  } else {
    const data = matchedData(req);

    const postData = {
      id: read_data[read_data.length - 1].id + 1,
      ...data,
    };
    read_data.push(postData);
    fs.writeFile(
      path.join(__dirname, "../utils/database/eventsData.json"),
      JSON.stringify(read_data)
    );

    res.sendStatus(200).send(postData);
  }
};
export const update_event = (req, res) => {
  const { find_user_id, body } = req;
  read_data[find_user_id] = { id: find_user_id, ...body };
  fs.writeFile(
    path.join(__dirname, "../utils/database/eventsData.json"),
    JSON.stringify(read_data)
  );

  res.sendStatus(200);
};
export const delete_event = (req, res) => {
  const {
    find_user_id,
    params: { id },
  } = req;
  read_data.splice(find_user_id, 1);
  fs.writeFile(
    path.join(__dirname, "../utils/database/eventsData.json"),
    JSON.stringify(read_data)
  );
  res.send(`Event ${id} deleted successfully`);
};
