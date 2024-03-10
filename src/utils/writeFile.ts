import * as fs from "fs";

export function writeFile(path: string, content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
