import { Router } from 'express';
//import { ProductsController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './controller';
//import { ProductsService } from '../services/categoryService';





export class ProductsRoutes {


  static get routes(): Router {

    const router = Router();
   //const ProductsService = new ProductsService();
    const controller = new ProductController();
    
    // Definir las rutas
    router.get('/', controller.getProducts);
    //los middlewares son el segundo parámetro de las rutas y si hay varios se usan
    //en un array, y gracias a el next() seguira el controllador
    router.post('/', [AuthMiddleware.validateJWT],controller.createProducts);



    return router;
  }


}
