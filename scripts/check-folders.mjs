// Every top-level folder is an app, named by its Android package name (the Tauri identifier).
// Rules (Android applicationId / Java package): two or more segments separated by "."; each
// segment starts with a letter and holds only ASCII letters, digits and "_"; no Java keyword.
// usage: node scripts/check-folders.mjs [root]   (exit 1 and list the bad names on failure)
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const JAVA_KEYWORDS = new Set(("abstract assert boolean break byte case catch char class const continue default do double else enum " +
  "extends final finally float for goto if implements import instanceof int interface long native new package private protected " +
  "public return short static strictfp super switch synchronized this throw throws transient try void volatile while " +
  "true false null _ var yield record sealed permits non-sealed").split(" "));
// Repository files and folders that are not apps.
export const NOT_APPS = new Set(["scripts"]);

export function packageNameProblem(name) {
  const segments = name.split(".");
  if (segments.length < 2) return "needs at least two segments";
  for (const seg of segments) {
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(seg)) return `segment "${seg}" must start with a letter and hold only letters, digits and _`;
    if (JAVA_KEYWORDS.has(seg)) return `segment "${seg}" is a Java keyword`;
  }
  return null;
}

export function folderProblems(root) {
  return readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !NOT_APPS.has(e.name))
    .map((e) => ({ name: e.name, problem: packageNameProblem(e.name) }))
    .filter((r) => r.problem);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
  const bad = folderProblems(root);
  for (const b of bad) console.error(`not an Android package name: ${b.name} (${b.problem})`);
  if (bad.length) process.exit(1);
  console.log("app folders: all valid Android package names");
}
