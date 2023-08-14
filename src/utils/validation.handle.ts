import Joi from 'joi'
import { Application, Authorization, Log } from '../interfaces'

const ObjectId = require('mongoose').Types.ObjectId;

export const validateID = (uuid: String) => {
    if (ObjectId.isValid(uuid)) {
        if ((String)(new ObjectId(uuid)) === uuid) return true;
        return false;
    }
    return false;
}

export const validateAuthorization = (token: Authorization) => {
    const authorizationSchema = Joi.object<Authorization>({
        application_id: Joi.string().guid().required(),
        token: Joi.string().regex(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/gm).required()
    })

    return authorizationSchema.validate(token)
}

export const validateTextAuthorization = (text: String) => {
    const authorizationSchema = Joi.object({
        text: Joi.string().min(3).max(30).required()
    })
    return authorizationSchema.validate(text)
}



export const validateApplication = (name: Application) => {
    const applicationSchema = Joi.object<Application>({
        name: Joi.string().min(5).max(30).required()
    })
    return applicationSchema.validate(name)
}

export const validateLog = (log: Log) => {
    const logSchema = Joi.object<Log>({
        application_id: Joi.string().required(),
        type: Joi.string().valid('error', 'info', 'warning').required(),
        priority: Joi.string().valid('high', 'medium', 'low').required(),
        path: Joi.string().required(),
        message: Joi.string().required(),
        request: Joi.object().required(),
        response: Joi.object().required(),
    })

    return logSchema.validate(log)
}