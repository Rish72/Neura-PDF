"use client"
import { motion }from "motion/react"
// import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import React from 'react'

const ImageComponent =  () => {
      // const { userId } =  auth();
      // const isAuth = !!userId;
  return (
    <motion.div initial={{
      y : 10,
      opacity : 0,
    }}
    animate={{
      y : 0,
      opacity : 1,

    }}
    transition={{
      duration : 0.5,
      delay : 0.8
    }}
    className={`w-full flex justify-center mt-[-5em] pb-8 relative`}>
        <Image src="/image.png" alt="demo image" width="900" height="200" className="rounded-2xl outline-9 outline-slate-200/50"/>
    </motion.div>
  )
}

export default ImageComponent