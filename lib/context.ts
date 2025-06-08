import { Pinecone } from "@pinecone-database/pinecone";
import { converToAscii } from "./utils";
import { getEmbeddings } from "./embedding";

export async function getMatchingsFromEmbedding(
  embeddings: number[],
  fileKey: string
) {
  try {
    const client = new Pinecone({
      apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
    });

    const pineconeIndex = await client.index("neura-chat-pdf");
    const namespace = pineconeIndex.namespace(converToAscii(fileKey));

    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (error) {
    console.log("Error in contxt.ts file ", error);
    throw error;
  }
}


export async function getContext(query : string , fileKey : string){
    const queryEmbedding = await getEmbeddings(query);
  const matches = await getMatchingsFromEmbedding(queryEmbedding, fileKey);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

   const docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  // 5 vectors
  return docs.join("\n").substring(0, 3000);

}