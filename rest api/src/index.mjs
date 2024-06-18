import router from "../src/routes/eventroutes.mjs";
import express from "express";

const app = express();

app.use(router);

app.listen(process.env.PORT || 3000, () =>
  console.log("The port is running on port 3000")
);
