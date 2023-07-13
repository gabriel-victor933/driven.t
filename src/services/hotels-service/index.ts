import enrollmentsService from "@/repositories/enrollment-repository"
import httpStatus from "http-status"

async function getHotels(userId: number){
    await checkPaidTicket(userId)
}

async function getHotelRooms(userId: number){

}

async function checkPaidTicket(userId: number){
    //find enrollmentId (T: enrollment), if doenst exist return 404 
    const enrollment = await enrollmentsService.findWithAddressByUserId(1)
    if(!enrollment) throw {type: "application",statusCode: httpStatus.NOT_FOUND, message: "Enrollment not found" }
    //find ticketId (T: Ticket) using enrollment Id, if doesnt exist return 404

    //check if ticket is paid, check if includes hotel, check if it's not remote, if not return 402 
}

const hotelsServices = {
    getHotels,
    getHotelRooms
}

export default hotelsServices