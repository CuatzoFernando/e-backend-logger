import { Authorization } from "../interfaces"
import AuthorizationModel from "../models/authorization"

const insertAuthorization = async (item: String) => {
	const responseInser = await AuthorizationModel.create({token: item})
	return responseInser
}

const getAuthorizations = async () => {
	const response = await AuthorizationModel.find({})
	return response
}

const getAuthorizationSingle = async (id: string) => {
	const response = await AuthorizationModel.findOne({ _id: id })
	return response
}

const getAuthorizationByToken = async (token: string) => {
	const response = await AuthorizationModel.find({ token: token })
	return response
}

const deleteAuthorization = async (id: string) => {
	const response = await AuthorizationModel.remove({ _id: id })
	return response
}

export { insertAuthorization, getAuthorizations, getAuthorizationByToken, getAuthorizationSingle, deleteAuthorization }
