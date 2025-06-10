import React from "react";
import Image from "next/image"; // Make sure this import is here
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
// import { UserButton } from "@clerk/nextjs";
import ImageComponent from "@/components/ImageComponent";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import Header from "@/components/Header";
import * as motion from "motion/react-client"

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
          <Header />
          <motion.div initial={{
            y : 15,
            opacity : 0,
          }}
          animate={{
            y: 0, 
            opacity : 1
          }}  
          transition={{
            delay : 0.8,
            duration: 0.5
          }}
          className="flex mt-2">
            {isAuth && (
              <Link href={`/chat/${firstChat?.id}`}>
                <Button className="shadow-xl shadow-gray-700/10 mb-3 text-white cursor-pointer">
                  Go to Chats
                </Button>
              </Link>
            )}
          </motion.div>

          <motion.p  initial={{
            y : 15,
            opacity : 0,
          }}
          animate={{
            y: 0, 
            opacity : 1
          }} 
          transition={{
            delay : 0.8,
            duration: 0.5
          }}
          className="max-w-2xl mt-2 text-[1rem]/6 text-slate-200">
            Tired of skimming? Neura helps students, researchers, and pros chat
            with PDFs for instant answers, crisp summaries, and cited insights.
          </motion.p>

          <motion.div initial={{
            y : 15,
            opacity : 0,
          }}
          animate={{
            y: 0, 
            opacity : 1
          }} 
          transition={{
            delay : 0.8,
            duration: 0.5
          }}
          className="w-lg mt-4" >
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
          </motion.div>
        </div>
      </div>
      <ImageComponent />
    </div>
  );
}
