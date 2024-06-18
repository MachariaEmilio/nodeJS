import { Router } from "express";
import {
  get_all_events,
  create_an_event,
  update_event,
  delete_event,
  get_event_by_id,
} from "../controller/controller.mjs";

import { key_schema } from "../utils/schema/schema.mjs";
import { checkSchema } from "express-validator";
import { userinfo } from "../utils/helper function/userdata.mjs";
const router = Router();

router.route("/").get(get_all_events);

router
  .route("/events")
  .post(checkSchema(key_schema), create_an_event);

router
  .route("/events/:id")
  .get(userinfo, get_event_by_id)
  .put(checkSchema(key_schema), userinfo, update_event)
  .delete(userinfo, delete_event);

export default router;
