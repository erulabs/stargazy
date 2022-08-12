const payouts = {
  names: 7,
  operators: 5,
  numbers: 3,
  groupings: 4,
  strings: 2,
};

const newspayper = (str) => {
  const isAscii = /^[\x00-\x7F]*$/.test(str);
  if (!isAscii) return 0;

  const filters = {
    strings: /"(?:[^"\\]|\\.)*"/g,
    names: /[a-zA-Z_][a-zA-Z0-9_]*/g,
    numbers: /[0-9]+\.?[0-9]*|\.[0-9]/g,
    operators: /[\*\+\-\/\#\.\,\=\:\{\}\[\]]/g,
    groupings: /[\(\)]/g,
  };

  let workingStr = str;
  let payout = 0;
  for (const filter in filters) {
    const results = (workingStr.match(filters[filter]) || []).filter(Boolean);
    payout += payouts[filter] * results.length;
    // console.log(
    //   `"${str}" has ${results.length} ${filter}. Payout is ${payout}`,
    //   results
    // );
    workingStr = workingStr.replace(filters[filter], "");
  }
  const invalidBits = workingStr.replace(/\s/g, "");
  if (invalidBits) return 0;
  return payout;
};

module.exports = {
  newspayper,
  printer: (case_number, str) => `Case #${case_number}: ${newspayper(str)}`,
};
