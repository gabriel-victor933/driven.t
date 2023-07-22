import { prisma } from "@/config"

function getRoomById(roomId: number){
    return prisma.room.findUnique({where: {id: roomId}})
}

const bookingRepository = {
    getRoomById
}

export default bookingRepository