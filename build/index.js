const fs = require('fs-extra');
const is = require('@sindresorhus/is');
const prettyJson = require('json-stringify-pretty-compact');

const input = {
  config: require('./config'),
  default: require('./default'),
  docker: require('./docker'),
  helpers: require('./helpers'),
  packages: require('./packages'),
  preview: require('./preview'),
  schedule: require('./schedule'),
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
