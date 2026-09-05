import {readFile, readdir} from "node:fs/promises";
import {basename, extname, resolve} from "node:path";

import {validateCatalogs} from "./message-validation.mjs";

const messagesDirectory = resolve("messages");
const files = (await readdir(messagesDirectory)).filter((file) => extname(file) === ".json");
const catalogs = Object.fromEntries(
  await Promise.all(files.map(async (file) => [basename(file, ".json"), JSON.parse(await readFile(resolve(messagesDirectory, file), "utf8"))]))
);

validateCatalogs(catalogs, "es");
console.log(`Validated ${files.length} message catalog(s).`);
