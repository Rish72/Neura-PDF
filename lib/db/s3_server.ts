import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import {Readable} from 'stream'

export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };

      const obj = await s3.getObject(params);
      const file_name = `tmp/neura-pdf-${Date.now().toString()}.pdf`;
      if (obj.Body instanceof Readable) {
        const file = fs.createWriteStream(file_name);
        file.on("open", function () {
          // @ts-expect-error // v3 has some issue
          obj.Body?.pipe(file).on("finish", () => {
            return resolve(file_name);
          });
        });
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
//downloadFromS3(URL)