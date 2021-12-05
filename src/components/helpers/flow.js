// Stole this from https://github.com/lodash/lodash/blob/4ea8c2ec249be046a0f4ae32539d652194caf74f/flow.js#L29 bc I didn't wanna install the lib just to use this function :)

function flow(funcs) {
  const length = funcs ? funcs.length : 0;
  let index = length;
  while (index--) {
    if (typeof funcs[index] != "function") {
      throw new TypeError("Expected a function");
    }
  }
  return function (...args) {
    let index = 0;
    let result = length ? funcs[index].apply(this, args) : args[0];
    while (++index < length) {
      result = funcs[index].call(this, result);
    }
    return result;
  };
}

export default flow;
