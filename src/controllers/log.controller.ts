import { Request, response, Response } from "express"
import {
	getLogs,
	getLogSingle,
	updateLog,
	insertLog,
	deleteLog,
} from "../services/log.service"

import { handleHttp } from "../utils/error.handle"
import { validateLog } from "../utils/validation.handle"

const Logs = async (req: Request, res: Response) => {
	try {
		const response = await getLogs()
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEMS")
	}
}

const LogSingle = async ({ params }: Request, res: Response) => {
	try {
		const { id } = params
		const response = await getLogSingle(id)
		const data = response ? response : "NOT_FOUND"
		res.send(data)
	} catch (e) {
		handleHttp(res, "ERROR_GET_ITEM")
	}
}

const LogUpdate = async ({ params, body }: Request, res: Response) => {
	try {
		const { id } = params
		const response = await updateLog(id, body)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_UPDATE_ITEM")
	}
}

const LogInsert = async ({ body }: Request, res: Response) => {
	const newLogData = { ...body }
	try {
		const validateLogInsert = validateLog(newLogData)
		console.log('validate ', validateLogInsert.error)
		if (validateLogInsert.error) {
			res.status(500)
			res.send("(application_id, type, priority, path, message, request, response) is required")
		} else {
			const responseItem = await insertLog(body)
			res.send(responseItem)
		}
	} catch (e) {
		handleHttp(res, "ERROR_POST_ITEM", e)
	}
}

const LogDelete = async ({ params }: Request, res: Response) => {
	try {
		const { id } = params
		const response = await deleteLog(id)
		res.send(response)
	} catch (e) {
		handleHttp(res, "ERROR_DELETE_ITEM")
	}
}

export { Logs, LogSingle, LogInsert, LogUpdate, LogDelete }
