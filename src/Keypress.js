const keypress = require('keypress');
const Data_Maybe = require("../Data.Maybe")

const maybe = (v) => v ? Data_Maybe.Just.create(v) : Data_Maybe.Nothing.value;

keypress(process.stdin);
process.stdin.setRawMode(true);

exports.keypressImpl = () => () => {
  process.stdin.resume();
  return new Promise((resolve) => {
    process.stdin.once('keypress', (ch, key) => {
      const ret = {
        key: maybe(key),
        ch: maybe(ch),
      }
      resolve(ret);
    });
  }).finally(() => {
    process.stdin.pause();
  });
};
