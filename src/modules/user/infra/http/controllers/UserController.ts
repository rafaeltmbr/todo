import { ChangePasswordService } from "@modules/user/services/user/ChangePasswordService";
import { CheckEmailCodeService } from "@modules/user/services/user/CheckEmailCodeServices";
import { CreateUserAccountService } from "@modules/user/services/user/CreateUserAccountService";
import { DeleteUserService } from "@modules/user/services/user/DeleteUserService";
import { GetProfileService } from "@modules/user/services/user/GetProfileService";
import { SendEmailCodeService } from "@modules/user/services/user/SendEmailCodeService";
import { SessionService } from "@modules/user/services/user/SessionService";
import { UpdateUserService } from "@modules/user/services/user/UpdateUserService";
import { httpStatusCode } from "@shared/infra/http/config/httpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UserController {
  public static async create(req: Request, res: Response) {
    const createUserAccount = container.resolve(CreateUserAccountService);
    const user = await createUserAccount.execute(req.body);

    return res.status(httpStatusCode.created.status).json(user);
  }

  public static async emailCheck(req: Request, res: Response) {
    const sendEmailCode = container.resolve(SendEmailCodeService);
    await sendEmailCode.execute(req.body.email);

    return res.status(httpStatusCode.created.status).send();
  }

  public static async codeCheck(req: Request, res: Response) {
    const checkEmailCode = container.resolve(CheckEmailCodeService);
    await checkEmailCode.execute(req.body);

    return res.status(httpStatusCode.noContent.status).send();
  }

  public static async session(req: Request, res: Response) {
    const session = container.resolve(SessionService);
    const user = await session.execute(req.body);

    return res.json(user);
  }

  public static async profile(req: Request, res: Response) {
    const profileService = container.resolve(GetProfileService);
    const user = await profileService.execute(req.user);

    return res.json(user);
  }

  public static async changePassword(req: Request, res: Response) {
    const changePassword = container.resolve(ChangePasswordService);
    await changePassword.execute(req.body);

    return res.status(httpStatusCode.noContent.status).send();
  }

  public static async update(req: Request, res: Response) {
    const update = container.resolve(UpdateUserService);
    const user = await update.execute({ user: req.user, data: req.body });

    return res.status(httpStatusCode.ok.status).json(user);
  }

  public static async delete(req: Request, res: Response) {
    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute({ user: req.user, password: req.body.password });

    return res.status(httpStatusCode.noContent.status).send();
  }
}
