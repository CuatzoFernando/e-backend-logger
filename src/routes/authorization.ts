import { Request, Response, Router } from "express"
import { checkJwt } from "../middleware/authorization.middleware"

import {
	Authorizations,
	AuthorizationSingle,
	AuthorizationInsert,
	AuthorizationDelete
} from "../controllers/authorization.controller"

const router = Router()

router.get("/", [checkJwt], Authorizations)

router.get(
	"/:id",
	[checkJwt],
	AuthorizationSingle
)

router.post("/", AuthorizationInsert)

router.delete("/:id", [checkJwt], AuthorizationDelete)

export { router }
