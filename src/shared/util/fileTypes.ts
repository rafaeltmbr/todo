export interface IFileTypeInfo {
  name: string;
  mimeType: string;
  extensions: string[];
}

export const mimeTypes: IFileTypeInfo[] = [
  { name: "gif", mimeType: "image/gif", extensions: ["gif"] },
  { name: "jpeg", mimeType: "image/jpeg", extensions: ["jpeg", "jpg"] },
  { name: "png", mimeType: "image/png", extensions: ["png"] },
  { name: "svg", mimeType: "image/svg+xml", extensions: ["svg"] },
  { name: "webp", mimeType: "image/webp", extensions: ["webp"] },
];
