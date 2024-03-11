import { changeFilePermissions } from "~/utils/changeFilePermissions.js";
import { writeFile } from "~/utils/writeFile.js";

const aikarFlags =
  "-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true ";

function getJavaCommand(
  serverFileName: string,
  memory: string,
  useAikarFlags: boolean,
): string {
  let javaCommand = `java -Xms${memory} -Xmx${memory} `;

  if (useAikarFlags) {
    javaCommand += aikarFlags;
  }

  javaCommand += `-jar ${serverFileName}`;
  return javaCommand;
}

export async function createStartScripts(
  path: string,
  serverFileName: string,
  memory: string,
  useAikarFlags: boolean,
) {
  const javaCommand = getJavaCommand(serverFileName, memory, useAikarFlags);
  const platform = process.platform;

  switch (platform) {
    case "darwin":
      const commandPath = `${path}/start.command`;
      await writeFile(
        commandPath,
        `#!/bin/sh\ncd "$(dirname "$0")"\nexec ${javaCommand}`,
      );
      await changeFilePermissions(commandPath, 0o755);
      break;
    case "win32":
      const batPath = `${path}/start.bat`;
      await writeFile(batPath, `@echo off\n${javaCommand}\npause`);
      break;
    default:
      const shPath = `${path}/start.sh`;
      await writeFile(shPath, `#!/bin/sh\n${javaCommand}`);
      await changeFilePermissions(shPath, 0o755);
      break;
  }
}
