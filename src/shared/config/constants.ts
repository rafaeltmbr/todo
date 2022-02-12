export const constants = <const>{
  defaultHttpPort: 8080,
  minUsernameLength: 3,
  minPasswordLength: 8,
  emailCodeLength: 6,
  bcryptSaltRouds: 8,
  maxPasswordRecoveryAttempts: 5,
  maxPasswordRecoveryTimeMs: 5 * 60 * 1000, // 5 min
  userAuthJwtExpirationInterval: 24 * 60 * 60, // 1 day
  fileUploadJwtExpirationInterval: 5 * 60, // 5 min
};
