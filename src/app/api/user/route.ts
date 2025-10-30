import { auth, currentUser } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: "Not signed in" }), {
      status: 401,
    });
  }

  const user = await currentUser();
  const client = await clientPromise;
  const db = client.db("Handla");
  const users = db.collection("users");

  await users.updateOne(
    { clerkId: userId },
    {
      $setOnInsert: {
        clerkId: userId,
        admin: false,
        email: user?.emailAddresses[0].emailAddress,
        name: `${user?.firstName || ""} ${user?.lastName || ""}`,
        createdAt: new Date(),
        cart: [],
      },
      $set: {
        
      },
    },
    { upsert: true }
  );

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
