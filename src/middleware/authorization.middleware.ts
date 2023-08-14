import { NextFunction, Request, Response } from "express"
import { RequestExt } from "../interfaces/req-ext"
import { verifyToken } from "../utils/jwt.handle"

const checkJwt = async (req: RequestExt, res: Response, next: NextFunction) => {
	try {
		const jwtByApp = req.headers.authorization || ""
		const jwt = jwtByApp.split(" ").pop()
		const isToken = jwtByApp && jwt ? await verifyToken(`${jwt}`) : false
		if (!isToken) {
			res.status(401)
			res.send("INVALID_TOKEN")
		} else {
			res.locals.jwtPayload = isToken
			next()
		}
	} catch (e) {
		console.log({ e })
		res.status(400)
		res.send("INVALID_SESSION")
	}
}

export { checkJwt }
