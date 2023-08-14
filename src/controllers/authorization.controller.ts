import { Request, response, Response } from "express"
import {
	getAuthorizations,
	getAuthorizationSingle,
	insertAuthorization,
	deleteAuthorization,
} from "../services/authorization.service"

import { validateTextAuthorization, validateID } from "../utils/validation.handle"

import { handleHttp } from "../utils/error.handle"
import { generateToken } from "../utils/jwt.handle"

const Authorizations = async (req: Request, res: Response) => {
	try {
		const response = await getAuthorizations()
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const AuthorizationSingle = async ({ params }: Request, res: Response) => {
	try {
		const { id } = params
		const validateId = validateID(id)
		if (!validateId) {
			res.status(500)
			res.send("(id) is required")
		} else {
			const response = await getAuthorizationSingle(id)
			const data = response ? response : "NOT_FOUND"
			res.send(data)
		}
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEM")
	}
}

const AuthorizationInsert = async ({ body }: Request, res: Response) => {
	const { text } = body
	try {
		const validateText = validateTextAuthorization(text)
		if (validateText.error) {
			res.status(500)
			res.send("(text) is required")
		} else {
			const token = await generateToken(text)
			const responseItem = await insertAuthorization(token)
			res.send(responseItem)
		}
	} catch (e) {
		handleHttp(res, "ERROR_POST_ITEM", e)
	}
}

const AuthorizationDelete = async ({ params }: Request, res: Response) => {
	try {
		const { id } = params
		const validateId = validateID(id)
		if (!validateId) {
			res.status(500)
			res.send("(id) is required")
		} else {
			const response = await deleteAuthorization(id)
		res.send(response)
		}
	} catch (e) {
		handleHttp(res, "ERROR_DELETE_ITEM")
	}
}

export { Authorizations, AuthorizationSingle, AuthorizationInsert, AuthorizationDelete }
