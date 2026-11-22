import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtempSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { folderProblems, packageNameProblem } from "./check-folders.mjs";

test("valid Android package names pass", () => {
  for (const n of ["network.itonami.koukokuscout", "network.awai.itonami.market", "cloud.itonami.manabi_cert_prep", "a.b", "Com.Example2"]) {
    assert.equal(packageNameProblem(n), null, n);
  }
});

test("invalid names are rejected", () => {
  for (const n of ["itonami-market-android", "koukokuscout", "network.itonami.", ".network.itonami", "network.1app", "network.it-onami",
    "network.itonami.class", "network._x", "cloud.itonami.manabi-cert-prep", "network.itonamí"]) {
    assert.ok(packageNameProblem(n), n);
  }
});

test("the folder check ignores dot folders and scripts, and lists bad app folders", () => {
  const root = mkdtempSync(path.join(tmpdir(), "disclosures-"));
  for (const d of [".github", "scripts", "network.itonami.koukokuscout", "itonami-market-android"]) mkdirSync(path.join(root, d));
  assert.deepEqual(folderProblems(root).map((r) => r.name), ["itonami-market-android"]);
});
