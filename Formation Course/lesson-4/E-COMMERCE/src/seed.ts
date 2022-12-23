import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seed() {
  await prisma.product.upsert({
    create: {
      id: 1,
      name: "O um anel",
      description:
        "chocolate 70% folhado a ouro servido num delicioso porta jóias de brigadeiro de frutas vermelhas paraquem tem fome de exclusividade e poder",
      price: 40,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 1 },
  });

  await prisma.product.upsert({
    create: {
      id: 2,
      name: "Sauron",
      description:
        "brigadeiro de chocolate 70% com geléia de pimenta, apenas para os mais corajosos",
      price: 15,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 2 },
  });
  await prisma.product.upsert({
    create: {
      id: 3,
      name: "Frodo",
      description:
        "brigadeiro de chocolate belga com avelã, para quem gosta da rotina",
      price: 15,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 3 },
  });
  await prisma.product.upsert({
    create: {
      id: 4,
      name: "Légolas",
      description:
        "brigadeiro de pistache organico vindo diretamente da floresta verde",
      price: 15,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 4 },
  });
  await prisma.product.upsert({
    create: {
      id: 5,
      name: "Galadriel",
      description: "brigadeiro brulèe que remonta aos séculos de tradição",
      price: 15,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 5 },
  });
  await prisma.product.upsert({
    create: {
      id: 6,
      name: "Gimli",
      description:
        "pepita de chocolate folhada a ouro recheada com Nutella crocante para atrair os mais ambiciosos",
      price: 40,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 6 },
  });
  await prisma.product.upsert({
    create: {
      id: 7,
      name: "Gandalf",
      description: "brigadeiro de Baileys para os mais sábios",
      price: 15,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 7 },
  });
  await prisma.product.upsert({
    create: {
      id: 8,
      name: "Sam",
      description: "brigadeiro de canela para um amigo fiel",
      price: 15,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 8 },
  });
  await prisma.product.upsert({
    create: {
      id: 9,
      name: "Pipin",
      description: "brigadeiro cerveja para aqueles que gostam de curtir",
      price: 15,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 9 },
  });
  await prisma.product.upsert({
    create: {
      id: 10,
      name: "Gollum",
      description:
        "Brigadeiro de Leite Ninho com Nutella para aqueles que cada hora querem um",
      price: 15,
      quantity: 10,
      onMenu: true,
    },
    update: {},
    where: { id: 10 },
  });
}
