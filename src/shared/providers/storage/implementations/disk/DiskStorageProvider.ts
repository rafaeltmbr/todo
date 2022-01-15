import { constants } from "@shared/config/constants";
import { CodeProvider } from "@shared/providers/code";
import { ICodeProvider } from "@shared/providers/code/interfaces/ICodeProvider";
import { ITokenProvider } from "@shared/providers/token/interfaces/ITokenProvider";
import { TokenProvider } from "@shared/providers/token/TokenProvider";
import { mimeTypes } from "@shared/util/fileTypes";
import fs from "fs";
import {
  IFileUploadParams,
  IStorageProvider,
  storageFolders,
} from "../../interfaces/IStorageProvider";

const uploadFolder = "./tmp/upload";

export class DiskStorageProvider implements IStorageProvider {
  private uploadEndpoint: string;

  private fileUrl: string;

  private tokenProvider: ITokenProvider;

  private codeProvider: ICodeProvider;

  constructor() {
    storageFolders.forEach((storage) => {
      const folder = `${uploadFolder}/${storage}`;
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    });

    this.uploadEndpoint = `${process.env.API_URL}/upload`;
    this.fileUrl = `${process.env.API_URL}/files`;

    this.tokenProvider = new TokenProvider();
    this.codeProvider = new CodeProvider();
  }

  public async uploadFile(filePath: string, buffer: Buffer) {
    await fs.promises.writeFile(`${uploadFolder}/${filePath}`, buffer);
  }

  public async removeFile(filePath: string) {
    await fs.promises.rm(`${uploadFolder}/${filePath}`);
  }

  public async getUploadLink({ folder, mimeType }: IFileUploadParams) {
    const code = await this.codeProvider.generate({
      length: 6,
    });

    const extension = mimeTypes.find((e) => e.mimeType === mimeType)
      ?.extensions[0];

    const filename = `${Date.now()}-${code}.${extension}`;

    const filePath = `${folder}/${filename}`;

    const token = await this.tokenProvider.encode(
      { filePath },
      constants.fileUploadJwtExpirationInterval
    );

    return {
      uploadLink: `${this.uploadEndpoint}?token=${token}`,
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
