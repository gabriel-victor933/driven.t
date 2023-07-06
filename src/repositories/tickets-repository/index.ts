import { prisma } from '@/config';

async function getTicketsTypes(){
    return prisma.ticketType.findMany()
}

const ticketsRepository = {
    getTicketsTypes
}

export default ticketsRepository