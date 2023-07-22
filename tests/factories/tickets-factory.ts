import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

export async function createTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: faker.datatype.boolean(),
      includesHotel: faker.datatype.boolean(),
    },
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}

export async function createTicketTypeRemote() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: true,
      includesHotel: faker.datatype.boolean(),
    },
  });
}

export async function createTicketTypeWithHotel() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: false,
      includesHotel: true,
    },
  });
}

export function createTicketData(status: 'PAID' | 'RESERVED', isRemote: boolean, includesHotel: boolean){
  const ticketTypeID = parseInt(faker.random.numeric(4))
  return  {
    id: parseInt(faker.random.numeric(4)),
    ticketTypeId: ticketTypeID,
    enrollmentId: parseInt(faker.random.numeric(4)),
    status: status,
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    TicketType: {
      id: ticketTypeID,
      name: faker.name.firstName(),
      price: parseInt(faker.random.numeric(4)),
      isRemote: isRemote,
      includesHotel: includesHotel,
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime()
    }
  }
}
