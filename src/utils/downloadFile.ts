import { type BinaryLike, createHash } from "crypto";
import * as fs from "fs";
import { type IncomingMessage } from "http";
import * as https from "https";

export async function downloadFile(
  path: string,
  fileName: string,
  url: string,
  expectedHash: string,
) {
  try {
    const response = await new Promise<IncomingMessage>((resolve, reject) => {
      https.get(url, resolve).on("error", reject);
    });

    const { statusCode, statusMessage } = response;
    if (statusCode !== 200) {
      throw new Error(`Got bad response: ${statusCode} ${statusMessage}`);
    }

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    const fileStream = fs.createWriteStream(`${path}/${fileName}`);
    const hash = createHash("sha256");

    response.on("data", (chunk) => {
      hash.update(chunk as BinaryLike);
    });

    response.pipe(fileStream);

    return new Promise<void>((resolve, reject) => {
      fileStream.on("finish", () => {
        fileStream.close();

        const downloadedHash = hash.digest("hex");
        if (downloadedHash !== expectedHash) {
          fs.unlinkSync(`${path}/${fileName}`);
          reject(new Error(`File hash mismatch`));
        }

        resolve();
      });

      fileStream.on("error", reject);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(message);
  }
}
