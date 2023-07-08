import Joi from "joi";
import { PaymentBody } from "@/protocols";

export const paymentSchema = Joi.object<PaymentBody>({
    ticketId: Joi.number().required(),
    cardData: Joi.object({
        issuer: Joi.string().required(),
        number: Joi.number().required(),
        name: Joi.string().required(),
        expirationData: Joi.date().iso().required(),
        cvv: Joi.number().required()
    }).required(),
})