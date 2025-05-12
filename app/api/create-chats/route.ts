import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_name, file_key } = body;
    console.log(
      "From post method of create-chats ",
      file_key + " " + file_name
    );
    return NextResponse.json({"message" : "Success"})
  } catch (error) {
    console.log("error in api/create-chat/ ", error);
    return NextResponse.json({
      error,
      status: 505,
    });
  }
}
