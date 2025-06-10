'use client'
import React from 'react'
import {motion} from "motion/react"
type Props = {
    pdf_url : string
}

const PDFViewer = ({pdf_url}: Props) => {
    const docs_url = `https://docs.google.com/gview?url=${pdf_url}&embedded=true`
    
  return (
    <motion.iframe initial={{filter : "blue(10px"}} animate={{filter : "blue(0px)"}} transition={{delay : 2, duration : 0.7}}  className='w-full h-full' src={docs_url}>

    </motion.iframe>
  )
}

export default PDFViewer