import { SignIn } from "@clerk/nextjs"


const Page = () => {
     return (
        <div className="flex flex-col h-screen justify-center items-center">
          <SignIn />
        </div>
      );
}

export default Page