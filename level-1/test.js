const { expect } = require("chai");
const { brokenpipe, printer } = require("./brokenpipe");
const { readSmallFile } = require("./fs");

const describe = global.describe;
const it = global.it;

describe("leak_floor", () => {
  it("Returns the floor a leak occurred on given details about the leak (example tests)", () => {
    expect(brokenpipe(3, 1, 10, 2)).to.equal(3);
    expect(brokenpipe(5, 0, 10, 0)).to.equal(5);
    expect(brokenpipe(8, 12, 20, 7)).to.equal(12);
  });
  it("has a 'printer' helper util", () => {
    expect(printer(5, 3, 1, 10, 2)).to.equal(`Case #5: 3`);
  });
  it("Returns the floor a leak occurred on given details about the leak (small.in)", () => {
    const smallIn = readSmallFile("level-1/small.in");
    const smallOut = readSmallFile("level-1/small.out");
    const cases = smallIn.shift();
    for (let i = 0; i < parseInt(cases, 10); i++) {
      const [p, f, g, I] = smallIn[i].split(" ").map((n) => parseInt(n, 10));
      const caseNumber = i + 1;
      expect(
        printer(caseNumber, p, f, g, I),
        `printer(${caseNumber}, ${p}, ${f}, ${g}, ${I})`
      ).to.equal(smallOut[i]);
    }
  });
});
