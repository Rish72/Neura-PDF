"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import axios from "axios";

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chats", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log("file accepted : ", acceptedFiles);
      const file = acceptedFiles[0];

      if (file.size > 10 * 1024 * 1024) {
        toast.error("Upload smaller file then 10MB");
      }

      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data?.file_name) {
          toast.error("Something went wrong while uploading");
          return;
        } else {
          mutate(data, {
            onSuccess: (data) => {
              toast.success(data.message)
            },
            onError: (err) => {
              toast.error("Something went wrong while mutating");
              console.log("Eroor from mutate ", err);
            },
          });
        }
        console.log("data : ", data);
      } catch (error) {
        console.log("Error in fileUpload : ", error);
      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl ">
      <div
        {...getRootProps({
          className:
            "border-dotted border-2 bg-gray-50 py-8 rounded-xl cursor-pointer flex justify-center items-center flex-col",
        })}
      >
        <input type="file" {...getInputProps()} />
        {uploading || isPending ? (
          <>
           <Loader2 className="h-10 w-10 text-blue-500 animate-spin"/>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop your PDF here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
