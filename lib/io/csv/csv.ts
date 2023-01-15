import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import { resolve } from "path";

export const readCsv = (filepath: string) => {
  const fullpath = resolve(process.cwd(), filepath);

  return parse(readFileSync(fullpath, { encoding: "utf-8" }), {
    columns: true,
    skip_empty_lines: true,
  });
};
