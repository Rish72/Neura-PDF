import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function converToAscii(inputString : string){
  // convert non ascii character
  const asciiStr = inputString.replace(/[^\x00-\x7F]/g,"");
  return asciiStr
}