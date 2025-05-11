import { NextResponse } from "next/server";


export async function POST (req : Request, res : Response){
    try {
        
    } catch (error) {
        console.log("error in api/create-chat/ ", error)
        return NextResponse.json({
            error ,
            "status" : 505
        })
    }
} 