import { ICreateEmailCodeDTO } from "@modules/user/dtos/ICreateEmailCodeDTO";
import { IEmailCodeRepository } from "@modules/user/repositories/IEmailCodeRepository";
import { getRepository, Repository } from "typeorm";
import { EmailCode } from "../entities/EmailCode";

export class EmailCodeRepository implements IEmailCodeRepository {
  private repository: Repository<EmailCode>;

  constructor() {
    this.repository = getRepository(EmailCode);
  }

  findByEmail(email: string) {
    return this.repository.findOne({ email });
  }

  create(data: ICreateEmailCodeDTO) {
    const emailCode = this.repository.create(data);
    return this.repository.save(emailCode);
  }

  update(email: EmailCode) {
    return this.repository.save(email);
  }

  async delete(email: EmailCode) {
    await this.repository.remove(email);
  }
}
