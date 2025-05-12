import { load_S3Into_Pinecone } from "@/lib/db/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_name, file_key } = body;
    console.log(
      "From post method of create-chats ",
      file_key + " " + file_name
    );

    const pages = await load_S3Into_Pinecone(file_key)

    return NextResponse.json({pages})
  } catch (error) {
    console.log("error in api/create-chat/ ", error);
    return NextResponse.json({
      error,
      status: 505,
    });
  }
}
