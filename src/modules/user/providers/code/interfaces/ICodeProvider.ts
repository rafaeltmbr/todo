export interface ICodeProviderOptions {
  alphabet?: string;
  length?: number;
}

export interface ICodeProvider {
  generate(options?: ICodeProviderOptions): Promise<string>;
}
