import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadController } from './controller';






export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
   
    const controller = new FileUploadController();
    
    // Definir las rutas
    router.get('/single/:type', controller.uploadFile);
    //los middlewares son el segundo parámetro de las rutas y si hay varios se usan
    //en un array, y gracias a el next() seguira el controllador
    router.post('/multiple/:type', controller.uploadMultipleFiles);



    return router;
  }


}
