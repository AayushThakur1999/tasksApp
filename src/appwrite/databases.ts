import { databases } from "./config";
import { ID, Models } from "appwrite";

interface Collection {
  dbId: string,
  id: string,
  name: string,
}

interface DbOperations {
  list: (queries?: string[]) => Promise<Models.DocumentList<Models.Document>>;
  create: (payload: NotePayload, permissions?: string[], id?: string) => Promise<Models.Document>;
  get: (id: string) => Promise<Models.Document>;
  update: (id: string, payload: Partial<NotePayload>, permissions?: string[]) => Promise<Models.Document>;
  delete: (id: string) => Promise<{}>;
}

interface Db {
  [key: string]: DbOperations
}

interface NotePayload {
  body: string;
}

const db: Db = {};

const collections: Collection[] = [
  {
    dbId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID_NOTES,
    name: 'notes',
  },
]

collections.forEach(collection => {
  db[collection.name] = {
    list: (queries = []) => databases.listDocuments(
      collection.dbId,
      collection.id,
      queries
    ),
    create: (payload, permissions, id = ID.unique()) => databases.createDocument(
      collection.dbId,
      collection.id,
      id,
      payload,
      permissions
    ),
    get: (id) => databases.getDocument(
      collection.dbId,
      collection.id,
      id
    ),
    update: (id, payload, permissions) => databases.updateDocument(
      collection.dbId,
      collection.id,
      id,
      payload,
      permissions
    ),
    delete: (id) => databases.deleteDocument(
      collection.dbId,
      collection.id,
      id
    ),
  }
});

export default db;

