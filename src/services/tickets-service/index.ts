import ticketsRepository from "@/repositories/tickets-repository"

async function getTicketsTypes(){
    const types = await ticketsRepository.getTicketsTypes()
    return types
}

async function getTickets(userId: number) {
    return {}
}   

const ticketsServices = {
    getTicketsTypes,
    getTickets
}

export default ticketsServices