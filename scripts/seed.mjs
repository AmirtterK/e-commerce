import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Manually load .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "../.env.local");
try {
  const envFile = readFileSync(envPath, "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    process.env[key] = val;
  }
} catch {
  console.warn("⚠️  Could not read .env.local, falling back to existing env vars");
}


const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const products = JSON.parse(
  readFileSync(join(__dirname, "../src/data/products.json"), "utf-8")
);
const slides = JSON.parse(
  readFileSync(join(__dirname, "../src/data/slides.json"), "utf-8")
);

async function seed() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });

  try {
    console.log("🔌 Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected!");

    const db = client.db("Handla");

    // --- Seed products ---
    const productsCol = db.collection("products");
    await productsCol.deleteMany({}); // clear existing
    const productsResult = await productsCol.insertMany(products);
    console.log(`✅ Inserted ${productsResult.insertedCount} products`);

    // --- Seed slides ---
    const slidesCol = db.collection("slides");
    await slidesCol.deleteMany({}); // clear existing
    const slidesResult = await slidesCol.insertMany(slides);
    console.log(`✅ Inserted ${slidesResult.insertedCount} slides`);

    console.log("\n🎉 Seeding complete! Your MongoDB is ready.");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    console.error("\n💡 Tips:");
    console.error("   - Make sure your Atlas cluster is running (not paused)");
    console.error("   - Check that your IP is whitelisted in Atlas Network Access");
    console.error("   - Verify credentials in .env.local");
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
