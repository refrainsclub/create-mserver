import * as fs from "fs";

export async function changeFilePermissions(
  path: fs.PathLike,
  mode: fs.Mode,
): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.chmod(path, mode, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
