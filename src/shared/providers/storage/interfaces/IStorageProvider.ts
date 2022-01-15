export const storageFolders = <const>["todo"];
type Folder = typeof storageFolders[number];

export interface IFileUploadParams {
  folder: Folder;
  mimeType: string;
}

export interface IFileUploadLocation {
  uploadLink: string;
  filePath: string;
}

export interface IStorageProvider {
  uploadFile(filePath: string, buffer: Buffer): Promise<void>;
  removeFile(filePath: string): Promise<void>;
  getUploadLink(data: IFileUploadParams): Promise<IFileUploadLocation>;
  getFilePathFromUrl(url: string): string;
  getUrlFromFilePath(path: string): string;
}
