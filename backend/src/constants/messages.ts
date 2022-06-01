export const USER_INSTANCE = "user";

export const USER_EMAIL_EXISTS_TYPE = "user.post";
export const USER_EMAIL_EXISTS_TITLE = "Email já cadastrado";
export const USER_EMAIL_EXISTS_DETAIL =
    "Email informado já foi cadastrado na base";

export const USER_DOES_NOT_EXISTS_TYPE = "user.get";
export const USER_DOES_NOT_EXISTS_TITLE = "Usuário não existe";
export const USER_DOES_NOT_EXISTS_DETAIL = "O usuário informado não existe";

export const USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_TYPE =
    "user.token.credentials";
export const USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_TITLE =
    "Token do usuário não existe";
export const USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_DETAIL =
    "O token informado não existe para este usuário";

export const USER_TOKEN_CREDENTIALS_EXPIRED_TYPE =
    "user.token.credentials.expired";
export const USER_TOKEN_CREDENTIALS_EXPIRED_TITLE = "Token expirado";
export const USER_TOKEN_CREDENTIALS_EXPIRED_DETAIL =
    "O token informado expirou";

export const USER_TOKEN_CREDENTIALS_INSTACE = "user/token/reset/password";

export const INCORRECT_CREDENTIALS_TYPE = "user.session.credentials";
export const INCORRECT_CREDENTIALS_TITLE = "Email e/ou senha incorretos";
export const INCORRECT_CREDENTIALS_DETAIL =
    "As credenciais informadas não correspondem";
export const INCORRECT_CREDENTIALS_INSTACE = "user/post/session";

export const USER_UNAUTHORIZED_TYPE = "user.operation.credentials";
export const USER_UNAUTHORIZED_TITLE = "Usuário não autorizado";
export const USER_UNAUTHORIZED_DETAIL =
    "O usuário não tem permissão para realizar a operação com os dados fornecidos";
export const USER_UNAUTHORIZED_INSTANCE = "user/operation/credentials";
