import { Request, response, Response } from "express"
import {
	getApplications,
	getApplicationSingle,
	insertApplication,
	deleteApplication,
	updateApplication,
} from "../services/application.service"

import { handleHttp } from "../utils/error.handle"
import { validateApplication, validateID } from "../utils/validation.handle"

const Applications = async (req: Request, res: Response) => {
	try {
		const response = await getApplications()
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const ApplicationSingle = async ({ params }: Request, res: Response) => {
	try {
		const { id } = params
		const validateId = validateID(id)
		if (!validateId) {
			res.status(500)
			res.send("(id) is required")
		} else {
			const response = await getApplicationSingle(id)
			const data = response ? response : "NOT_FOUND"
			res.send(data)
		}
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEM")
	}
}

const ApplicationInsert = async ({ body }: Request, res: Response) => {
	const { name } = body
	const nameToValidate = { name: name }
	try {
		const validateText = validateApplication(nameToValidate)
		if (validateText.error) {
			res.status(500)
			res.send("(name) is required")
		} else {
			const responseItem = await insertApplication(name)
			res.send(responseItem)
		}
	} catch (e) {
		handleHttp(res, "ERROR_POST_ITEM", e)
	}
}

const ApplicationUpdate = async ({ params, body }: Request, res: Response) => {
	try {
		const { id } = params
		const validateId = validateID(id)
		if (!validateId) {
			res.status(500)
			res.send("(id) is required")
		} else {
			const response = await updateApplication(id, body)
			res.send(response)
		}
	} catch (e) {
		handleHttp(res, "ERROR_UPDATE_ITEM")
	}
}

const ApplicationDelete = async ({ params }: Request, res: Response) => {
	try {
		const { id } = params
		const validateId = validateID(id)
		if (!validateId) {
			res.status(500)
			res.send("(id) is required")
		} else {
			const response = await deleteApplication(id)
			res.send(response)
		}
	} catch (e) {
		handleHttp(res, "ERROR_DELETE_ITEM")
	}
}

export { Applications, ApplicationSingle, ApplicationInsert, ApplicationUpdate, ApplicationDelete }
