import { ITodoListItem } from "../infra/typeorm/entities/Todo";

export interface ICreateTodoDTO {
  user_id: string;
  name: string;
  description: string;
  list: ITodoListItem[];
  image_url?: string;
}
