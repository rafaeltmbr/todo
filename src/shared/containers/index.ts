import { container } from "tsyringe";

import "@modules/user/containers";
import "@modules/todo/containers";

import { MailProvider } from "@shared/providers/mail/implementations";
import { StorageProvider } from "@shared/providers/storage/implementations";

container.register("MailProvider", MailProvider);
container.register("StorageProvider", StorageProvider);
