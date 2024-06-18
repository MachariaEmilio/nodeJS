import { fileURLToPath } from "node:url";

import path from "node:path";
import fs from "node:fs/promises";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const read_data = JSON.parse(
  await fs.readFile(path.join(__dirname, "../database/eventsData.json"))
);
