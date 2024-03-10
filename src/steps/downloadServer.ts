import { downloadFile } from "~/utils/downloadFile.js";
import {
  type Version,
  getUrl,
  getVersionInfo,
} from "~/utils/serverVersions.js";
import ora from "ora";
import chalk from "chalk";
import { logger } from "~/utils/logger.js";

export async function downloadServer(
  path: string,
  fileName: string,
  version: Version,
) {
  logger.info("Downloading server...");
  const { build, hash } = getVersionInfo(version);
  const url = getUrl(version, build);

  const spinner = ora(`Downloading file from ${url}`).start();
  await downloadFile(path, fileName, url, hash);

  spinner.succeed(chalk.green("Successfully downloaded!\n"));
}
