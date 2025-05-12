import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3_server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function load_S3Into_Pinecone(fileKey: string) {
    //1. obtain pdf -> donwload and read from pdf
    console.log("downloading s3 into file");
    const file_name = await downloadFromS3(fileKey);
    if (!file_name) {
        throw new Error("could not download from s3");
    }
    console.log("loading pdf into memory" + file_name);

    const loader = new PDFLoader(file_name);
    const pages = (await loader.load()) as PDFPage[];
    return pages;

}
