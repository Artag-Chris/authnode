import { Router } from 'express';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.post(`/login`,)
    router.post(`/register`,)

    router.get(`/validate-email/:token`,)



    return router;
  }


}
