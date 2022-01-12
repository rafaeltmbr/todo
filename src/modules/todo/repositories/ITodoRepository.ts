import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";

export interface ITodoRepository {
  findById(id: string): Promise<Todo | undefined>;
  findByName(name: string): Promise<Todo | undefined>;
  findByUserId(userId: string): Promise<Todo[]>;
  create(data: ICreateTodoDTO): Promise<Todo>;
  update(todo: Todo): Promise<Todo>;
  delete(todo: Todo): Promise<void>;
}
