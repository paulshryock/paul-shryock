const test = "climbing, oranges, jumping, flying, carrot";
const regex = /([a-z]*)ing/g;
const matches = [...test.matchAll(regex)];
export const result = matches.map(match => match[1]);
