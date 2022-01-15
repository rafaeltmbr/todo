import { UploadService } from "@modules/upload/services/UploadService";
import { httpStatusCode } from "@shared/infra/http/config/httpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UploadController {
  public static async upload(req: Request, res: Response) {
    const uploadService = container.resolve(UploadService);
    await uploadService.execute(req.query.token?.toString() || "", req.body);

    return res.status(httpStatusCode.noContent.status).send();
  }
}
