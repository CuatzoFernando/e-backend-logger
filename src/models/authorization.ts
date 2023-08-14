import { Schema, Types, model, Model } from "mongoose"
import { Authorization } from "../interfaces"

const AuthorizationSchema = new Schema<Authorization>(
	{
		application_id: {
			type: Schema.Types.ObjectId
		},
		token: {
			type: String,
			required: true
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

const AuthorizationModel = model("authorizations", AuthorizationSchema)
export default AuthorizationModel
