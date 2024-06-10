import router from "../src/routes/eventroutes.mjs";
import express from "express";

const app = express();

app.use(router);

app.listen(3000 || process.env.PORT, () =>
  console.log("The port is running on port 3000")
);
