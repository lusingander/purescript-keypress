const keypress = require('keypress');

const maybe = (v, just, nothing) => v ? just(v) : nothing;

keypress(process.stdin);
process.stdin.setRawMode(true);

exports.keypressImpl = (just) => (nothing) => () => () => {
  process.stdin.resume();
  return new Promise((resolve) => {
    process.stdin.once('keypress', (ch, key) => {
      const ret = {
        key: maybe(key, just, nothing),
        ch: maybe(ch, just, nothing),
      }
      resolve(ret);
    });
  }).finally(() => {
    process.stdin.pause();
  });
};