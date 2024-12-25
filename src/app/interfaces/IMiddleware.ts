/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRequest } from "./IRequest";

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IData {
  data: Record<string, any>;
}

export interface IMiddlleware {
  handle(request: IRequest): Promise<IResponse | IData>;
}
