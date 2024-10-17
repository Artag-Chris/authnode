import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';





export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();
    const controller = new CategoryController();
    
    // Definir las rutas
    router.get('/', controller.getCategories);
    //los middlewares son el segundo parámetro de las rutas y si hay varios se usan
    //en un array, y gracias a el next() seguira el controllador
    router.post('/', [AuthMiddleware.validateJWT],controller.createCategory);



    return router;
  }


}
