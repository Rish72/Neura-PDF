import { db } from "@/lib/db";
import { load_S3Into_Pinecone } from "@/lib/db/pinecone";
import { getS3Url } from "@/lib/db/s3";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const {userId} = await auth()
  console.log("route create chat post request userId from clerk : ",userId);
  

  if(!userId) return NextResponse.json({error : "Unauthorized"}, {status : 404})
  try {
    const body = await req.json();

    const { file_name, file_key } = body;
    console.log(
      "From post method of create-chats ",
      file_key + " " + file_name
    );

    await load_S3Into_Pinecone(file_key)

    const chat_Id = await db.insert(chats).values({
      fileKey : file_key,
      pdfName : file_name,
      pdfUrl  : getS3Url(file_key),
      userId
    }).returning({
      insertedId : chats.id
    })

    console.log("chat_id from db : ", typeof(chat_Id[0].insertedId));
    
    return NextResponse.json({chat_id : chat_Id[0].insertedId}, {status : 200})
  } catch (error) {
    console.log("error in api/create-chat/ ", error);
    return NextResponse.json({
      error,
      status: 505,
    });
  }
}

export async function GET(req : Request) {
  const {userId} = await auth()
    return NextResponse.json({messsage : "THiis hit" , userId})
}
