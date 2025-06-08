"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="absolute w-full p-3 flex justify-between items-center text-white overflow-hidden">
      <div className="cursor-pointer">
        <Link className="flex items-center gap-4" href="/">
        <Image src="/logo2.ico" width={35} height={35} alt="Neura AI" />
        <h2 className="font-semibold text-lg text-black">Neura Ai</h2>
      </Link>
      </div>
    </nav>
  );
}
