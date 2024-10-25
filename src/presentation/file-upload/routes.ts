import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-uploadService';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';






export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
   
    const controller = new FileUploadController(
      new FileUploadService
    );
    
    router.use(FileUploadMiddleware.containFiles);
    // Definir las rutas
    router.post('/single/:type', controller.uploadFile);
    
    router.post('/multiple/:type', controller.uploadMultileFiles);



    return router;
  }


}
