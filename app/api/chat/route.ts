// api/chat/route.ts
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { google } from "@ai-sdk/google";
import { streamText, Message } from "ai"; // Import Message type
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    const fileKey = _chats[0].fileKey;

    const lastMsg = messages[messages.length - 1];
    const context = await getContext(lastMsg.content, fileKey);


     const prompt = `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      `


    const formattedMessages: Message[] = messages.map((msg: Message) => ({
      role: msg.role,
      content:
        typeof msg.content === "string"
          ? msg.content
          : msg.content?.[0] || "", // Fallback for safety
    }));

    const result = streamText({
      model: google("gemini-1.5-flash"),
      messages: formattedMessages, // Use the formatted messages here
      system : prompt,
      onError: (error) => {
        console.error("Error during streaming:", error);
      },
    },
  );

    console.log("Returning data stream response to client.");

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Caught error in /api/chat try/catch:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
