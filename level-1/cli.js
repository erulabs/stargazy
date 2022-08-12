#!/usr/bin/env node

// Use me like:
// ./level-1/cli.js level-1/small.in

const fs = require("fs");
const { printer } = require("./brokenpipe");
const { readSmallFile } = require("./fs");

if (process.argv[2] && fs.statSync(process.argv[2])) {
  const smallIn = readSmallFile(process.argv[2]);
  const cases = smallIn.shift();
  for (let i = 0; i < parseInt(cases, 10); i++) {
    const [p, f, g, I] = smallIn[i].split(" ").map((n) => parseInt(n, 10));
    const caseNumber = i + 1;
    process.stdout.write(`${printer(caseNumber, p, f, g, I)}\n`);
  }
} else {
  console.error(`No such file "${process.argv[2] || ""}"`);
}
