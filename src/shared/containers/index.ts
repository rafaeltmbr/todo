import { container } from "tsyringe";

import "@modules/user/containers";
import "@modules/todo/containers";

import { MailProvider } from "@shared/providers/mail/implementations";
import { StorageProvider } from "@shared/providers/storage/implementations";
import { TokenProvider } from "@shared/providers/token/TokenProvider";
import { CodeProvider } from "@shared/providers/code";

container.register("MailProvider", MailProvider);
container.register("StorageProvider", StorageProvider);
container.register("TokenProvider", TokenProvider);
container.register("CodeProvider", CodeProvider);
