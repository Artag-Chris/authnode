import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-uploadService";
import { UploadedFile } from "express-fileupload";


export class FileUploadController {
  constructor(
   private readonly fileUploadService: FileUploadService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: `Internal Server Error` });
  };

  uploadFile = (req: Request, res: Response) => {
    
   
    const type = req.params.type;
    const validTypes = ["users", "products", "categories"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: `Invalid type : ${ type }, valid types: ${validTypes}` });
    }

  
  
    const file = req.files?.file as UploadedFile;
    console.log(file);  
    this.fileUploadService
      .uploadSingle(file, `uploads/${ type }`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res));

  };  

uploadMultipleFiles = (req: Request, res: Response) => {
    
  res.json("Files uploaded");
};

}
