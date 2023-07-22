import {jest} from '@jest/globals';
import bookingRepository from "@/repositories/booking-repository"
import enrollmentRepository from "@/repositories/enrollment-repository"
import ticketsRepository from '@/repositories/tickets-repository';
import bookingService from "@/services/booking-service"
import { forbiddenError } from "@/errors"
import { createEnrollmentData, createTicketData,createRoomBookingData } from "../factories"
import faker from "@faker-js/faker"

describe("Post /booking",()=>{


    it("should throw FORBIDDEN if user has no enrollment",async ()=>{

        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValueOnce(null)

        expect(bookingService.postBooking(1,1)).rejects.toEqual(forbiddenError("User has no enrollment"))
    })

    it("should throw FORBIDDEN if user has no ticket",async ()=>{

        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValue(createEnrollmentData())
        jest.spyOn(ticketsRepository,"findTicketByEnrollmentId").mockResolvedValueOnce(null)

        expect(bookingService.postBooking(1,1)).rejects.toEqual(forbiddenError("User has no ticket"))
    })

    it("should throw FORBIDDEN if ticket is not paid",async ()=>{

        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValue(createEnrollmentData())
        jest.spyOn(ticketsRepository,"findTicketByEnrollmentId")
            .mockResolvedValueOnce(createTicketData("RESERVED",false,true))

        expect(bookingService.postBooking(1,1)).rejects.toEqual(forbiddenError())
    })

    it("should throw FORBIDDEN if ticket is remote",async ()=>{

        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValue(createEnrollmentData())
        jest.spyOn(ticketsRepository,"findTicketByEnrollmentId")
            .mockResolvedValueOnce(createTicketData("PAID",true,false))

        expect(bookingService.postBooking(1,1)).rejects.toEqual(forbiddenError())
    })

    it("should throw FORBIDDEN if ticket is dont include hotel",async ()=>{

        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValue(createEnrollmentData())
        jest.spyOn(ticketsRepository,"findTicketByEnrollmentId")
            .mockResolvedValueOnce(createTicketData("PAID",false,false))

        expect(bookingService.postBooking(1,1)).rejects.toEqual(forbiddenError())
    })

    it("should throw FORBIDDEN IF room has already reached maximum capacity",async ()=>{
        jest.spyOn(enrollmentRepository,"findWithAddressByUserId").mockResolvedValue(createEnrollmentData())
        jest.spyOn(ticketsRepository,"findTicketByEnrollmentId")
            .mockResolvedValueOnce(createTicketData("PAID",false,true))

        jest.spyOn(bookingRepository,"getRoomById").mockResolvedValue(createRoomBookingData())

        expect(bookingService.postBooking(1,1)).rejects.toEqual(forbiddenError("Room has already reached maximum capacity"))
    }) 
})
