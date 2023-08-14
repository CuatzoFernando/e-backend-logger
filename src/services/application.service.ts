import { Application } from "../interfaces"
import ApplicationModel from "../models/application"

const insertApplication = async (item: Application) => {
	const responseInser = await ApplicationModel.create({name: item})
	return responseInser
}

const getApplications = async () => {
	const response = await ApplicationModel.find({})
	return response
}

const getApplicationSingle = async (id: string) => {
	const response = await ApplicationModel.findOne({ _id: id })
	return response
}

const updateApplication = async (id: string, data: Application) => {
	const response = await ApplicationModel.findOneAndUpdate({ _id: id }, data, {
		new: true,
	})
	return response
}

const deleteApplication = async (id: string) => {
	const response = await ApplicationModel.remove({ _id: id })
	return response
}

export { insertApplication, getApplications, getApplicationSingle, updateApplication, deleteApplication }
