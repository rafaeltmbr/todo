import { errorMessages, ErrorType, IErrorDescription } from "./errorMessages";

export class LocaleError extends Error {
  public type: ErrorType;

  public description: IErrorDescription;

  constructor(errorType: ErrorType) {
    const message = errorMessages[errorType];
    super(message.message.en);

    this.type = errorType;
    this.description = message;
  }
}
