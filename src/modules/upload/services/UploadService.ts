import { IStorageProvider } from "@shared/providers/storage/interfaces/IStorageProvider";
import { ITokenProvider } from "@shared/providers/token/interfaces/ITokenProvider";
import { inject, injectable } from "tsyringe";

interface IPayload {
  filePath: string;
}

@injectable()
export class UploadService {
  constructor(
    @inject("StorageProvider") private storageProvider: IStorageProvider,
    @inject("TokenProvider") private tokenProvider: ITokenProvider
  ) {}

  public async execute(token: string, buffer: Buffer) {
    const { filePath } = await this.tokenProvider.decode<IPayload>(token);
    await this.storageProvider.uploadFile(filePath, buffer);
  }
}
