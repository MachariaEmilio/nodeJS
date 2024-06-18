import { Router } from "express";
import express from "express";
import { event_info } from "../helper function/event.mjs";

import { key_schema } from "../schema/schema.mjs";
import { checkSchema } from "express-validator";

import {
  get_all_events,
  create_an_event,
  get_by_id,
  delete_by_id,
  update_event,
} from "../controller/controler.mjs";

const router = Router();

router.use(express.json());
router
  .route("/")
  .get(get_all_events)
  .post(checkSchema(key_schema), create_an_event);

router
  .route("/events/:id")
  .get(event_info, get_by_id)
  .delete(event_info,delete_by_id)
  .put(event_info,update_event);

export default router;
