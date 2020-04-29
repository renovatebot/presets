const fs = require('fs-extra');
const is = require('@sindresorhus/is');
const { validateConfig } = require('renovate/dist/config/validation');
const { massageConfig } = require('renovate/dist/config/massage');

// This is the file we're validating
const presetsJson = JSON.parse(fs.readFileSync('presets.json', 'utf8'));

global.repoCache = {
  internalPresets: presetsJson, // This makes renovate validate this file contents and not what's on GitHub currently
};

let returnVal = 0;

// These ignoredRules container params (arguments) that fail to validate when unpopulated
const ignoredRules = ['default:group', 'default:timezone'];

(async () => {
  try {
    for (const [category, presets] of Object.entries(presetsJson)) {
      for (const [subcategory, preset] of Object.entries(presets)) {
        const name = `${category}:${subcategory}`;
        if (!ignoredRules.includes(name) && subcategory !== 'description') {
          try {
            const { warnings, errors } = await validateConfig(
              massageConfig(preset),
              true
            );
            if (is.nonEmptyArray(warnings)) {
              console.warn({ warnings }, 'Found renovate config warnings');
              returnVal = 1;
            }
            if (is.nonEmptyArray(errors)) {
              console.error({ errors }, 'Found renovate config errors');
              returnVal = 1;
            }
          } catch (err) {
            console.error(`Failed to verify: ${name}`);
            console.log(err);
            returnVal = 1;
          }
        }
      }
    }
  } catch (err) {
    returnVal = 1;
    console.log(err);
  }
  if (returnVal !== 0) {
    console.error('Presets failed validation');
    process.exit(returnVal);
  }
  console.log('Presets are validated');
})();
