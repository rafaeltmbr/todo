import { ICreateEmailCodeDTO } from "../dtos/ICreateEmailCodeDTO";
import { EmailCode } from "../infra/typeorm/entities/EmailCode";

export interface IEmailCodeRepository {
  findByEmail(email: string): Promise<EmailCode | undefined>;
  create(data: ICreateEmailCodeDTO): Promise<EmailCode>;
  update(email: EmailCode): Promise<EmailCode>;
  delete(email: EmailCode): Promise<void>;
}
