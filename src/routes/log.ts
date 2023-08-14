import { Request, Response, Router } from "express"
import { checkJwt } from "../middleware/authorization.middleware"

import {
	Logs,
	LogSingle,
	LogInsert,
	LogUpdate,
	LogDelete
} from "../controllers/log.controller"

const router = Router()

router.get("/", [checkJwt], Logs)

router.get(
	"/:id",
	[checkJwt],
	LogSingle
)

router.post("/", [checkJwt], LogInsert)

router.put("/:id", [checkJwt], LogUpdate)

router.delete("/:id", [checkJwt], LogDelete)

export { router }
