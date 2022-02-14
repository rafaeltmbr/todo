import { User } from "../infra/typeorm/entities/User";

export const cleanUserData = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  created_at: user.created_at,
  // updated_at: user.updated_at,
});
