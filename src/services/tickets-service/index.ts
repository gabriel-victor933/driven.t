import ticketsRepository from "@/repositories/tickets-repository"
import httpStatus from "http-status"

async function getTicketsTypes(){
    const types = await ticketsRepository.getTicketsTypes()
    return types
}

async function getTickets(userId: number) {
    const tickets = await ticketsRepository.getTickets(userId)
    console.log(tickets)
    if(!tickets) throw {type: "application",error: httpStatus.NOT_FOUND}

    return tickets
}   

const ticketsServices = {
    getTicketsTypes,
    getTickets
}

export default ticketsServices