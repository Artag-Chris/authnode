import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './controller';
import { ProductService } from "../services/productService";





export class ProductsRoutes {


  static get routes(): Router {

    const router = Router();
   const productsService = new ProductService();
    const controller = new ProductController(productsService);
    
    // Definir las rutas
    router.get('/', controller.getProducts);
    //los middlewares son el segundo parámetro de las rutas y si hay varios se usan
    //en un array, y gracias a el next() seguira el controllador
    router.post('/', [AuthMiddleware.validateJWT],controller.createProducts);



    return router;
  }


}
