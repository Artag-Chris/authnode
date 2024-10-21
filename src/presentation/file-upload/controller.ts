import { Request, Response } from "express";
import { CustomError } from "../../domain";


export class FileUploadController {
  constructor(
   // private readonly categoryService: CategoryService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: `Internal Server Error` });
  };

  uploadFile = (req: Request, res: Response) => {
    
    console.log({files:req.files});

    res.json("File uploaded");
  };  

uploadMultipleFiles = (req: Request, res: Response) => {
    
  res.json("Files uploaded");
};

}
