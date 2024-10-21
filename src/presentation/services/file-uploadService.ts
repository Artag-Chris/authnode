export class FileUploadService {
  constructor() {}

  private checkFolder(folderPath: string) {
    throw new Error("Method not implemented.");
  }

  uploadSingleFile = (
    file: string,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) => {};

  uploadMultipleFiles = (
    file: string[],
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) => {};
}
