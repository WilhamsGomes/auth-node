import { env } from "../config/env";
import {
  IData,
  IMiddlleware,
  IRequest,
  IResponse,
} from "../interfaces/IMiddleware";
import { verify } from "jsonwebtoken";

export class AuthenticationMiddleware implements IMiddlleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: "Invalid access token",
        },
      };
    }

    try {
      const [bearer, token] = authorization.split(" ");

      if (bearer !== "Bearer") {
        throw new Error();
      }

      const payload = verify(token, env.jwtSecret);

      return {
        data: {
          accountId: payload.sub,
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: "Invalid access token",
        },
      };
    }
  }
}
