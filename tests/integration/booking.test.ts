import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser, 
    createHotel, 
    createRoomWithHotelId, 
    createBooking,
    createTicketTypeWithHotel,
    createEnrollmentWithAddress,
    createTicket } from '../factories';

beforeAll(async () => {
    await init();
    await cleanDb();
});

beforeEach(async () => {
    await cleanDb();
  });

const server = supertest(app)

describe("GET /booking",()=>{
    it("should return UNAUTHORIZED if no token is given",async ()=>{
        const res = await server.get("/booking")
        expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("should return UNAUTHORIZED if token is invalid",async ()=>{
        const res = await server.get("/booking").set('Authorization', `Bearer ${faker.lorem.word()}`)
        expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("should return NOT FOUND if user has no booking",async ()=>{
        const token = await generateValidToken()

        const res = await server.get("/booking").set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(httpStatus.NOT_FOUND)
    })

    it("Should return OK with booking data",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const hotel = await createHotel()
        const room = await createRoomWithHotelId(hotel.id)

        const booking = await createBooking(user.id,room.id)

        const res = await server.get("/booking").set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(httpStatus.OK)
        expect(res.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            Room: expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                capacity: expect.any(Number)
            })
        }))
        
    })
})
  
describe("POST /booking",()=>{
    it("should return UNAUTHORIZED if no token is given",async ()=>{
        const res = await server.post("/booking")
        expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("should return UNAUTHORIZED if token is invalid",async ()=>{
        const res = await server.post("/booking").set('Authorization', `Bearer ${faker.lorem.word()}`)
        expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("should return BAD REQUEST if body is invalid or missing", async ()=>{
        const token = await generateValidToken()
        const res = await server.post("/booking")
                                .set('Authorization', `Bearer ${token}`)
                                .send({roomId: "as"})

        expect(res.status).toBe(httpStatus.BAD_REQUEST)
    })

    it("should return NOT FOUND if room doesnt exist",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id, ticketType.id, 'PAID')

        const res = await server.post("/booking")
                                .set('Authorization', `Bearer ${token}`)
                                .send({roomId: 1})
        expect(res.status).toBe(httpStatus.NOT_FOUND)
    })

    it("should return FORBIDDEN if room is already full",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id, ticketType.id, 'PAID')
        const hotel = await createHotel()
        const room = await createRoomWithHotelId(hotel.id)

        const user2 = await createUser()
        await createBooking(user2.id,room.id)

        const res = await server.post("/booking")
                                .set('Authorization', `Bearer ${token}`)
                                .send({roomId: room.id})
        expect(res.status).toBe(httpStatus.FORBIDDEN)
    })

    it("should return OK with booking ID",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id, ticketType.id, 'PAID')
        const hotel = await createHotel()
        const room = await createRoomWithHotelId(hotel.id)

        const user2 = await createUser()

        const res = await server.post("/booking")
                                .set('Authorization', `Bearer ${token}`)
                                .send({roomId: room.id})
        expect(res.status).toBe(httpStatus.OK)
        expect(res.body).toEqual(expect.objectContaining({
            bookingId: expect.any(Number)
        }))
    })
})

describe("PUT /booking/:bookingId",()=>{
    it("should return UNAUTHORIZED if no token is given",async ()=>{
        const res = await server.put("/booking/12")
        expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("should return UNAUTHORIZED if token is invalid",async ()=>{
        const res = await server.put("/booking/12").set('Authorization', `Bearer ${faker.lorem.word()}`)
        expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("should return BAD REQUEST if body is invalid or missing", async ()=>{
        const token = await generateValidToken()
        const res = await server.put("/booking/12")
                                .set('Authorization', `Bearer ${token}`)
                                .send({roomId: "as"})

        expect(res.status).toBe(httpStatus.BAD_REQUEST)
    })

    it("should return BAD REQUEST if bookingId is not a number", async ()=>{
        const token = await generateValidToken()
        const res = await server.put("/booking/as")
                                .set('Authorization', `Bearer ${token}`)
                                .send({roomId: 1})

        expect(res.status).toBe(httpStatus.BAD_REQUEST)
    })

    it("should return NOT FOUND if room doesnt exist",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id, ticketType.id, 'PAID')
        const hotel = await createHotel()
        const room = await createRoomWithHotelId(hotel.id)
        const booking = await createBooking(user.id,room.id)

        const res = await server.put(`/booking/${booking.id}`)
                                .set('Authorization', `Bearer ${token}`)
                                .send({roomId: room.id + 5})
        expect(res.status).toBe(httpStatus.NOT_FOUND)
        
    })

    it("should return FORBIDDEN if room is already full",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id, ticketType.id, 'PAID')
        const hotel = await createHotel()
        const room = await createRoomWithHotelId(hotel.id)
        const room2 = await createRoomWithHotelId(hotel.id)
        const booking = await createBooking(user.id,room2.id)

        const user2 = await createUser()
        await createBooking(user2.id,room.id)

        const res = await server.put(`/booking/${booking.id}`)
                                .set('Authorization', `Bearer ${token}`)
                                .send({roomId: room.id})
        expect(res.status).toBe(httpStatus.FORBIDDEN)
        
    })

    it("should return OK with booking ID",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createTicketTypeWithHotel()
        const ticket = await createTicket(enrollment.id, ticketType.id, 'PAID')
        const hotel = await createHotel()
        const room = await createRoomWithHotelId(hotel.id)
        const room2 = await createRoomWithHotelId(hotel.id)
        const booking = await createBooking(user.id,room.id)
        

        const res = await server.put(`/booking/${booking.id}`)
                                .set('Authorization', `Bearer ${token}`)
                                .send({roomId: room2.id})
        expect(res.status).toBe(httpStatus.OK)
        expect(res.body).toEqual(expect.objectContaining({
            bookingId: expect.any(Number)
        }))
    })


})