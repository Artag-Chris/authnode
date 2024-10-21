import { CreateProductDto, CustomError, PaginationDTO } from "../../domain";
import { Request, Response } from "express";
import { ProductService } from "../services/productService";


export class ProductController {
  constructor(
    private readonly producService: ProductService
  ){}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: `Internal Server Error` });
  };

  createProducts = (req: Request, res: Response) => {
     const [error, createProducDto] = CreateProductDto.create({...req.body,
       user: req.body.user.id
     });
     if (error) return res.status(400).json({ error });
     this.producService
       .createProduct(createProducDto!)
       .then((product) => res.json(product))
       .catch((error) => this.handleError(error, res));
   
  };  

  getProducts = async (req: Request, res: Response) => {
     const {page=1,limit=10}=req.query;
     const [error, paginationDto] = PaginationDTO.create(+page, +limit);
     if (error) return res.status(400).json({ error });
   
 
      this.producService
       .getProducts(paginationDto!)
       .then((products) => res.json(products))
       .catch((error) => this.handleError(error, res));
   
  };

}
