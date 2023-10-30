import * as fs from "fs";

export class Console {
  static log(...message: any) {
    const stack = new Error().stack;
    if (stack) {
      const callerInfo = stack.split("\n")[2].match(/\(([^)]+)\)/);
      if (callerInfo && callerInfo.length > 1) {
        const fileInfo = callerInfo[1].split("\\").slice(-1)[0];

        console.log("\x1b[30m" + fileInfo + "\x1b[0m" + " |", ...message);
        printBorder();
      } else {
        const lines = stack.split("\n");

        if (lines.length > 0) {
          const callerInfo = lines[2].match(
            /at\s(.*?)(?: \((.*?)(:.*?:.*?)\)| (.*?)(:.*?:.*?))$/
          );

          if (callerInfo) {
            const fileInfoWithFullPath = callerInfo[0] || callerInfo[1];
            const fileInfo = fileInfoWithFullPath.split("\\").slice(-1)[0]; // Extract only the file name

            console.log("\x1b[30m" + fileInfo + "\x1b[0m" + " |", ...message);
            printBorder();
            return;
          } else {
            console.log(...message);
          }
        }
      }
    } else {
      console.log(...message);
    }
  }
}
export class splash {
  static message(port: string | number) {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", (key) => {
      const keyStr = key.toString();
      if (keyStr == "c" || keyStr == "C") {
        console.clear();

        // printMessage(config.port);
      }
      if (keyStr == "p" || keyStr == "P") {
        listInstalledPackages();
      }
      if (keyStr == "q" || keyStr == "Q" || keyStr === "\u0003") {
        console.log(" \x1b[1;31mPress CTRL + C to exit");
        process.stdin.setRawMode(false);
      }
    });
    console.log(`
    \x1b[1;30m              
▒█▀▀█ 　 ▒█▀▀▀ 　 ▒█░░▒█ 　 ▒█▀▀▄ 　 ▒█▀▀▀█ 
▒█▄▄█ 　 ▒█▀▀▀ 　 ▒█▒█▒█ 　 ▒█░▒█ 　 ░▀▀▀▄▄ 
▒█░░░ 　 ▒█▄▄▄ 　 ▒█▄▀▄█ 　 ▒█▄▄▀ 　 ▒█▄▄▄█ \x1b[0m`);
    const link = `\x1b[1;34mhttp://localhost:${port}\x1b[0m`;

    console.log(`\n \n \x1b[1;32m ➜ \x1b[1;31m Local:   ${link}`);

    console.log(` 
  \x1b[30m -press\x1b[1;37m c \x1b[30mto clear console
  \x1b[30m -press\x1b[1;37m p \x1b[30mto see all the installed packages \x1b[0m
  \x1b[30m -press\x1b[1;37m q \x1b[30mto quit \x1b[0m

    `);
  }
}

const printBorder = () => {
  console.log("\x1b[30m" + "-".repeat(60));
};
const listInstalledPackages = () => {
  try {
    const packageJsonContent = fs.readFileSync("package.json", "utf8");
    const packageJson = JSON.parse(packageJsonContent);

    const dependencies = packageJson.dependencies;
    const devDependencies = packageJson.devDependencies;

    console.log("List of installed packages:");

    if (dependencies) {
      console.log("Regular dependencies:");
      for (const packageName in dependencies) {
        console.log(`- ${packageName}`);
      }
    }

    if (devDependencies) {
      console.log("Dev dependencies:");
      for (const packageName in devDependencies) {
        console.log(`- ${packageName}`);
      }
    }
  } catch (err) {
    console.error("Error reading package.json:", err);
  }
};
