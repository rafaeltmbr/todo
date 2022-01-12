import fs from "fs";
import {
  IFileUploadParams,
  IStorageProvider,
} from "../../interfaces/IStorageProvider";

const uploadFolder = "./tmp/upload";

export class DiskStorageProvider implements IStorageProvider {
  private uploadEndpoint: string;

  private fileUrl: string;

  constructor() {
    if (!fs.existsSync(uploadFolder))
      fs.mkdirSync(uploadFolder, { recursive: true });

    this.uploadEndpoint = `${process.env.API_URL}/disk/upload`;
    this.fileUrl = `${process.env.API_URL}/files`;
  }

  public async uploadFile(filePath: string, buffer: Buffer) {
    await fs.promises.writeFile(`./tmp/${filePath}`, buffer);
  }

  public async removeFile(filePath: string) {
    await fs.promises.rm(`./tmp/${filePath}`);
  }

  public async getUploadLink({ name, folder }: IFileUploadParams) {
    const filePath = `${folder}/${name}`;

    return {
      uploadLink: `${this.uploadEndpoint}/${filePath}`,
      filePath,
    };
  }

  public getFilePathFromUrl(url: string) {
    return url.split("/").slice(-2).join("/");
  }

  public getUrlFromFilePath(path: string) {
    return `${this.fileUrl}/${path}`;
  }
}
