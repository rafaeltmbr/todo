export interface ITokenProvider {
  encode(data: any): Promise<string>;
  decode<T>(data: string): Promise<T>;
}
