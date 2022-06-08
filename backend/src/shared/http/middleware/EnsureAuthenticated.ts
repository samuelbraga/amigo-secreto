import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

import authConfig from '@config/auth';
import ExceptionBase from '@shared/exceptions/ExceptionBase';
import * as messages from '@constants/messages';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ExceptionBase(
        messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_TYPE,
        messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_TITLE,
        HttpStatus.UNAUTHORIZED,
        messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_DETAIL,
        messages.USER_UNAUTHORIZED_INSTANCE);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new ExceptionBase(
        messages.USER_TOKEN_CREDENTIALS_EXPIRED_TYPE,
        messages.USER_TOKEN_CREDENTIALS_EXPIRED_TITLE,
        HttpStatus.UNAUTHORIZED,
        messages.USER_TOKEN_CREDENTIALS_EXPIRED_DETAIL,
        messages.USER_UNAUTHORIZED_INSTANCE);
  }
};