export interface ISendMailDTO {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface IMailProvider {
  send(data: ISendMailDTO): Promise<void>;
}
