const { expect } = require("chai");
const { newspayper, printer } = require("./newspayper");
const { readSmallFile } = require("./fs");

const describe = global.describe;
const it = global.it;

describe("newspayper", () => {
  it("Returns how much the newspaper should pay per article of text", () => {
    expect(newspayper("-.5 + power(2, 10)")).to.equal(39);
    expect(newspayper("2^10")).to.equal(0);
    expect(
      newspayper(`md5(("I'm \\"quoted\\" with \\\\" # 25).encode())`)
    ).to.equal(53);
  });
  it("has a 'printer' helper util", () => {
    expect(printer(5, "2^10")).to.equal(`Case #5: 0`);
  });
  it("Returns the floor a leak occurred on given details about the leak (small.in)", () => {
    const smallIn = readSmallFile("level-3/small.in");
    const smallOut = readSmallFile("level-3/small.out");
    const cases = smallIn.shift();
    for (let i = 0; i < parseInt(cases, 10); i++) {
      const caseNumber = i + 1;
      expect(
        printer(caseNumber, smallIn[i]),
        `printer(${caseNumber}, "${smallIn[i]}")`
      ).to.equal(smallOut[i]);
    }
  });
});
