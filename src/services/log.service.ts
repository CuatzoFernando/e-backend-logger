import { Log } from "../interfaces"
import LogModel from "../models/log"

const insertLog = async (item: Log) => {
	const responseInser = await LogModel.create(item)
	return responseInser
}

const getLogs = async () => {
	const response = await LogModel.find({})
	return response
}

const getLogSingle = async (id: string) => {
	const response = await LogModel.findOne({ _id: id })
	return response
}

const updateLog = async (id: string, data: Log) => {
	const response = await LogModel.findOneAndUpdate({ _id: id }, data, {
		new: true,
	})
	return response
}

const deleteLog = async (id: string) => {
	const response = await LogModel.remove({ _id: id })
	return response
}

export { insertLog, getLogs, getLogSingle, updateLog, deleteLog }
