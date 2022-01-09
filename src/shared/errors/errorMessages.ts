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
];
export type ErrorType = typeof errorType[number];

export const errorMessages: Record<ErrorType, IErrorDescription> = {
  emailAlreadyExists: {
    status: 401,
    message: {
      en: "Email already exists.",
      pt: "Este e-mail já existe.",
    },
  },
  emailCodeInvalid: {
    status: 401,
    message: {
      en: "Invalid email code.",
      pt: "Código de e-mail inválido.",
    },
  },
  emailCodeExpired: {
    status: 401,
    message: {
      en: "Email code expired.",
      pt: "Código de e-mail expirado.",
    },
  },
  emailCodeMaximumAttempts: {
    status: 401,
    message: {
      en: "Maximum email code attempts limit reached.",
      pt: "Limite máximo de verificação de código atingido.",
    },
  },
};
