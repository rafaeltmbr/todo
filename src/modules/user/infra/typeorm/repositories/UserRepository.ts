import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public findById(id: string) {
    return this.repository.findOne(id);
  }

  public findByEmail(email: string) {
    return this.repository.findOne({ email });
  }

  public create(data: ICreateUserDTO) {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  public update(user: User) {
    return this.repository.save(user);
  }

  public async delete(user: User) {
    await this.repository.remove(user);
  }
}
