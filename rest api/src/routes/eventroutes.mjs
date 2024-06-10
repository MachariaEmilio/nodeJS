import express from "express";
import {
  getallevents,
  createanevent,
  updateevent,
  deletevent,
  geteventbyid,
} from "../controller/controller.mjs";

import { key_schema } from "../utils/schema/schema.mjs";
import { checkSchema } from "express-validator";
import { userinfo } from "../utils/helper funtion/userdata.mjs";
const router = express.Router();

router
  .route("/events")
  .get(getallevents)
  .post(checkSchema(key_schema), createanevent);

router
  .route("/events/:id")
  .get(userinfo, geteventbyid)
  .put(checkSchema(key_schema), userinfo, updateevent)
  .delete(userinfo, deletevent);

export default router;
