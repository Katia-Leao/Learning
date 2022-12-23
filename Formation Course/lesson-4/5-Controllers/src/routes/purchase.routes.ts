import { Router } from "express";
import { create } from "../controllers/purchase.controller";

const purchaseRoutes = Router();

purchaseRoutes.post("/", create);

export { purchaseRoutes };
