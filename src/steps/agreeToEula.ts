import { writeFile } from "~/utils/writeFile.js";

export async function agreeToEula(path: string) {
  await writeFile(`${path}/eula.txt`, "eula=true");
}
