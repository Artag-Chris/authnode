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
    
    const files = req.files;

    if(!req.files||Object.keys(req.files).length===0){
      return res.status(400).json({error:'No files were uploaded'});
    }
  
  
    const file = files!["undefined"] as UploadedFile;
   
    this.fileUploadService
      .uploadSingle(file)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res));

  };  

uploadMultipleFiles = (req: Request, res: Response) => {
    
  res.json("Files uploaded");
};

}
