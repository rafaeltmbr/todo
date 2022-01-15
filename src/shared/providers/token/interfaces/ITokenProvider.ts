export interface ITokenProvider {
  encode(data: any, expiresIn?: number): Promise<string>;
  decode<T>(data: string): Promise<T>;
}
