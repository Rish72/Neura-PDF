// api/create-chat/route.ts
import { db } from "@/lib/db";
import { load_S3Into_Pinecone } from "@/lib/db/pinecone";
import { getS3Url } from "@/lib/db/s3";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  console.log("route create chat post request userId from clerk : ", userId);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // Use 401 for Unauthorized
  }

  try {
    const body = await req.json();
    const { file_name, file_key } = body;
    console.log("From post method of create-chats ", file_key + " " + file_name);

    // 1. Insert chat metadata into DB immediately
    const insertedChat = await db.insert(chats).values({
      fileKey: file_key,
      pdfName: file_name,
      pdfUrl: getS3Url(file_key),
      userId,
    }).returning({
      id: chats.id // Return the actual 'id' column from your schema
    });

    if (!insertedChat || insertedChat.length === 0) {
      throw new Error("Failed to insert chat into database.");
    }

    const chatId = insertedChat[0].id; // Get the newly created chat ID

    console.log("chat_id from db : ", typeof(chatId), chatId);

    // 2. Immediately return the chat_id to the client
    // This prevents the 504 timeout on the client-side
    const response = NextResponse.json({ chat_id: chatId }, { status: 200 });

    // 3. Asynchronously trigger the long-running PDF processing
    // DO NOT AWAIT load_S3Into_Pinecone here.
    // This call will run in the background.
    // However, be aware that in serverless environments, the function might
    // terminate before this background task completes if it's too long.
    // For reliable long tasks, consider Vercel Background Functions or a queue.
    Promise.resolve(load_S3Into_Pinecone(file_key))
      .then(() => console.log(`Background processing completed for file: ${file_key}`))
      .catch((bgError) => console.error(`Background processing failed for file: ${file_key}`, bgError));

    return response; // Return the response immediately

  } catch (error) {
    console.error("Error in api/create-chat/: ", error);
    return NextResponse.json({
      error: "Failed to initiate chat creation.", // More generic error for client
      details: (error as Error).message, // Add error message for debugging
    }, { status: 500 }); // Use 500 for internal server error
  }
}