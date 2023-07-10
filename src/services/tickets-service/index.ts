import enrollmentRepository from "@/repositories/enrollment-repository"
import ticketsRepository from "@/repositories/tickets-repository"
import httpStatus from "http-status"

async function getTicketsTypes(){
    const types = await ticketsRepository.getTicketsTypes()
    return types
}

async function getTicketsTypeById(ticketTypeId: number){
    const type = await ticketsRepository.getTicketsTypeById(ticketTypeId)
    return type
}

async function getTickets(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw {type: "application",error: httpStatus.NOT_FOUND,message: "Enrollment not found"}

    const tickets = await ticketsRepository.getTickets(enrollment.id)
    if(!tickets) throw {type: "application",error: httpStatus.NOT_FOUND, message: "user dont have any ticket"}
    
    return tickets
}  

async function getAllTickets(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw {type: "application",error: httpStatus.UNAUTHORIZED, message: "user doesnt own the ticked"}

    const tickets = await ticketsRepository.getTickets(enrollment.id)
    if(!tickets) throw {type: "application",error: httpStatus.UNAUTHORIZED, message: "user doesnt own the ticked"}

    return tickets
}  

async function postTickets(userId: number, ticketTypeId: number) {
    
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw {type: "application",error: httpStatus.NOT_FOUND}

    const type = await getTicketsTypeById(ticketTypeId)
    if(!type) throw {type: "application",error: httpStatus.NOT_FOUND}

    const ticket = await ticketsRepository.postTicket(enrollment.id,ticketTypeId)

    return ticket
} 

async function getTicketById(ticketId: number){
    const ticket = await ticketsRepository.getTicketById(ticketId)
    console.log(ticket)
    if(!ticket) throw {type: "application",error: httpStatus.NOT_FOUND,message: "tticket doenst exist"}

    return ticket
}

const ticketsServices = {
    getTicketsTypes,
    getTickets,
    postTickets,
    getTicketById,
    getAllTickets
}

export default ticketsServices