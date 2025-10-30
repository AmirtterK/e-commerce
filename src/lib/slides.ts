import clientPromise from "./mongodb";

export async function getSlides() {
  const db = (await clientPromise).db("Handla"); 
  const slides = await db.collection("slides").find({}).toArray();
  console.log("Connecting to", process.env.MONGODB_URI?.replace(/:.*@/, ":***@"));

  return slides;
}