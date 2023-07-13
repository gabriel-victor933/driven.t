import { prisma } from '@/config';

function getHotels(){
    return prisma.hotel.findMany()
}

function getHotelRooms(hotelId: number){
    return prisma.hotel.findFirst({
        where: {id: hotelId},
        include: {Rooms: true}
    })
}

export default {
    getHotels,
    getHotelRooms
}