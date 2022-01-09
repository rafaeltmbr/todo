import { container } from "tsyringe";

import "@modules/user/containers";

import { IMailProvider } from "@shared/providers/mail/interfaces/IMailProvider";
import { MailProvider } from "@shared/providers/mail/implementations";

container.register<IMailProvider>("MailProvider", MailProvider);
