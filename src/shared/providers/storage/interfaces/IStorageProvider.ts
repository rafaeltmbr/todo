const folder = <const>["todo"];
type Folder = typeof folder[number];

export interface IFileUploadParams {
  name: string;
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
