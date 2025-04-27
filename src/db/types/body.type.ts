export interface RequestBody {
    id: string;
    requestId: string;
    type: "json" | "xml" | "none";
    content: object;
  }
  