import { CustomError } from "../../domain";
import {  Request, Response } from "express";


export class CategoryController {


constructor(){}


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        return res.status(500).json({ error: `Internal Server Error` });
      };


      createCategory = async (req: Request, res: Response) => {
       
        res.json("createCategory")
      };

      getCategories = async (req: Request, res: Response) => {
       
        res.json("getCategory")
      };

}
