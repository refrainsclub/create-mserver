import * as p from "@clack/prompts";
import { type Version } from "~/utils/serverVersions.js";

interface CliResults {
  path: string;
  version: Version;
  memory: string;
  useAikarFlags: boolean;
}

const pathRegex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const memoryRegex = /^[0-9]+[MG]$/;

export async function runCli(): Promise<CliResults> {
  const server = await p.group(
    {
      path: () =>
        p.text({
          message: "What will your server be called?",
          validate(value) {
            if (value === ".") {
              return;
            }

            if (value.endsWith("/")) {
              return "No trailing slashes";
            }

            if (!pathRegex.test(value)) {
              return "Invalid server name";
            }

            return;
          },
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
          validate(value) {
            if (!memoryRegex.test(value)) {
              return "Enter a valid amount of memory!";
            }

            return;
          },
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
    path: server.path,
    version: server.version as Version,
    memory: server.memory,
    useAikarFlags: server.useAikarFlags === "yes",
  };
}
