import { logger } from "~/utils/logger.js";
import ora from "ora";
import chalk from "chalk";
import { inferServerName } from "~/utils/inferServerName.js";

export function logNextSteps(path: string) {
  const serverName = inferServerName(path);
  ora().succeed(
    chalk.cyan(serverName) + chalk.green(" created successfully!\n"),
  );

  logger.info("Next steps:");

  if (path !== ".") {
    logger.info(`  cd ${path.replaceAll(" ", "\\ ")}`);
  }

  switch (process.platform) {
    case "darwin":
      logger.info("  chmod +x ./start.command");
      logger.info("  ./start.command");
      break;
    case "win32":
      logger.info("  ./start.bat");
      break;
    default:
      logger.info("  chmod +x ./start.sh");
      logger.info("  ./start.sh");
      break;
  }
}
