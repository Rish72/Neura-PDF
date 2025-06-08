
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import React from 'react'

const ImageComponent = async () => {
      const { userId } = await auth();
      const isAuth = !!userId;
  return (
    <div className={`w-full flex justify-center ${isAuth ? 'mt-[-6rem]' : 'mt-[-9rem]'} pb-8 relative`}>
        <Image src="/image.png" alt="demo image" width="900" height="200" className="rounded-2xl outline-9 outline-slate-200/50"/>
    </div>
  )
}

export default ImageComponent