import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { EmailCode } from "../infra/typeorm/entities/EmailCode";

export interface IEmailCodeRepository {
  findByEmail(email: string): Promise<EmailCode | undefined>;
  create(data: ICreateUserDTO): Promise<EmailCode>;
  update(email: EmailCode): Promise<EmailCode>;
  delete(email: EmailCode): Promise<void>;
}
