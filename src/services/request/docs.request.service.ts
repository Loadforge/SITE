import { DocsRepository } from '@/db/repositories/docs.repository';
import { RequestDocs } from '@/db/types/docs.type';

export class RequestdocsService {
  private static repository: DocsRepository = new DocsRepository();

  static async getdocsByRequestId(requestId: string): Promise<RequestDocs> {
    return this.repository.getDocsByRequestId(requestId);
  }

  static async update(docs: RequestDocs): Promise<void> {
    return this.repository.updateDocs(docs);
  }
}
