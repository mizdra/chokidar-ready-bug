import chokidar from "chokidar";
import { mkdir, rm, writeFile } from "fs/promises";
import { setTimeout } from "timers/promises";

let count = 0;

async function watchDirectory(dir: string) {
  const { promise, resolve } = Promise.withResolvers<void>();
  const watcher = chokidar
    .watch(dir, {
      ignoreInitial: true,
    })
    .on("add", (fileName) => {
      count++;
      console.log(`File ${fileName} has been added`);
    })
    .on("ready", () => resolve());
  await promise;
  return watcher;
}

await rm("dir", { recursive: true, force: true });
await mkdir("dir", { recursive: true });
const watcher = await watchDirectory("dir");
const promises: Promise<void>[] = [];
for (let i = 0; i < 100; i++) {
  promises.push(writeFile(`dir/file-${i}.txt`, "Hello, World!"));
}
await Promise.all(promises);
await setTimeout(1000);
await watcher.close();

console.log(`add event count: ${count}`);
