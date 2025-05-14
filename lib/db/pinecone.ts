import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3_server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import md5 from "md5";

import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "../embedding";
import { converToAscii } from "../utils";

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

  // 2. splits and segmentation of pdf
  const documents = await Promise.all(pages.map(prepareDocument));
  // console.log(documents);

  // 3. vectorise and embed individuals documents/
  const vectors = await Promise.all(documents.flat().map(embedDocument))

  // 4. upload to pinecone

  const client = await getPineconeClient();
  const pineconeIndex = await client.index("neura-chat-pdf")

  const namespace = pineconeIndex.namespace(converToAscii(fileKey))
  
  console.log("inserting into pinecone");
  namespace.upsert(vectors)
  
  return documents[0];
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent)
    console.log("em");
    
    const hash = md5(doc.pageContent)

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("Error while embedding documents : ", error);
    throw error;
  }
}

async function prepareDocument(pdfpage: PDFPage) {
  let { pageContent, metadata } = pdfpage;
  pageContent = pageContent.replace(/\n/g, "");

  //split the do
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
