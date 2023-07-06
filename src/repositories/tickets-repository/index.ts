import { prisma } from '@/config';

async function getTicketsTypes(){
    return prisma.ticketType.findMany()
}

async function getTickets(userId: number){
    return prisma.ticket.findFirst({
        where: {
            enrollmentId: userId
        },
        include: {
            TicketType: true
        }
    })
}

const ticketsRepository = {
    getTicketsTypes,
    getTickets
}

export default ticketsRepository