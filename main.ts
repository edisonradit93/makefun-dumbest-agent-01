import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { getDumbestMoment, validateLine } from "./story.ts";

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = validateLine(getDumbestMoment());
  const payload = Buffer.from(line, "utf8");
  const expectedSha256 = crypto.createHash("sha256").update(payload).digest("hex");

  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "entry.txt");
  fs.writeFileSync(outputPath, payload);

  const written = fs.readFileSync(outputPath);
  const actualSha256 = crypto.createHash("sha256").update(written).digest("hex");
  if (actualSha256 !== expectedSha256) {
    throw new Error(`SHA-256 mismatch: expected ${expectedSha256}, got ${actualSha256}`);
  }

  console.log(`Wrote entry to ${outputPath}`);
  console.log(`Length: ${line.length} chars, ${written.byteLength} UTF-8 bytes`);
  console.log(`SHA-256 verified: ${actualSha256}`);
}

main();
