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
const promises: Promise<void>[] = [];
for (let i = 0; i < 100; i++) {
  promises.push((async () => {
    await mkdir(`dir/dir-${i}`, { recursive: true });
    const subscription = await watchDirectory(`dir/dir-${i}`);
    await writeFile(`dir/dir-${i}/file.txt`, "Hello, World!");
    await setTimeout(1000);
    await subscription.unsubscribe();
  })());
}
await Promise.all(promises);

console.log(`add event count: ${count}`);
