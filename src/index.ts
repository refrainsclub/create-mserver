#!/usr/bin/env node
import { runCli } from "./cli/index.js";
import { downloadServer } from "./steps/downloadServer.js";
import { agreeToEula } from "./steps/agreeToEula.js";
import { createStartScripts } from "./steps/createStartScripts.js";
import { logNextSteps } from "./steps/logNextSteps.js";
import { renderTitle } from "./utils/renderTitle.js";

renderTitle();

const res = await runCli();

// Add a new line to space between the next section
console.log();

const serverFileName = "server.jar";

await downloadServer(res.path, serverFileName, res.version);
await agreeToEula(res.path);
await createStartScripts(
  res.path,
  serverFileName,
  res.memory,
  res.useAikarFlags,
);

logNextSteps(res.path);
