import { Request, Response } from "express";

export class UserController {
  public static async create(req: Request, res: Response) {
    const { body } = req;

    res.json(body);
  }
}
