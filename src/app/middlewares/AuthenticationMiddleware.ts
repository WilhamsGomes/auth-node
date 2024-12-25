import { env } from "../config/env";
import { IData, IMiddlleware, IResponse } from "../interfaces/IMiddleware";
import { JwtPayload, verify } from "jsonwebtoken";
import { IRequest } from "../interfaces/IRequest";

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

      const payload = verify(token, env.jwtSecret) as JwtPayload;

      return {
        data: {
          account: {
            id: payload.sub,
            role: payload.role,
          },
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
