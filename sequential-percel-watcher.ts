import watcher from "@parcel/watcher";
import { mkdir, rm, writeFile } from "fs/promises";
import { setTimeout } from "timers/promises";

let count = 0;

async function watchDirectory(dir: string) {
  const subscription = await watcher.subscribe(dir, (err, events) => {
    if (err) {
      console.error("Watcher error:", err);
      return;
    }
    for (const event of events) {
      if (event.type === 'create') {
        count++;
        console.log(`File ${event.path} has been added`);
      }
    }
  });
  return subscription;
}

await rm("dir", { recursive: true, force: true });
await mkdir("dir", { recursive: true });
const subscription = await watchDirectory("dir");
const promises: Promise<void>[] = [];
for (let i = 0; i < 100; i++) {
  promises.push(writeFile(`dir/file-${i}.txt`, "Hello, World!"));
}
await Promise.all(promises);
await setTimeout(1000);
await subscription.unsubscribe();

console.log(`add event count: ${count}`);
