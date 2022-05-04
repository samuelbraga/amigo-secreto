  import { Request, Response, NextFunction } from 'express';

interface IErrorBase extends Error {
    type?: string;
    title?: string;
    statusCode?: number;
    detail?: string;
    instace?: string;
}

export default (
  err: IErrorBase,
  request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  if (err.statusCode) {
    return response
      .status(err.statusCode)
      .json({ type: err.type,
        title: err.title,
        status: err.statusCode,
        detail: err.detail,
        instace: err.instace, });
  }

  return response.status(500).json({ status: 'error', error: err.message });
};