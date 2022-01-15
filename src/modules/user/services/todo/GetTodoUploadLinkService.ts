import { IStorageProvider } from "@shared/providers/storage/interfaces/IStorageProvider";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetTodoImageUploadLinkService {
  constructor(
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  public async execute(mimeType: string) {
    return this.storageProvider.getUploadLink({
      folder: "todo",
      mimeType,
    });
  }
}
