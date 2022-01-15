import { CreateTodoService } from "@modules/user/services/todo/CreateTodoService";
import { DeleteTodoService } from "@modules/user/services/todo/DeleteTodoService";
import { GetTodoImageUploadLinkService } from "@modules/user/services/todo/GetTodoUploadLinkService";
import { ListTodoService } from "@modules/user/services/todo/ListTodoService";
import { ShowTodoService } from "@modules/user/services/todo/ShowTodoService";
import { UpdateTodoService } from "@modules/user/services/todo/UpdateTodoService";
import { httpStatusCode } from "@shared/infra/http/config/httpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class TodoController {
  public static async create(req: Request, res: Response) {
    const createTodo = container.resolve(CreateTodoService);
    const todo = await createTodo.execute(req.body, req.user);
    return res.status(httpStatusCode.created.status).json(todo);
  }

  public static async list(req: Request, res: Response) {
    const listTodo = container.resolve(ListTodoService);
    const todos = await listTodo.execute(req.user);
    return res.status(httpStatusCode.ok.status).json(todos);
  }

  public static async show(req: Request, res: Response) {
    const showTodo = container.resolve(ShowTodoService);
    const todo = await showTodo.execute(req.params.id, req.user);
    return res.status(httpStatusCode.ok.status).json(todo);
  }

  public static async update(req: Request, res: Response) {
    const updateTodo = container.resolve(UpdateTodoService);
    const todo = await updateTodo.execute({
      id: req.params.id,
      data: req.body,
      user: req.user,
    });
    return res.status(httpStatusCode.ok.status).json(todo);
  }

  public static async delete(req: Request, res: Response) {
    const deleteTodo = container.resolve(DeleteTodoService);
    await deleteTodo.execute(req.params.id, req.user);
    return res.status(httpStatusCode.noContent.status).send();
  }

  public static async upload(req: Request, res: Response) {
    const getUploadLink = container.resolve(GetTodoImageUploadLinkService);
    const uploadInfo = await getUploadLink.execute(
      req.query.mime?.toString() || ""
    );
    return res.status(httpStatusCode.ok.status).json(uploadInfo);
  }
}
