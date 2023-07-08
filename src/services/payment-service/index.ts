import { PaymentBody } from "@/protocols";
import ticketsServices from "../tickets-service";
import httpStatus from "http-status";
import paymentRepository from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function postPayment(userId: number, paymentInfo: PaymentBody) {

    await ticketsServices.getTicketById(paymentInfo.ticketId)

    const ticket = await ticketsServices.getTickets(userId)
    if(!ticket) throw {type: "application",error: httpStatus.NOT_FOUND}
    if(ticket.id !== paymentInfo.ticketId) throw {type: "application",error: httpStatus.UNAUTHORIZED}

    await ticketsRepository.paidTicket(paymentInfo.ticketId)
    const payment = await paymentRepository.postPayment(paymentInfo, ticket.TicketType.price)
    
    return payment
}

async function getPayment(userId: number,ticketId: number){

}

const paymentServices = {
    postPayment,
    getPayment
}

export default paymentServices