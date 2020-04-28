const fs = require('fs-extra');
const is = require('@sindresorhus/is');
const prettyJson = require('json-stringify-pretty-compact');

const input = {
  default: require('./default'),
  docker: require('./docker'),
  helpers: require('./helpers'),
};

function sort(inObj) {
  const outObj = {};
  for (const key of Object.keys(inObj).sort()) {
    const val = inObj[key];
    outObj[key] = is.object(val) && !is.array(val) ? sort(val) : val;
  }
  return outObj;
}

const output = sort(input);
fs.writeFileSync('presets.json', prettyJson(output));
