export class console {
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
const printBorder = () => {
  console.log("\x1b[30m" + "-".repeat(60));
};
