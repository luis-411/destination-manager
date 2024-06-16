import {capitalize} from "lodash";

function convertShortMonthToLong(shortMonth) {
  const date = new Date(`${capitalize(shortMonth)} 1, 2000`);
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
}

export default convertShortMonthToLong;