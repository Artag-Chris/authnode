import { CreateProductDto, CustomError, PaginationDTO } from "../../domain";
import { Request, Response } from "express";
//import { ProducService } from "../services/ProducService";

export class ProductController {
  constructor(
    //private readonly producService: ProducService
  ){}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: `Internal Server Error` });
  };

  createProducts = (req: Request, res: Response) => {
     const [error, createProducDto] = CreateProductDto.create(req.body);
    // if (error) return res.status(400).json({ error });
    // this.producService
    //   .createProduc(createProducDto!, req.body.user)
    //   .then((produc) => res.json(produc))
    //   .catch((error) => this.handleError(error, res));
    res.json("createProducts" );
  };  

  getProducts = async (req: Request, res: Response) => {
     const {page=1,limit=10}=req.query;
     const [error, paginationDto] = PaginationDTO.create(+page, +limit);
     if (error) return res.status(400).json({ error });
   
    res.json("getProducts" );
     // this.producService
       // .getCategories(paginationDto!)
        //.then((categories) => res.json(categories))
        //.catch((error) => this.handleError(error, res));
   
  };

}
