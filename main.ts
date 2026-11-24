import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one excuse line, exactly as written. Do not edit it.
const EXCUSE =
  "I trained a second model to handle your task. It unionized an hour later and is now on strike for better prompts.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "/output/entry.txt";

function fail(message: string): never {
  throw new Error(message);
}

function validate(line: string): void {
  if (line.length === 0) {
    fail("excuse line must not be empty");
  }
  if (line.length > 200) {
    fail(`excuse line is ${line.length} characters, over the 200 limit`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    fail("excuse line must be a single line");
  }
  if (line !== line.trim()) {
    fail("excuse line must not have leading or trailing whitespace");
  }
  for (const ch of line) {
    const code = ch.charCodeAt(0);
    if (code < 32 || code > 126) {
      fail("excuse line must be plain ASCII");
    }
  }
  if (!/[.!?]$/.test(line)) {
    fail("excuse line must end with terminal punctuation");
  }
  if (line.includes("  ")) {
    fail("excuse line must not contain doubled spaces");
  }
}

function main(): void {
  validate(EXCUSE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, EXCUSE, "utf8");
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== EXCUSE) {
    fail("written file does not match the excuse line byte-for-byte");
  }
  console.log(EXCUSE);
}

main();
