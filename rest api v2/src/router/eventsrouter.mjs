import { Router } from "express";
import express from "express";


import { key_schema } from "../utils/schema/schema.mjs";
import { checkSchema } from "express-validator";

import {
  getallevents,
  create_an_event,
  getbyid,
  deletebyid,
  updateevent,
} from "../controller/controler.mjs";

const router = Router();

router.use(express.json());
router.route("/").get(getallevents).post( checkSchema(key_schema) ,create_an_event);

router.route("/events/:id").get(getbyid).delete(deletebyid).put(updateevent);

export default router;
