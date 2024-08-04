import { IController, IRequest, IResponse } from "../interfaces/IController";

export class ListLeadsController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    console.log("request => ", request);

    return {
      statusCode: 200,
      body: {
        leads: [
          { id: "1", name: "Will" },
          { id: "2", name: "Mateus" },
          { id: "3", name: "Teste" },
        ],
      },
    };
  }
}
