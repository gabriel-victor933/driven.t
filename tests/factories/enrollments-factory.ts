import faker from '@faker-js/faker';
import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import { User } from '@prisma/client';

import { createUser } from './users-factory';
import { prisma } from '@/config';

export async function createEnrollmentWithAddress(user?: User) {
  const incomingUser = user || (await createUser());

  return prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: generateCPF(),
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber('(##) 9####-####'),
      userId: incomingUser.id,
      Address: {
        create: {
          street: faker.address.streetName(),
          cep: faker.address.zipCode(),
          city: faker.address.city(),
          neighborhood: faker.address.city(),
          number: faker.datatype.number().toString(),
          state: faker.helpers.arrayElement(getStates()).name,
        },
      },
    },
    include: {
      Address: true,
    },
  });
}

export function createhAddressWithCEP() {
  return {
    logradouro: 'Avenida Brigadeiro Faria Lima',
    complemento: 'de 3252 ao fim - lado par',
    bairro: 'Itaim Bibi',
    cidade: 'São Paulo',
    uf: 'SP',
  };
}


export function createEnrollmentData(){
  const enrollmentId = parseInt(faker.random.numeric(4))
  return {
    id: enrollmentId,
    name: faker.name.firstName(),
    cpf: faker.random.numeric(11),
    birthday: faker.datatype.datetime(),
    phone: '(##) 9####-####',
    userId: parseInt(faker.random.numeric(4)),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    Address: [
      {
        id: parseInt(faker.random.numeric(4)),
        cep: faker.random.numeric(5).toString(),
        street: faker.name.firstName(),
        city: faker.name.firstName(),
        state: faker.name.firstName(),
        number: '67208',
        neighborhood: faker.name.firstName(),
        addressDetail: faker.name.firstName(),
        enrollmentId: enrollmentId,
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime()
      }
    ]
  }
}