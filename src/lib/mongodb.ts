import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000,
  family: 4, // Force IPv4 — avoids SRV/DNS flakiness on some networks
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

function createClientPromise(): Promise<MongoClient> {
  const client = new MongoClient(uri, options);
  const promise = client.connect();

  // If the connection fails, clear the cache so the next request retries
  // instead of reusing the poisoned rejected promise forever
  promise.catch(() => {
    if (global._mongoClientPromise === promise) {
      global._mongoClientPromise = undefined;
    }
  });

  return promise;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export default clientPromise;

export async function getDatabase() {
  const client = await clientPromise;
  return client.db("Handla");
}