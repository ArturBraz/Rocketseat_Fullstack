import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifySuserAuthorization";

const productsRoutes = Router();
const productsController = new ProductsController();

/*
proteção de rotas para rotas abaixo:
  productsRoutes.use(verifyUserAuthorization(["sale","admin"]))
*/
productsRoutes.get("/", productsController.index);
productsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "admin"]), //Auth na rota específica
  productsController.create
);

export { productsRoutes };
