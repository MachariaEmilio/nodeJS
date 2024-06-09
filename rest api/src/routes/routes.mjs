import { Router } from "express";

import routes from '../routes/eventroutes.mjs'

const router = Router()

router.use(routes);


export default router