import { ITodoListItem } from "../infra/typeorm/entities/Todo";

export interface IUpdateTodoDTO {
  name?: string;
  description?: string;
  list?: ITodoListItem[];
  image_url?: string | null;
}
