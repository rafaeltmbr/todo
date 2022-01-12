import { container } from "tsyringe";

import "@modules/user/containers";

import { IMailProvider } from "@shared/providers/mail/interfaces/IMailProvider";
import { MailProvider } from "@shared/providers/mail/implementations";
import { IStorageProvider } from "@shared/providers/storage/interfaces/IStorageProvider";
import { StorageProvider } from "@shared/providers/storage/implementations";

container.register<IMailProvider>("MailProvider", MailProvider);

container.register<IStorageProvider>("StorageProvider", StorageProvider);
