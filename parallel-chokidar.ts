import chokidar from "chokidar";
import { mkdir, rm, writeFile } from "fs/promises";
import { setTimeout } from "timers/promises";

if (process.argv[2] === undefined) {
  throw new Error("Please provide the number of directories to watch as a command-line argument");
}
const dirCount = parseInt(process.argv[2], 10);

let addEventCount = 0;

async function watchDirectory(dir: string) {
  const { promise, resolve } = Promise.withResolvers<void>();
  const watcher = chokidar
    .watch(dir, {
      ignoreInitial: true,
    })
    .on("add", (fileName) => {
      addEventCount++;
      console.log(`File ${fileName} has been added`);
    })
    .on("ready", () => resolve());
  await promise;
  return watcher;
}

// Prepare directories
await rm("demo", { recursive: true, force: true });
for (let i = 0; i < dirCount; i++) {
  await mkdir(`demo/dir-${i}`, { recursive: true });
}

// Watch directories and create files
const promises: Promise<void>[] = [];
for (let i = 0; i < dirCount; i++) {
  promises.push((async () => {
    await mkdir(`demo/dir-${i}`, { recursive: true });
    const watcher = await watchDirectory(`demo/dir-${i}`);
    await writeFile(`demo/dir-${i}/file.txt`, "Hello, World!");
    await setTimeout(1000); // Wait for events to be processed
    await watcher.close();
  })());
}
await Promise.all(promises);

console.log(`add event count: ${addEventCount}`);
