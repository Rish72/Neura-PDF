import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {

  const {userId} = await auth()
  const isAuth = !! userId

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-indigo-200 to-yellow-100">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center text-center" id="main">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">
                Neura PDF AI
            </h1>
            <UserButton />
          </div>

          <div className="flex mt-2">
            {isAuth && <Button>Go to Chats</Button>}
          </div>

          <p className="max-w-xl mt-2 text-lg text-slate-600 ">
            Tired of skimming? Neura turns dense PDFs into conversational partners—students, researchers, and pros get instant answers, crisp summaries, and cited insights.
          </p>

          <div className="w-full mt-4">
            {isAuth ? (<h1>File Upload</h1>) : (
              <Link href='/sign-in'>
                <Button>Login to get started
                  <LogIn />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
