import httpStatus from 'http-status';
import supertest from 'supertest';
import app, { init } from '@/app';
import { cleanDb, generateValidToken } from '../helpers';
import faker from '@faker-js/faker';
import { createUser, 
    createEnrollmentWithAddress,
    createTicketType, 
    createTicket,
    createEditableTicketType,
    createHotel } from '../factories';
import { prisma } from '@/config';

const server = supertest(app);


beforeAll(async () => {
    await init();
  });
  
beforeEach(async () => {
    await cleanDb();
});


describe("GET /hotels",()=>{

    it("deve retornar UNAUTHORIZED quando não é enviado nenhum token",async ()=>{
        const token = faker.lorem.word()
        const res = await server.get("/hotels").set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("deve retornar UNAUTHORIZED quando o token é invalido",async ()=>{
        const token = faker.lorem.word()
        const res = await server.get("/hotels").set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(httpStatus.UNAUTHORIZED)
    })

    it("deve retornar NOT FOUND quando não existe inscrição",async ()=>{
        const token = await generateValidToken()
        const res = await server.get("/hotels").set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(httpStatus.NOT_FOUND)
    })

    it("deve retornar NOT FOUND quando não existe ticket",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createTicketType()

        const res = await server.get("/hotels").set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(httpStatus.NOT_FOUND)
    })

    it("deve retornar NOT FOUND quando não existe hotel",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createEditableTicketType(false,true)
        const ticket = await createTicket(enrollment.id,ticketType.id,"PAID")
        
        const res = await server.get("/hotels").set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(httpStatus.NOT_FOUND)
    })

    it("deve retornar PAYMENT REQUIRED quando status=reserved",async () => {
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createEditableTicketType(false,true)
        const ticket = await createTicket(enrollment.id,ticketType.id,"RESERVED")
        
        const res = await server.get("/hotels").set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(httpStatus.PAYMENT_REQUIRED)
    })

    it("deve retornar PAYMENT REQUIRED quando o evento é remoto",async () => {
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createEditableTicketType(true,false)
        const ticket = await createTicket(enrollment.id,ticketType.id,"PAID")
        
        const res = await server.get("/hotels").set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(httpStatus.PAYMENT_REQUIRED)  
    })

    it("deve retornar PAYMENT REQUIRED quando o evento não inclui hotel",async () => {
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createEditableTicketType(false,false)
        const ticket = await createTicket(enrollment.id,ticketType.id,"PAID")
        
        
        const res = await server.get("/hotels").set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(httpStatus.PAYMENT_REQUIRED)
    })

    it("deve retornar uma lista de hoteis e status OK",async ()=>{
        const user = await createUser()
        const token = await generateValidToken(user)
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createEditableTicketType(false,true)
        await createTicket(enrollment.id,ticketType.id,"PAID")
        await createHotel()
        
        const res = await server.get('/hotels').set('Authorization', `Bearer ${token}`)
        
        expect(res.status).toBe(httpStatus.OK)
        expect(res.body).toHaveLength(1)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    image: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
        })]))
    })

})

describe("GET /hotels/:id",()=>{

})