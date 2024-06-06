import express, { json } from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readData = JSON.parse(
  await fs.readFile(path.join(__dirname, "eventsData.json"))
);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(readData);
});

app.get("/events/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserId = readData.findIndexg((user) => {
    return user.id === parsedId;
  });

  if (findUserId === -1) return res.sendStatus(404);
  res.send(readData[findUserId]);
});

app.put("/events/:id", (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const parsedId = parseInt(id);
  const findIndex = readData.findIndex((user) => {
    return user.id === parsedId;
  });
  readData[findIndex] = { id: parsedId, ...body };
  fs.writeFile(
    path.join(__dirname, "eventsData.json"),
    JSON.stringify(readData)
  );

  res.sendStatus(200);
});

app.post("/events", (req, res) => {
  const { body } = req;
  const postData = { id: readData[readData.length - 1].id + 1, ...body };
  readData.push(postData);
  fs.writeFile(
    path.join(__dirname, "eventsData.json"),
    JSON.stringify(readData)
  );
  res.sendStatus(200).send(readData);
});

app.delete("/events/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const deleteUser = readData.findIndex((user) => {
    return user.id === parsedId;
  });
  if (deleteUser === -1) return res.sendStatus(404);

  readData.splice(deleteUser, 1);
  fs.writeFile(
    path.join(__dirname, "eventsData.json"),
    JSON.stringify(readData)
  );
  res.send(`${parsedId} deleted successfully💯💯🤞`);
});

app.listen(3000 || process.env.PORT, () =>
  console.log("The port is running on port 3000")
);
