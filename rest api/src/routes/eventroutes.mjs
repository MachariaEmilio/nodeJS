import express from "express"
import { getallevents,createanevent ,updateevent,deletevent,geteventbyid} from "../controller/controller.mjs"

import {key_schema}from "../utils/schema/schema.mjs"
import {checkSchema} from "express-validator"
const router = express.Router()

router.route('/')
.get(getallevents)
.post(checkSchema(key_schema),createanevent)

router.route('/events/:id')
.get(geteventbyid)
.put(checkSchema(key_schema),updateevent)
.delete(deletevent)

export default router