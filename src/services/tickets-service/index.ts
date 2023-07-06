import enrollmentRepository from "@/repositories/enrollment-repository"
import ticketsRepository from "@/repositories/tickets-repository"
import httpStatus from "http-status"

async function getTicketsTypes(){
    const types = await ticketsRepository.getTicketsTypes()
    return types
}

async function getTickets(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw {type: "application",error: httpStatus.NOT_FOUND}

    const tickets = await ticketsRepository.getTickets(enrollment.id)
    if(!tickets) throw {type: "application",error: httpStatus.NOT_FOUND}

    return tickets
}   

const ticketsServices = {
    getTicketsTypes,
    getTickets
}

export default ticketsServices