import React from 'react'

type Props = {
    pdf_url : string
}

const PDFViewer = ({pdf_url}: Props) => {
    const docs_url = `https://docs.google.com/gview?url=${pdf_url}&embedded=true`
    
  return (
    <iframe className='w-full h-full' src={docs_url}>

    </iframe>
  )
}

export default PDFViewer