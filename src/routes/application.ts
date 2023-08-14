import { Request, Response, Router } from "express"
import { checkJwt } from "../middleware/authorization.middleware"

import {
	Applications,
	ApplicationSingle,
	ApplicationInsert,
	ApplicationUpdate,
	ApplicationDelete
} from "../controllers/application.controller"

const router = Router()

router.get("/", [checkJwt], Applications)

router.get(
	"/:id",
	[checkJwt],
	ApplicationSingle
)

router.post("/", [checkJwt], ApplicationInsert)

router.put("/:id", [checkJwt], ApplicationUpdate)

router.delete("/:id", [checkJwt], ApplicationDelete)

export { router }
