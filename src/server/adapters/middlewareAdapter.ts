import { NextFunction, Request, Response } from "express";
import { IMiddlleware } from "../../app/interfaces/IMiddleware";

export function middlewareAdapter(middleware: IMiddlleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      body: request.body,
      params: request.params,
      account: request.metadata?.account,
      headers: request.headers as Record<string, string>,
    });

    if ("statusCode" in result) {
      return response.status(result.statusCode).json(result.body);
    }

    request.metadata = {
      ...request.metadata,
      ...result.data,
    };
    next();
  };
}
