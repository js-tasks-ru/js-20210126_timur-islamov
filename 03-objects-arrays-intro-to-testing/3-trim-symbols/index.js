/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0 || string === '') {
    return '';
  }

  let trimmedString = string[0];
  let count = 1;

  for (let i = 1; i < string.length; i++) {
    if (string[i] === trimmedString[trimmedString.length - 1]) {
      if (count === size) {
        continue;
      } else {
        trimmedString += string[i];
        count += 1;
      }
    } else {
      count = 1;
      trimmedString += string[i];
    }
  }

  return trimmedString;
}

