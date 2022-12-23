import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { PurchaseRequest } from "../domain/dtos/purchase.dto";

const prisma = new PrismaClient();

export async function create(
  request: Request<{}, {}, PurchaseRequest>,
  response: Response
) {
  const purchase = request.body;
  const idPurchase = v4();
  let totalValue = 0;

  const productsIds = purchase.items.map((x) => x.idProduct);
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds,
      },
    },
  });

  for (let i = 0; i < products.length; i++) {
    totalValue += Number(products[i].price) * purchase.items[i].quantity;
  }

  //salvar a compra
  await prisma.purchase.create({
    data: {
      id: idPurchase,
      idUser: purchase.idUser,
      idAdress: purchase.idAdress,
      totalValue: totalValue,
    },
  });
  //salvar os itens da compra
  for (let i = 0; i < purchase.items.length; i++) {
    const item = purchase.items[i];
    const product = products.find((x) => x.id == item.idProduct);
    if (!product) continue;

    await prisma.items.create({
      data: {
        idPurchase: idPurchase,
        idProduct: item.idProduct,
        quantity: item.quantity,
        unitValue: product.price,
      },
    });
  }
  response.json({
    message: "Purchase successfull..You will soon receive your product. Enjoy!",
  });
}
