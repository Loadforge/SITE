import { ParamsRepository } from "@/db/repositories/params .repository";
import { Param } from "@/db/types/params.type";

export class ParamsService {
  private static repository: ParamsRepository = new ParamsRepository();

  static async create(requestId: string): Promise<Param> {
    return this.repository.createParam(requestId);
  }

  static async getByRequestId(requestId: string): Promise<Param[]> {
    return this.repository.getParamsByRequestId(requestId);
  }

  static async update(param: Param): Promise<void> {
    return this.repository.updateParam(param);
  }

  static async deleteById(paramId: string): Promise<void> {
    return this.repository.deleteParamById(paramId);
  }
}
