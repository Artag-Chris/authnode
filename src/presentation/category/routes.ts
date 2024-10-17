import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/categoryService';





export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService();
    const controller = new CategoryController(categoryService);
    
    // Definir las rutas
    router.get('/', controller.getCategories);
    //los middlewares son el segundo parámetro de las rutas y si hay varios se usan
    //en un array, y gracias a el next() seguira el controllador
    router.post('/', [AuthMiddleware.validateJWT],controller.createCategory);



    return router;
  }


}
