import React from "react";
import Image from "next/image"; // Make sure this import is here
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { UserButton } from "@clerk/nextjs";
import ImageComponent from "@/components/ImageComponent";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <div className="relative w-full min-h-full">
      <Image
        src="/background.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      <NavBar />

      <div className="relative z-20 flex flex-col justify-center items-center h-screen p-3">
        <div className="flex flex-col items-center mt-5 text-center" id="main">
          <div className="flex items-center flex-col">
            <div className="flex items-center gap-2 mt-3">
              <h1 className="mr-3 text-6xl font-bold mb-4 text-white">
                Neura Ai
              </h1>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "2.5rem",
                      height: "2.5rem",
                    },
                  },
                }}
              />
            </div>
            <h1 className="mr-3 text-6xl font-bold mb-4 text-white">
              Query, Discover, Smart, Content.
            </h1>
          </div>
          <div className="flex mt-2">
            {isAuth && (
              <Link href={`/chat/${firstChat?.id}`}>
                <Button className="shadow-xl shadow-gray-700/10 mb-3 text-white cursor-pointer">
                  Go to Chats
                </Button>
              </Link>
            )}
          </div>

          <p className="max-w-2xl mt-2 text-[1rem]/6 text-slate-200">
            Tired of skimming? Neura helps students, researchers, and pros chat
            with PDFs for instant answers, crisp summaries, and cited insights.
          </p>

          <div className="w-lg mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button className="shadow-xl shadow-gray-700/10 mb-3 text-white">
                  Login to get started
                  <LogIn />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ImageComponent />
    </div>
  );
}
