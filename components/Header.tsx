"use client"
import { UserButton } from "@clerk/nextjs";
import React from "react";
import {motion} from "motion/react"

const Header = () => {
  return (
    <motion.div 
    initial={{
        y : 10,
        opacity : 0
    }}
    animate ={{
        y : 0,
        opacity : 1
    }}
    transition={{
        duration : 0.5,
        delay : 0.2
    }}
    className="flex items-center flex-col">
      <div className="flex items-center gap-2 mt-3">
        <h1 className="mr-3 text-6xl font-bold mb-4 text-white">Neura Ai</h1>
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
    </motion.div>
  );
};

export default Header;
