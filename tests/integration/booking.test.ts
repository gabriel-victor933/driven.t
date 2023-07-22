import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser, createHotel, createRoomWithHotelId, createBooking } from '../factories';

beforeAll(async () => {
    await init();
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
  
