const fs = require("fs");

const readSmallFile = (p) =>
  fs
    .readFileSync(p)
    .toString("ascii")
    .replace(/\r\n/g, "\n")
    .trim()
    .split("\n");

module.exports = { readSmallFile };
