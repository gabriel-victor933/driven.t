import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createHotel(){
    return prisma.hotel.create({
        data: {
            name: faker.company.bsNoun(),
            image: faker.image.avatar(), 
        }
    })
}

export async function createRoom(hotelId: number){
    return prisma.room.create({
        data: {
            name: faker.name.firstName(),
            hotelId: hotelId,
            capacity: parseInt(faker.finance.amount(1,10,0)),
        }
    })
}