import { Request,Response,NextFunction } from "express";

export class TypeMiddleware{

    //esto seria algo asi como un factory method
    //una funcion que returna un middleware
static validTypes(validTypes:string[]) {

return (req: Request, res: Response, next: NextFunction) => {
    
     //cuando se usa un middleware sin especificar la ruta no tenemos req.params
     //asi que tenemos que usar otro metodo
   // const type = req.params.type;
   const type = req.url.split('/').at(2) ?? "";
    
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: `Invalid type : ${ type }, valid types: ${validTypes}` });
    }

    next();
}

  
}

}