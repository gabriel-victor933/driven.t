import ticketsRepository from "@/repositories/tickets-repository"

async function getTicketsTypes(){
    const types = await ticketsRepository.getTicketsTypes()
    return types
}

const ticketsServices = {
    getTicketsTypes
}

export default ticketsServices