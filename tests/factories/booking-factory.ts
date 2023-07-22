import { prisma } from "@/config";
import faker from "@faker-js/faker";

export function createBooking(userId: number, roomId:number){
    return prisma.booking.create({
        data:{userId,roomId}
    })
}

export function createRoomBookingData(){
    const  roomID = parseInt(faker.random.numeric(4))
    return {
        id: roomID,
        name: '1020',
        capacity: 1,
        hotelId: parseInt(faker.random.numeric(4)),
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime(),
        Booking: [
            {
                id: parseInt(faker.random.numeric(4)),
                userId: parseInt(faker.random.numeric(4)),
                roomId: roomID,
                createdAt: faker.datatype.datetime(),
                updatedAt: faker.datatype.datetime()
            }
        ]

    }
}