import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = readFileSync(join(__dirname, "../.env.local"), "utf-8");
for (const line of envFile.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
  process.env[key] = val;
}

const uri = process.env.MONGODB_URI;
if (!uri) { console.error("No MONGODB_URI found"); process.exit(1); }

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  const db = client.db("Handla");
  const productCount = await db.collection("products").countDocuments();
  const slideCount   = await db.collection("slides").countDocuments();
  console.log("Connected successfully");
  console.log("products:", productCount, "documents");
  console.log("slides:", slideCount, "documents");
} catch (e) {
  console.error("Connection failed:", e.message);
  process.exit(1);
} finally {
  await client.close();
}
