"use client"
import { uploadToS3 } from "@/lib/s3";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept : {'application/pdf' : [".pdf"]},
    maxFiles : 1,
    onDrop : async (acceptedFiles) => {
        console.log("file accepted : ",acceptedFiles); 
        const file = acceptedFiles[0];

        if(file.size > 10*1024*1024){
          alert("Upload smaller file then 10MB")
        }

        try {
          const data = await uploadToS3(file)
          console.log("data : ", data);
          
        } catch (error) {
          console.log("Error in fileUpload : ", error)
        }
    }
  });
  return (
    <div className="p-2 bg-white rounded-xl ">
      <div
        {...getRootProps({
          className : "border-dotted border-2 bg-gray-50 py-8 rounded-xl cursor-pointer flex justify-center items-center flex-col",
        })}
      >
        <input type="file" {...getInputProps()} />

        <>
            <Inbox className="w-10 h-10 text-blue-500"/>
            <p className="mt-2 text-sm text-slate-400">Drop your PDF here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
