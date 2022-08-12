#!/usr/bin/env node

// Use me like:
// ./level-1/cli.js level-1/small.in

const fs = require("fs");
const { printer } = require("./newspayper");
const { readSmallFile } = require("./fs");

if (process.argv[2] && fs.statSync(process.argv[2])) {
  const smallIn = readSmallFile(process.argv[2]);
  const cases = smallIn.shift();
  for (let i = 0; i < parseInt(cases, 10); i++) {
    const caseNumber = i + 1;
    process.stdout.write(`${printer(caseNumber, smallIn[i])}\n`);
  }
} else {
  console.error(`No such file "${process.argv[2] || ""}"`);
}
