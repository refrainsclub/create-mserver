import * as p from "@clack/prompts";
import { type Version } from "~/utils/serverVersions.js";
import { validateMemory } from "~/utils/validateMemory.js";
import { validateName } from "~/utils/validateName.js";

interface CliResults {
  path: string;
  version: Version;
  memory: string;
  useAikarFlags: boolean;
}

export async function runCli(): Promise<CliResults> {
  const server = await p.group(
    {
      name: () =>
        p.text({
          message: "What will your server be called?",
          validate: validateName,
        }),
      version: () =>
        p.select({
          message: "Select a server version.",
          options: [
            { value: "1.20.4", label: "1.20.4", hint: "latest" },
            { value: "1.12.2", label: "1.12.2" },
            { value: "1.8.8", label: "1.8.8" },
          ],
          initialValue: "1.20.4",
        }),
      memory: () =>
        p.text({
          message: "How much memory to allocate?",
          initialValue: "2G",
          validate: validateMemory,
        }),
      useAikarFlags: () =>
        p.select({
          message: "Would you like to use Aikar's Flags?",
          options: [
            { value: "yes", label: "Yes", hint: "recommended" },
            { value: "no", label: "No" },
          ],
          initialValue: "yes",
        }),
    },
    {
      onCancel() {
        process.exit(1);
      },
    },
  );

  console.log();

  return {
    path: server.name,
    version: server.version as Version,
    memory: server.memory,
    useAikarFlags: server.useAikarFlags === "yes",
  };
}
