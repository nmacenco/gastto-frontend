import {readdir, unlink} from "node:fs/promises";
import {resolve} from "node:path";

const directory = resolve("messages");
for (const file of await readdir(directory)) {
  if (file.endsWith(".d.json.ts")) await unlink(resolve(directory, file));
}
