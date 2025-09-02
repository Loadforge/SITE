import { openDB } from "idb";

export async function openDb() {
  const db = await openDB("LoadForgeDB", 1, {
    upgrade(db) {
      db.createObjectStore("project", { keyPath: "id" });

      const requestStore = db.createObjectStore("request", { keyPath: "id" });
      requestStore.createIndex("projectIndex", "projectId");

      const bodyStore = db.createObjectStore("body", { keyPath: "id" });
      bodyStore.createIndex("requestIndex", "requestId");

      const docsStore = db.createObjectStore("docs", { keyPath: "id" });
      docsStore.createIndex("requestIndex", "requestId");

      const paramsStore = db.createObjectStore("params", { keyPath: "id" });
      paramsStore.createIndex("requestIndex", "requestId");

      const authStore = db.createObjectStore("auth", { keyPath: "id" });
      authStore.createIndex("requestIndex", "requestId");

      const headersStore = db.createObjectStore("headers", { keyPath: "id" });
      headersStore.createIndex("requestIndex", "requestId");

      const responseStore = db.createObjectStore("response", { keyPath: "id" });
      responseStore.createIndex("requestIndex", "requestId");

      const advancedStore = db.createObjectStore("advanced", { keyPath: "id" });
      advancedStore.createIndex("requestIndex", "requestId");

      const configTestStore = db.createObjectStore("configTest", { keyPath: "id" });
      configTestStore.createIndex("requestIndex", "requestId");

      const metricsTestStore = db.createObjectStore("metricsTest", { keyPath: "id" });
      metricsTestStore.createIndex("requestIndex", "requestId");
    },
  });

  return db;
}
