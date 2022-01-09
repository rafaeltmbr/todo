import { User } from "@modules/user/infra/typeorm/entities/User";
import { cleanUserData } from "@modules/user/util/cleanUserData";

export class GetProfileService {
  execute(user: User) {
    return cleanUserData(user);
  }
}
