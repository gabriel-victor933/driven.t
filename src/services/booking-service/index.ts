import enrollmentRepository from "@/repositories/enrollment-repository"
import { forbiddenError, notFound } from "@/errors"

async function postBooking(userId: number){

}

async function validateUser(userId: number){
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)

    
}

const bookingService = {
    postBooking
}

export default bookingService