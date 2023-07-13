import httpStatus from "http-status"
import { Errors } from "@/protocols"

export function notFound(message: string | void ): Errors{
    return {
        type: "application",
        statusCode: httpStatus.NOT_FOUND, 
        message: message
    }
}

export function paymentRequired(message: string | void): Errors{
    return {
        type: "application",
        statusCode: httpStatus.PAYMENT_REQUIRED, 
        message: message
    }
}

export function badRequest(message: string | void): Errors{
    return {
        type: "application",
        statusCode: httpStatus.BAD_REQUEST, 
        message: message
    }
}