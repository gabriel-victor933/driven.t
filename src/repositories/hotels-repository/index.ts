import { prisma } from '@/config';

function getHotels(){
    return prisma.hotel.findMany()
}
export default {
    getHotels
}