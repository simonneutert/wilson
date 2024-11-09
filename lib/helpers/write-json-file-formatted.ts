import { ensureFileSync } from "@std/fs";

/** Write JSON data to a file with pretty formatting. */
export default async function writeJsonFile(
  filename: string,
  data: object,
): Promise<void> {
  const dataStr = JSON.stringify(data, null, 2);
  ensureFileSync(filename);
  await Deno.writeTextFile(filename, dataStr);
}
