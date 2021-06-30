import MongoDBManager from "./mongo/MongoDBManager";

export default async () => {
  const db = new MongoDBManager();
  await db.connect();
  return db;
};
