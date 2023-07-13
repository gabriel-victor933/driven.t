import enrollmentsService from "@/repositories/enrollment-repository"
import { notFound,paymentRequired } from "@/errors"
import ticketsRepository from "@/repositories/tickets-repository"
import hotelsRepository from "@/repositories/hotels-repository"

async function getHotels(userId: number){
    await checkPaidTicket(userId)
    const hotels = await hotelsRepository.getHotels()
    if(hotels.length === 0) throw notFound("Hotel not found")

    return hotels
}

async function getHotelRooms(userId: number, hotelId: number){
    await checkPaidTicket(userId)
    const hotel = await hotelsRepository.getHotelRooms(hotelId)
    if(!hotel) throw notFound("Hotel not found")

    return hotel
}

async function checkPaidTicket(userId: number){
    const enrollment = await enrollmentsService.findWithAddressByUserId(userId)
    if(!enrollment) throw notFound("Enrollment not found")

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) throw notFound("Ticket not found")
    if(ticket.status !== "PAID"||ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw paymentRequired()
}

const hotelsServices = {
    getHotels,
    getHotelRooms
}

export default hotelsServices