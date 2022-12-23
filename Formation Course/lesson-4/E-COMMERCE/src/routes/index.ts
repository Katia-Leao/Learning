//esse arquivo tem a função de mapear todas as rotas do projeto

import { Router } from "express";

import { addressRoutes } from "./addresses.routes";
import { neighborhoodRoutes } from "./neighborhood.routes";
import { productRoutes } from "./products.routes";
import { userRoutes } from "./users.routes";
import { purchaseRoutes } from "./purchase.routes";

const routes = Router();

//Adicionando as rotas de produtos
routes.use("/addresses", addressRoutes);
routes.use("/neighborhoods", neighborhoodRoutes);
routes.use("/products", productRoutes);
routes.use("/users", userRoutes);
routes.use("/purchase", purchaseRoutes);

export { routes };
