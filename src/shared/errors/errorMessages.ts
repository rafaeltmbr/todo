import { httpStatusCode } from "@shared/infra/http/config/httpStatusCode";

export const errorLanguage = <const>["en", "pt"];

export type ErrorLanguage = typeof errorLanguage[number];

export type IErrorMessages = Record<ErrorLanguage, string>;

export interface IErrorDescription {
  status: number;
  message: IErrorMessages;
}

export const errorType = <const>[
  "emailAlreadyExists",
  "emailCodeInvalid",
  "emailCodeExpired",
  "emailCodeMaximumAttempts",
  "emailCooldown",
  "tokenMissing",
  "appKeyMissing",
  "operationNotPermitted",
  "userNotFound",
  "userPasswordInvalid",
  "todoNameAlreadyExists",
  "todoNotFound",
];
export type ErrorType = typeof errorType[number];

export const errorMessages: Record<ErrorType, IErrorDescription> = {
  emailAlreadyExists: {
    status: httpStatusCode.forbidden.status,
    message: {
      en: "Email already exists.",
      pt: "Este e-mail já existe.",
    },
  },
  emailCodeInvalid: {
    status: httpStatusCode.forbidden.status,
    message: {
      en: "Invalid email code.",
      pt: "Código de e-mail inválido.",
    },
  },
  emailCodeExpired: {
    status: httpStatusCode.forbidden.status,
    message: {
      en: "Email code expired.",
      pt: "Código de e-mail expirado.",
    },
  },
  emailCodeMaximumAttempts: {
    status: httpStatusCode.forbidden.status,
    message: {
      en: "Maximum email code attempts limit reached.",
      pt: "Limite máximo de verificação de código atingido.",
    },
  },
  emailCooldown: {
    status: httpStatusCode.forbidden.status,
    message: {
      en: "Maximum email send code attempts. Please, try again later.",
      pt: "Limite máximo de envio de emails atingido. Por favor, tente novamente mais tarde.",
    },
  },
  tokenMissing: {
    status: httpStatusCode.unauthorized.status,
    message: {
      en: "Authentication token is missing.",
      pt: "Token de autenticação não encontrado.",
    },
  },
  appKeyMissing: {
    status: httpStatusCode.internalServerError.status,
    message: {
      en: "APP_KEY enviroment variable missing.",
      pt: "Variável de ambiente APP_KEY não encontrada.",
    },
  },
  operationNotPermitted: {
    status: httpStatusCode.forbidden.status,
    message: {
      en: "Operation not permitted.",
      pt: "Operação não permitida.",
    },
  },
  userNotFound: {
    status: httpStatusCode.unauthorized.status,
    message: {
      en: "User not found.",
      pt: "Usuário não encontrado.",
    },
  },
  userPasswordInvalid: {
    status: httpStatusCode.unauthorized.status,
    message: {
      en: "Invalid password",
      pt: "Senha inválida.",
    },
  },
  todoNameAlreadyExists: {
    status: httpStatusCode.unauthorized.status,
    message: {
      en: "Todo name already exists.",
      pt: "Nome da tarefa já existente.",
    },
  },
  todoNotFound: {
    status: httpStatusCode.notFound.status,
    message: {
      en: "Todo not found.",
      pt: "Tarefa não encontrada.",
    },
  },
};
