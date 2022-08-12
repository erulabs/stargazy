// We recently had a water leak, so we decided to investigate it a bit.
// We know the water pressure at the ground floor, which decreases by 1 each level you go up.
// P is the pressure of the leak
// F is the floor where the leak was reported (having 0 as ground floor)
// G is the ground floor pressure
// I is the insulation of the building.
// An insulation of I means that every level the leak goes down, its pressure is decreased by I.
/**
 * Returns the floor a leak occurred on given some details about the leak
 * @example
 * // returns 3
 * brokenpipe(3, 1, 10, 2);
 * @returns {Number} Returns the value of the floor the leak originally occurred on.
 */
const brokenpipe = (
  pressure_of_leak,
  reported_floor,
  ground_floor_pressure,
  insulation
) => {
  // No need the look above N floors, where N is the tallest floor that will have pressure at all
  const top_floor = ground_floor_pressure;
  let floorsInspected = 0;
  // For each floor between the reported floor and the top floor
  for (let f = reported_floor; f <= top_floor; f++) {
    const expected_pressure = ground_floor_pressure - f;
    if (pressure_of_leak === expected_pressure - insulation * floorsInspected++)
      return f;
  }
};

module.exports = {
  brokenpipe,
  printer: (
    case_number,
    pressure_of_leak,
    reported_floor,
    ground_floor_pressure,
    insulation
  ) => {
    return `Case #${case_number}: ${brokenpipe(
      pressure_of_leak,
      reported_floor,
      ground_floor_pressure,
      insulation
    )}`;
  },
};
