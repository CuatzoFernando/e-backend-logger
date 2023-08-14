import { Schema, Types, model, Model } from "mongoose"
import { Application } from "../interfaces"

const ApplicationSchema = new Schema<Application>(
	{
		name: {
			required: true,
			type: String,
		}
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

const ApplicationModel = model("applications", ApplicationSchema)
export default ApplicationModel
