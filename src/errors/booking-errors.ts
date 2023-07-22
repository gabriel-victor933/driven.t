import httpStatus from "http-status";
import { bookingError } from "@/protocols";

export function forbiddenError(message: string | void):bookingError {
    return {
        message,
        status: httpStatus.FORBIDDEN,
        type: 'application'
    }
}

export function notFound(message: string | void):bookingError {
    return {
        message,
        status: httpStatus.NOT_FOUND,
        type: 'application'
    }
}