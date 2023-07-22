import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  const hashedPassword = await bcrypt.hash(faker.internet.password(6), 10);
  const user = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: hashedPassword,
    },
  });

  const enrollment = await prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: faker.random.numeric(11),
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber('(##) 9####-####'),
      userId: user.id,
      Address: {
        create: {
          street: faker.address.streetName(),
          cep: faker.address.zipCode(),
          city: faker.address.city(),
          neighborhood: faker.address.city(),
          number: faker.datatype.number().toString(),
          state: "SP",
        },
      },
    },
    include: {
      Address: true,
    },
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  const session = await prisma.session.create({
    data: {
      token: token,
      userId: user.id,
    },
  });

  const TicketType = await prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: faker.datatype.boolean(),
      includesHotel: faker.datatype.boolean(),
    },
  });

  const ticket = await prisma.ticket.create({
    data: {
      enrollmentId: enrollment.id,
      ticketTypeId: TicketType.id,
      status: "PAID",
    },
  });

  const hotel = await  prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }})

    const Room1 = await prisma.room.create({
      data: {
        name: '1020',
        capacity: 3,
        hotelId: hotel.id,
      },
    });



  console.log({ enrollment });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
