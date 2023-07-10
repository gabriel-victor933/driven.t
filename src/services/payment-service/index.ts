import { PaymentBody } from "@/protocols";
import ticketsServices from "../tickets-service";
import httpStatus from "http-status";
import paymentRepository from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/tickets-repository";


async function postPayment(userId: number, paymentInfo: PaymentBody) {

    const price = await verifyTicket(userId,paymentInfo.ticketId)

    await ticketsRepository.paidTicket(paymentInfo.ticketId)
    
    const payment = await paymentRepository.postPayment(paymentInfo, price)
    return payment
}

async function getPayment(userId: number,ticketId: number){
    await verifyTicket(userId,ticketId)

    const payment = await paymentRepository.getPayment(ticketId)
    if(!payment) throw {type: "application",error: httpStatus.NOT_FOUND,message: "Payment not found"}
    return payment 

}

async function verifyTicket(userId: number, ticketId: number){
    await ticketsServices.getTicketById(ticketId)
    
    const ticket = await ticketsServices.getAllTickets(userId)
    
    if(ticket.id !== ticketId) throw {type: "application",error: httpStatus.UNAUTHORIZED, message: "user doesnt own the ticked"}

    return ticket.TicketType.price
}

const paymentServices = {
    postPayment,
    getPayment
}

export default paymentServices