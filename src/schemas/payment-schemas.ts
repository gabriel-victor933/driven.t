import Joi from "joi";
import { PaymentBody, TicketId } from "@/protocols";

export const paymentSchema = Joi.object<PaymentBody>({
    ticketId: Joi.number().required(),
    cardData: Joi.object({
        issuer: Joi.string().required(),
        number: Joi.number().required(),
        name: Joi.string().required(),
        expirationDate: Joi.string().required(),
        cvv: Joi.number().required()
    }).required(),
})


export const ticketIdSchema = Joi.object<TicketId>({
    ticketId: Joi.number().required()
})