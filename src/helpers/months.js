import {capitalize} from "lodash";

export function convertShortMonthToLong(shortMonth) {
  const date = new Date(`${capitalize(shortMonth)} 1, 2000`);
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
}

export function getShortMonths() {
  return Array.from({ length: 12 })
    .fill(0)
    .map((_, idx) => numberToShortMonth(idx + 1))
}

/**
 *
 * @param {Number} number
 * @return {String}
 */
export function numberToShortMonth(number) {
  const date = new Date(`${number} 01 2000`);
  return (new Intl.DateTimeFormat('en-US', { month: 'short' })
    .format(date))
    .toLowerCase();
}