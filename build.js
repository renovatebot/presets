const fs = require('fs-extra');
const is = require('@sindresorhus/is');
const prettyJson = require('json-stringify-pretty-compact');

/* eslint-disable global-require */
const input = {
  config: require('./src/config'),
  default: require('./src/default'),
  docker: require('./src/docker'),
  group: require('./src/group'),
  helpers: require('./src/helpers'),
  monorepo: require('./src/monorepo'),
  packages: require('./src/packages'),
  preview: require('./src/preview'),
  schedule: require('./src/schedule'),
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
