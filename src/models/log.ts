import { Schema, Types, model, Model, Mongoose } from "mongoose"
import { Log } from "../interfaces"

const LogSchema = new Schema<Log>(
	{
		application_id: {
			type: Schema.Types.ObjectId
		},
		type: {
			type: String,
			default: 'error',
			enum: ['error', 'info', 'warning']
		},
		priority: {
			type: String,
			default: 'lowest',
			enum: ['lowest', 'low', 'medium', 'high', 'highest']
		},
		path: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		request: {
			data: Schema.Types.Mixed,
		},
		response: {
			data: Schema.Types.Mixed,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

const LogModel = model("logs", LogSchema)
export default LogModel
