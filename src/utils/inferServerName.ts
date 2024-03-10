import { basename } from "path";

export function inferServerName(path: string): string {
  if (path === ".") {
    return basename(process.cwd());
  }

  return path;
}
