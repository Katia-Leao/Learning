import { Request, Response } from "express";
import { PrismaClient, Product } from "@prisma/client";
import { v4 } from "uuid";
import { PurchaseRequest } from "../domain/dtos/purchase.dto";
import { BadRequestException } from "domain/exceptions/badRequest";

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
    let updatedQuantity = products[i].quantity - purchase.items[i].quantity;
    let onStock = true;
    if (updatedQuantity < 0) {
      throw new BadRequestException("Not enough products in stock.");
    }
    if (updatedQuantity == 0) {
      onStock = false;
    }
    console.log(onStock);
    await prisma.product.update({
      data: {
        quantity: updatedQuantity,
        onMenu: onStock,
      },
      where: {
        id: products[i].id,
      },
    });
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
