import { prisma } from '@/config';

async function getTicketsTypes(){
    return prisma.ticketType.findMany()
}

async function getTicketsTypeById(ticketTypeId: number){
    return prisma.ticketType.findUnique({
        where: {id: ticketTypeId}
    })
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

async function postTicket(enrollmentId: number,ticketTypeId: number) {
    return prisma.ticket.create({
        data: {
            status: "RESERVED",
            ticketTypeId,
            enrollmentId,
        },
        include: {
            TicketType: true
        }
    })
}
async function getTicketById(ticketId: number){
    return prisma.ticket.findUnique({
        where: {id: ticketId}
    })
}

async function paidTicket(ticketId: number){
    return prisma.ticket.update({
        where: {id: ticketId},
        data: {
            status: "PAID"
        }
    })
}

const ticketsRepository = {
    getTicketsTypes,
    getTickets,
    getTicketsTypeById,
    postTicket,
    getTicketById,
    paidTicket
}

export default ticketsRepository